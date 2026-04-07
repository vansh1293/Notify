'use server'
import nodemailer from 'nodemailer';
import { ApiResponse } from '@/types/ApiResponse';
import { render } from '@react-email/render';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { Contest } from '@/model/Contest';
import * as React from 'react';
import ContestEmail from '../../emails/ContestEmail';
import { createUnsubscribeToken } from '@/lib/unsubscribeToken';

interface MailOptions {
    from: string | undefined;
    to: string;
    subject: string;
    html: string;
}
export async function sendContestDetails(contestDetails: Contest[]): Promise<ApiResponse> {
    try {
        console.log("📧 Sending contest details...");
        await dbConnect();
        const usersLeetCode = await UserModel.find({ LeetCode: true, emailNotifications: true }).select('_id email');
        const usersCodeForces = await UserModel.find({ CodeForces: true, emailNotifications: true }).select('_id email');
        const usersCodeChef = await UserModel.find({ CodeChef: true, emailNotifications: true }).select('_id email');
        const appUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        });
        for (const contest of contestDetails) {
            let recipients: { _id: string; email: string }[] = [];
            if (contest.platform === 'LeetCode') {
                recipients = usersLeetCode.map((user) => ({ _id: String(user._id), email: user.email }));
            } else if (contest.platform === 'CodeForces') {
                recipients = usersCodeForces.map((user) => ({ _id: String(user._id), email: user.email }));
            } else if (contest.platform === 'CodeChef') {
                recipients = usersCodeChef.map((user) => ({ _id: String(user._id), email: user.email }));
            }

            for (const user of recipients) {
                const token = createUnsubscribeToken(user._id);
                const unsubscribeUrl = token
                    ? `${appUrl}/api/unsubscribe-contest?userId=${encodeURIComponent(user._id)}&token=${token}`
                    : undefined;
                const htmlcontent = await render(React.createElement(ContestEmail, { ...contest, unsubscribeUrl }));
                const mailOptions: MailOptions = {
                    from: process.env.NODEMAILER_EMAIL,
                    to: user.email,
                    subject: 'Contest Update',
                    html: htmlcontent
                };
                try {
                    await transporter.sendMail(mailOptions);
                } catch (err) {
                    console.error(`❌ Failed to send mail for contest "${contest.name}" to "${user.email}":`, err);
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
