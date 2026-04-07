import { createHmac, timingSafeEqual } from "crypto";

const getUnsubscribeSecret = () => process.env.NEXTAUTH_SECRET;

export const createUnsubscribeToken = (userId: string) => {
  const secret = getUnsubscribeSecret();
  if (!secret) return null;

  return createHmac("sha256", secret).update(userId).digest("hex");
};

export const isValidUnsubscribeToken = (userId: string, token: string) => {
  const secret = getUnsubscribeSecret();
  if (!secret || !token) return false;

  const expectedToken = createHmac("sha256", secret).update(userId).digest("hex");
  const expectedBuffer = Buffer.from(expectedToken);
  const tokenBuffer = Buffer.from(token);

  if (expectedBuffer.length !== tokenBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, tokenBuffer);
};
