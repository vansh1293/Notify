/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  send-announcement.mjs
 *
 *  Sends the platform update announcement email to every user in the database.
 *  Uses a controlled concurrency queue so we don't hammer Gmail's SMTP limits.
 *
 *  Usage:
 *    node scripts/send-announcement.mjs
 *    -- or via npm --
 *    npm run announce
 *
 *  Optional flags (set as env vars before running):
 *    DRY_RUN=true   → simulates everything but sends no emails
 *    BATCH_SIZE=5   → number of emails sent in parallel per batch (default 5)
 *    DELAY_MS=1200  → ms to wait between batches (default 1200ms)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createTransport } from 'nodemailer';
import mongoose from 'mongoose';
import { createElement } from 'react';
import { render } from '@react-email/render';

// ─── Load .env.local ──────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env.local');

try {
    const raw = readFileSync(envPath, 'utf-8');
    for (const line of raw.split('\n')) {
        const t = line.trim();
        if (!t || t.startsWith('#')) continue;
        const eq = t.indexOf('=');
        if (eq === -1) continue;
        const k = t.slice(0, eq).trim();
        const v = t.slice(eq + 1).trim();
        if (!process.env[k]) process.env[k] = v;
    }
    console.log('✅ Loaded environment from .env.local');
} catch {
    console.warn('⚠️  Could not read .env.local — using process.env directly.');
}

// ─── Validate required env vars ───────────────────────────────────────────────
const MONGODB_URI       = process.env.MONGODB_URI;
const NODEMAILER_EMAIL  = process.env.NODEMAILER_EMAIL;
const NODEMAILER_PASS   = process.env.NODEMAILER_PASS;
const BASE_URL          = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const DRY_RUN           = process.env.DRY_RUN === 'true';
const BATCH_SIZE        = parseInt(process.env.BATCH_SIZE || '5', 10);
const DELAY_MS          = parseInt(process.env.DELAY_MS || '1200', 10);

if (!MONGODB_URI)      { console.error('❌ MONGODB_URI missing');      process.exit(1); }
if (!NODEMAILER_EMAIL) { console.error('❌ NODEMAILER_EMAIL missing');  process.exit(1); }
if (!NODEMAILER_PASS)  { console.error('❌ NODEMAILER_PASS missing');   process.exit(1); }

// ─── Mongoose User model (minimal) ────────────────────────────────────────────
const UserSchema = new mongoose.Schema(
    { username: String, email: String, unsubscribeToken: String },
    { strict: false }
);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// ─── Dynamic import of the TSX template ───────────────────────────────────────
let AnnouncementEmail;
try {
    const { register } = await import('node:module');
    const { resolve: tsxResolve } = await import('tsx/esm/api');
    register('tsx/esm', { parentURL: import.meta.url });
    const mod = await import('../emails/AnnouncementEmail.tsx');
    AnnouncementEmail = mod.default;
    console.log('✅ Loaded AnnouncementEmail via tsx');
} catch {
    AnnouncementEmail = null;
    console.warn('⚠️  tsx not available — will use plain HTML fallback template.');
}

// ─── Plain HTML fallback — LIGHT THEME ────────────────────────────────────────
function buildFallbackHtml(username, unsubscribeUrl) {
    return (
        '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
        '<body style="background:#F3F4F6;font-family:Helvetica Neue,Arial,sans-serif;margin:0;padding:48px 0;">' +
        '<div style="max-width:560px;margin:0 auto;border-radius:20px;overflow:hidden;border:1px solid #E5E7EB;">' +

        // Rainbow top bar
        '<div style="height:4px;background:linear-gradient(90deg,#10B981,#3B82F6,#8B5CF6,#F59E0B);"></div>' +

        // Header
        '<div style="background:#FFFFFF;padding:36px 40px 28px;text-align:center;">' +
        '<p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#9CA3AF;margin:0 0 18px;">Notify</p>' +
        '<div style="display:inline-block;padding:5px 14px;border-radius:100px;background:#F9FAFB;border:1px solid #E5E7EB;margin-bottom:18px;">' +
        '<span style="font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6B7280;">Platform Update</span>' +
        '</div>' +
        '<h1 style="font-size:28px;font-weight:900;color:#111827;margin:0 0 8px;letter-spacing:-0.5px;line-height:1.2;">We\'ve been busy<br>' +
        '<span style="color:#6B7280;font-weight:700;font-size:24px;">building for you</span></h1>' +
        '<p style="font-size:15px;color:#6B7280;margin:0;line-height:1.7;">Hey <strong style="color:#111827;">' + username + '</strong>, we just shipped some improvements to Notify.</p>' +
        '</div>' +

        // "What's new" strip
        '<div style="background:linear-gradient(90deg,#F0FDF4,#EFF6FF,#F5F3FF);border-left:1px solid #E5E7EB;border-right:1px solid #E5E7EB;padding:13px 40px;text-align:center;">' +
        '<p style="font-size:12px;font-weight:600;color:#9CA3AF;margin:0;">Here\'s what\'s new &nbsp; &darr;</p>' +
        '</div>' +

        // Feature cards
        '<div style="background:#FFFFFF;padding:24px 40px;border-left:1px solid #E5E7EB;border-right:1px solid #E5E7EB;">' +

        '<div style="background:#F0FDF4;border:1px solid #BBF7D0;border-left:4px solid #059669;border-radius:12px;padding:16px 18px;margin-bottom:12px;">' +
        '<p style="font-size:14px;font-weight:700;color:#111827;margin:0 0 4px;">One-Click Unsubscribe</p>' +
        '<p style="font-size:13px;color:#4B5563;margin:0;line-height:1.65;">Every email now has an unsubscribe link in the footer. One click &mdash; no login required.</p>' +
        '</div>' +

        '<div style="background:#EFF6FF;border:1px solid #BFDBFE;border-left:4px solid #2563EB;border-radius:12px;padding:16px 18px;margin-bottom:12px;">' +
        '<p style="font-size:14px;font-weight:700;color:#111827;margin:0 0 4px;">Smarter Contest Alerts</p>' +
        '<p style="font-size:13px;color:#4B5563;margin:0;line-height:1.65;">Contest emails are now only sent when a contest starts within 2 days &mdash; no more weeks-early notifications.</p>' +
        '</div>' +

        '<div style="background:#F5F3FF;border:1px solid #DDD6FE;border-left:4px solid #7C3AED;border-radius:12px;padding:16px 18px;">' +
        '<p style="font-size:14px;font-weight:700;color:#111827;margin:0 0 4px;">Redesigned Email Templates</p>' +
        '<p style="font-size:13px;color:#4B5563;margin:0;line-height:1.65;">All emails have been rebuilt with a modern premium design.</p>' +
        '</div>' +

        '</div>' +

        // CTAs
        '<div style="background:#FFFFFF;padding:22px 40px 26px;border-left:1px solid #E5E7EB;border-right:1px solid #E5E7EB;text-align:center;border-top:1px solid #F3F4F6;">' +
        '<p style="font-size:14px;color:#9CA3AF;margin:0 0 16px;line-height:1.6;">Your preferences haven\'t changed &mdash; you\'re still receiving alerts for the platforms you chose.</p>' +
        '<a href="' + BASE_URL + '/dashboard" style="display:block;padding:14px;border-radius:12px;background:#111827;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:14px;margin-bottom:10px;text-align:center;">Go to your Dashboard &rarr;</a>' +
        '<a href="' + BASE_URL + '/settings" style="display:block;padding:13px;border-radius:12px;background:#F9FAFB;border:1px solid #E5E7EB;color:#6B7280;text-decoration:none;font-size:13px;text-align:center;">Manage notification preferences</a>' +
        '</div>' +

        // Footer
        '<div style="background:#F9FAFB;padding:16px 40px 22px;text-align:center;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 20px 20px;">' +
        '<p style="font-size:12px;color:#9CA3AF;margin:0 0 4px;">You\'re receiving this because you have an account on Notify.</p>' +
        '<p style="font-size:12px;color:#D1D5DB;margin:0;">' +
        '<a href="' + unsubscribeUrl + '" style="color:#9CA3AF;text-decoration:underline;">Unsubscribe</a>' +
        ' &nbsp;&middot;&nbsp; ' +
        '<a href="' + BASE_URL + '/settings" style="color:#9CA3AF;text-decoration:underline;">Manage preferences</a>' +
        ' &nbsp;&middot;&nbsp; &copy; Notify' +
        '</p>' +
        '</div>' +

        '</div>' +
        '</body>' +
        '</html>'
    );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function formatDuration(ms) {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
}

function bar(done, total, width = 30) {
    const pct = total === 0 ? 1 : done / total;
    const filled = Math.round(pct * width);
    return '[' + '█'.repeat(filled) + '░'.repeat(width - filled) + `] ${done}/${total}`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    const startTime = Date.now();

    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║     Notify — Platform Announcement Mailer       ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    if (DRY_RUN) {
        console.log('\n  ⚠️  DRY RUN MODE — no emails will actually be sent\n');
    }
    console.log(`  Batch size : ${BATCH_SIZE} parallel emails`);
    console.log(`  Delay      : ${DELAY_MS}ms between batches`);
    console.log(`  Base URL   : ${BASE_URL}\n`);

    // 1. Connect to DB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log(`   Connected to: ${mongoose.connection.host}\n`);

    // 2. Fetch all users
    const users = await User.find({}).select('username email unsubscribeToken');
    console.log(`👥 Found ${users.length} users to notify.\n`);

    if (users.length === 0) {
        console.log('No users found. Exiting.');
        await mongoose.disconnect();
        return;
    }

    // 3. Set up nodemailer
    const transporter = createTransport({
        service: 'gmail',
        auth: { user: NODEMAILER_EMAIL, pass: NODEMAILER_PASS },
    });

    // 4. Send in batches
    let sent = 0, failed = 0;
    const errors = [];

    const batches = [];
    for (let i = 0; i < users.length; i += BATCH_SIZE) {
        batches.push(users.slice(i, i + BATCH_SIZE));
    }

    console.log(`📨 Sending in ${batches.length} batches of ≤${BATCH_SIZE}...\n`);

    for (let bIdx = 0; bIdx < batches.length; bIdx++) {
        const batch = batches[bIdx];

        await Promise.all(
            batch.map(async (user) => {
                const unsubscribeUrl = user.unsubscribeToken
                    ? `${BASE_URL}/api/unsubscribe?token=${user.unsubscribeToken}`
                    : `${BASE_URL}/settings`;

                let html;
                try {
                    if (AnnouncementEmail) {
                        html = await render(createElement(AnnouncementEmail, { username: user.username, unsubscribeUrl }));
                    } else {
                        html = buildFallbackHtml(user.username || 'there', unsubscribeUrl);
                    }
                } catch {
                    html = buildFallbackHtml(user.username || 'there', unsubscribeUrl);
                }

                if (DRY_RUN) {
                    sent++;
                    return;
                }

                try {
                    await transporter.sendMail({
                        from: `Notify <${NODEMAILER_EMAIL}>`,
                        to: user.email,
                        subject: "What's new on Notify",
                        html,
                    });
                    sent++;
                } catch (err) {
                    failed++;
                    errors.push({ user: user.username || user.email, error: err.message });
                    console.error(`   ❌ Failed: ${user.email} — ${err.message}`);
                }
            })
        );

        process.stdout.write(
            `\r  ${bar(sent + failed, users.length)}  ✅ ${sent} sent  ❌ ${failed} failed`
        );

        if (bIdx < batches.length - 1) {
            await sleep(DELAY_MS);
        }
    }

    // 5. Final report
    const elapsed = Date.now() - startTime;
    console.log('\n\n┌─────────────────────────────────────────────────────────┐');
    console.log('│               Announcement Send Complete                  │');
    console.log('├─────────────────────────────────────────────────────────┤');
    console.log(`│  ✅ Sent successfully : ${String(sent).padEnd(31)}│`);
    console.log(`│  ❌ Failed            : ${String(failed).padEnd(31)}│`);
    console.log(`│  ⏱  Total duration   : ${formatDuration(elapsed).padEnd(31)}│`);
    if (DRY_RUN) {
        console.log('│  🔕 DRY RUN — no actual emails were sent               │');
    }
    console.log('└─────────────────────────────────────────────────────────┘');

    if (errors.length > 0) {
        console.log('\n📋 Failed recipients:');
        for (const { user, error } of errors.slice(0, 10)) {
            console.log(`   ${user.padEnd(28)} — ${error}`);
        }
        if (errors.length > 10) {
            console.log(`   ... and ${errors.length - 10} more`);
        }
    }

    console.log('\n✨ Done.\n');
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.\n');
}

main().catch((err) => {
    console.error('\n💥 Script crashed:');
    console.error(err);
    mongoose.disconnect().finally(() => process.exit(1));
});
