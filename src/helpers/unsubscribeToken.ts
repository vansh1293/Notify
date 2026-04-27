import crypto from 'crypto';

/**
 * Generates a cryptographically secure random token for use in unsubscribe links.
 * Uses Node's built-in crypto — no extra dependencies.
 */
export function generateUnsubscribeToken(): string {
    return crypto.randomBytes(32).toString('hex');
}
