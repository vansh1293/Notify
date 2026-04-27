'use server'
import nodemailer from 'nodemailer';
import { ApiResponse } from '@/types/ApiResponse';
import { render } from '@react-email/render';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { Contest } from '@/model/Contest';
import * as React from 'react';
import ContestEmail from '../../emails/ContestEmail';
import { generateUnsubscribeToken } from './unsubscribeToken';

interface MailOptions {
    from: string | undefined;
    to: string;
    subject: string;
    html: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Only send alert emails for contests starting within this window
const EMAIL_ALERT_WINDOW_MS = 48 * 60 * 60 * 1000; // 2 days

export async function sendContestDetails(contestDetails: Contest[]): Promise<ApiResponse> {
    try {
        console.log("📧 Sending contest details...");
        await dbConnect();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        });

        for (const contest of contestDetails) {
            // Only email users if the contest starts within the next 2 days
            const now = new Date();
            const startsIn = new Date(contest.startTime).getTime() - now.getTime();
            if (startsIn > EMAIL_ALERT_WINDOW_MS) {
                console.log(`⏭️ Skipping email for "${contest.name}" — starts in more than 2 days.`);
                continue;
            }

            // Pick users subscribed to this platform + email notifications enabled
            const platformKey = contest.platform as 'LeetCode' | 'CodeForces' | 'CodeChef';
            const users = await UserModel.find({ [platformKey]: true, emailNotifications: true });

            for (const user of users) {
                // Ensure user has a persistent unsubscribe token
                if (!user.unsubscribeToken) {
                    user.unsubscribeToken = generateUnsubscribeToken();
                    await user.save();
                }

                const unsubscribeUrl = `${BASE_URL}/api/unsubscribe?token=${user.unsubscribeToken}`;

                const htmlcontent = await render(
                    React.createElement(ContestEmail, { ...contest, unsubscribeUrl })
                );

                const mailOptions: MailOptions = {
                    from: process.env.NODEMAILER_EMAIL,
                    to: user.email,
                    subject: 'Contest Update',
                    html: htmlcontent
                };

                try {
                    await transporter.sendMail(mailOptions);
                } catch (err) {
                    console.error(`❌ Failed to send mail to ${user.email} for contest "${contest.name}":`, err);
                }
            }
        }

        return {
            success: true,
            message: "Contest details sent successfully.",
        }
    } catch (error) {
        console.error("Error sending contest details:", error);
        return {
            success: false,
            message: "Failed to send contest details.",
        };
    }
}