/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  migrate-unsubscribe-tokens.mjs
 *
 *  One-time migration script: generates and persists a unique unsubscribeToken
 *  for every user in the database that does not already have one.
 *
 *  Usage:
 *    node scripts/migrate-unsubscribe-tokens.mjs
 *    -- or via npm --
 *    npm run migrate:unsubscribe-tokens
 *
 *  Requirements:
 *    • MONGODB_URI must be set in .env.local (loaded automatically below)
 *    • No additional packages required — uses built-in crypto + mongoose
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import mongoose from 'mongoose';

// ─── Load .env.local manually (Next.js doesn't expose dotenv to plain scripts) ─
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env.local');

try {
    const envContent = readFileSync(envPath, 'utf-8');
    for (const line of envContent.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
    }
    console.log('✅ Loaded environment from .env.local');
} catch {
    console.warn('⚠️  Could not read .env.local — falling back to process environment variables.');
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set. Aborting.');
    process.exit(1);
}

// ─── Minimal User schema (only fields we need) ────────────────────────────────
const UserSchema = new mongoose.Schema(
    {
        username:         { type: String },
        email:            { type: String },
        unsubscribeToken: { type: String },
    },
    { strict: false } // preserve all other fields during save
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

function formatDuration(ms) {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
}

// ─── Main migration ───────────────────────────────────────────────────────────
async function main() {
    const startTime = Date.now();

    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║       Unsubscribe Token Migration — Contest Tracker      ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');

    // 1. Connect
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log(`   Connected to: ${mongoose.connection.host}\n`);

    // 2. Find all users without a token
    const usersWithoutToken = await User.find({
        $or: [
            { unsubscribeToken: { $exists: false } },
            { unsubscribeToken: null },
            { unsubscribeToken: '' },
        ],
    }).select('_id username email unsubscribeToken');

    const totalUsers    = await User.countDocuments();
    const alreadyDone   = totalUsers - usersWithoutToken.length;

    console.log(`📊 Database summary:`);
    console.log(`   Total users          : ${totalUsers}`);
    console.log(`   Already have token   : ${alreadyDone}`);
    console.log(`   Need migration       : ${usersWithoutToken.length}\n`);

    if (usersWithoutToken.length === 0) {
        console.log('🎉 All users already have an unsubscribe token. Nothing to do!\n');
        await mongoose.disconnect();
        return;
    }

    // 3. Assign tokens in bulk using bulk write for efficiency
    console.log('🚀 Starting migration...\n');

    const bulkOps = [];
    const preview = [];

    for (const user of usersWithoutToken) {
        const token = generateToken();
        bulkOps.push({
            updateOne: {
                filter: { _id: user._id },
                update: { $set: { unsubscribeToken: token } },
            },
        });
        if (preview.length < 5) {
            preview.push({ user: user.username || user.email || user._id.toString(), token });
        }
    }

    // 4. Execute bulk write
    const result = await User.bulkWrite(bulkOps, { ordered: false });

    // 5. Report results
    const elapsed = Date.now() - startTime;
    const succeeded = result.modifiedCount ?? result.nModified ?? bulkOps.length;
    const failed = bulkOps.length - succeeded;

    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│                   Migration Complete                     │');
    console.log('├─────────────────────────────────────────────────────────┤');
    console.log(`│  ✅ Tokens assigned  : ${String(succeeded).padEnd(32)}│`);
    console.log(`│  ❌ Failed           : ${String(failed).padEnd(32)}│`);
    console.log(`│  ⏱  Duration        : ${formatDuration(elapsed).padEnd(32)}│`);
    console.log('└─────────────────────────────────────────────────────────┘');

    if (preview.length > 0) {
        console.log('\n📋 Sample tokens assigned (first 5):');
        for (const { user, token } of preview) {
            console.log(`   ${user.padEnd(30)} → ${token.slice(0, 16)}…`);
        }
    }

    if (failed > 0) {
        console.warn(`\n⚠️  ${failed} user(s) could not be updated. Check your DB connection and permissions.`);
    }

    console.log('\n✨ Migration finished. All existing users can now be unsubscribed via email link.\n');

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.\n');
}

main().catch((err) => {
    console.error('\n💥 Migration failed with error:');
    console.error(err);
    mongoose.disconnect().finally(() => process.exit(1));
});
