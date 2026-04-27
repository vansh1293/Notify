import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import * as React from "react";
import UnsubscribeEmail from "../../../../emails/UnsubscribeEmail";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(new URL("/unsubscribe-error", req.url));
    }

    try {
        await dbConnect();

        const user = await UserModel.findOne({ unsubscribeToken: token });

        if (!user) {
            return NextResponse.redirect(new URL("/unsubscribe-error", req.url));
        }

        // Already unsubscribed — just redirect without re-sending the confirmation
        if (!user.emailNotifications) {
            return NextResponse.redirect(new URL("/unsubscribed", req.url));
        }

        user.emailNotifications = false;
        await user.save();

        // Send a confirmation email using the UnsubscribeEmail template
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.NODEMAILER_EMAIL,
                    pass: process.env.NODEMAILER_PASS,
                },
            });

            const settingsUrl = `${BASE_URL}/settings`;
            const resubscribeUrl = `${BASE_URL}/settings`;

            const html = await render(
                React.createElement(UnsubscribeEmail, {
                    username: user.username,
                    resubscribeUrl,
                    settingsUrl,
                })
            );

            await transporter.sendMail({
                from: process.env.NODEMAILER_EMAIL,
                to: user.email,
                subject: "You've been unsubscribed from Contest Tracker",
                html,
            });
        } catch (mailErr) {
            // Non-fatal: log but don't block the redirect
            console.error("⚠️ Failed to send unsubscribe confirmation email:", mailErr);
        }

        return NextResponse.redirect(new URL("/unsubscribed", req.url));
    } catch (error) {
        console.error("Error processing unsubscribe:", error);
        return NextResponse.redirect(new URL("/unsubscribe-error", req.url));
    }
}
