import dbConnect from "@/lib/dbConnect";
import { isValidUnsubscribeToken } from "@/lib/unsubscribeToken";
import UserModel from "@/model/User";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    if (!userId || !token || !isValidUnsubscribeToken(userId, token)) {
      return new Response(
        `<html><body style="font-family:sans-serif;padding:24px;"><h2>Invalid unsubscribe link</h2><p>Please sign in and update your notification settings manually.</p></body></html>`,
        {
          status: 400,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { emailNotifications: false },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(
        `<html><body style="font-family:sans-serif;padding:24px;"><h2>User not found</h2><p>This unsubscribe link is no longer valid.</p></body></html>`,
        {
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        }
      );
    }

    return new Response(
      `<html><body style="font-family:sans-serif;padding:24px;"><h2>Unsubscribed successfully</h2><p>You will no longer receive contest update emails.</p></body></html>`,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  } catch (error) {
    console.error("Error unsubscribing from contest emails:", error);
    return new Response(
      `<html><body style="font-family:sans-serif;padding:24px;"><h2>Unable to unsubscribe</h2><p>Please try again later.</p></body></html>`,
      {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }
}
