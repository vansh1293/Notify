import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Text,
    Link,
    Hr,
} from "@react-email/components";
import * as React from "react";

interface VerificationEmailProps {
    username: string;
    otp: string;
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
    body: {
        backgroundColor: "#0D0D14",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        margin: 0,
        padding: "40px 0",
    } as React.CSSProperties,
    container: {
        maxWidth: "520px",
        margin: "0 auto",
        backgroundColor: "#13131F",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
    } as React.CSSProperties,
    header: {
        padding: "40px 40px 28px",
        textAlign: "center" as const,
    },
    wordmark: {
        fontSize: "13px",
        fontWeight: "700",
        letterSpacing: "3px",
        textTransform: "uppercase" as const,
        color: "rgba(255,255,255,0.3)",
        margin: "0 0 28px",
    } as React.CSSProperties,
    iconWrapper: {
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        backgroundColor: "rgba(99,102,241,0.15)",
        border: "1px solid rgba(99,102,241,0.3)",
        margin: "0 auto 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    } as React.CSSProperties,
    headline: {
        fontSize: "24px",
        fontWeight: "800",
        color: "#FFFFFF",
        margin: "0 0 8px",
        lineHeight: "1.3",
    } as React.CSSProperties,
    subHeadline: {
        fontSize: "14px",
        color: "rgba(255,255,255,0.45)",
        margin: "0",
        lineHeight: "1.6",
    } as React.CSSProperties,
    divider: {
        borderColor: "rgba(255,255,255,0.07)",
        margin: "0",
    } as React.CSSProperties,
    body2: {
        padding: "32px 40px",
        textAlign: "center" as const,
    } as React.CSSProperties,
    greeting: {
        fontSize: "15px",
        color: "rgba(255,255,255,0.6)",
        margin: "0 0 24px",
        lineHeight: "1.6",
    } as React.CSSProperties,
    otpWrapper: {
        backgroundColor: "rgba(99,102,241,0.08)",
        border: "1px solid rgba(99,102,241,0.25)",
        borderRadius: "12px",
        padding: "24px 32px",
        margin: "0 auto 24px",
    } as React.CSSProperties,
    otpLabel: {
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "2px",
        textTransform: "uppercase" as const,
        color: "rgba(99,102,241,0.8)",
        margin: "0 0 10px",
    } as React.CSSProperties,
    otp: {
        fontSize: "38px",
        fontWeight: "800",
        fontFamily: "'Courier New', monospace",
        letterSpacing: "10px",
        color: "#FFFFFF",
        margin: "0",
        textIndent: "10px", // compensate for letter-spacing on last char
    } as React.CSSProperties,
    expiryNote: {
        fontSize: "13px",
        color: "rgba(255,255,255,0.3)",
        margin: "16px 0 0",
    } as React.CSSProperties,
    disclaimer: {
        fontSize: "13px",
        color: "rgba(255,255,255,0.25)",
        lineHeight: "1.6",
        margin: "0",
    } as React.CSSProperties,
    footer: {
        padding: "20px 40px 28px",
        textAlign: "center" as const,
    },
    footerText: {
        fontSize: "12px",
        color: "rgba(255,255,255,0.18)",
        margin: "0",
        lineHeight: "1.6",
    } as React.CSSProperties,
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return (
        <Html lang="en">
            <Head />
            <Preview>🔐 Your Notify verification code: {otp}</Preview>
            <Body style={styles.body}>
                <Container style={styles.container}>

                    {/* ── Header ── */}
                    <Section style={styles.header}>
                        <Text style={styles.wordmark}>Notify</Text>
                        <Text style={{ fontSize: "36px", margin: "0 0 16px" }}>🔐</Text>
                        <Text style={styles.headline}>Verify your email</Text>
                        <Text style={styles.subHeadline}>
                            Hi {username}, use the code below to complete your sign-up.
                        </Text>
                    </Section>

                    <Hr style={styles.divider} />

                    {/* ── OTP ── */}
                    <Section style={styles.body2}>
                        <Text style={styles.greeting}>
                            Enter this one-time code in the app to verify your account. It expires in 10 minutes.
                        </Text>

                        <Section style={styles.otpWrapper}>
                            <Text style={styles.otpLabel}>Verification Code</Text>
                            <Text style={styles.otp}>{otp}</Text>
                            <Text style={styles.expiryNote}>⏱ Valid for 10 minutes</Text>
                        </Section>

                        <Text style={styles.disclaimer}>
                            If you didn&apos;t create a Notify account, you can safely ignore this email.
                            Someone may have entered your address by mistake.
                        </Text>
                    </Section>

                    <Hr style={styles.divider} />

                    {/* ── Footer ── */}
                    <Section style={styles.footer}>
                        <Text style={styles.footerText}>
                            © Notify · This is an automated message, please do not reply.
                        </Text>
                    </Section>

                </Container>
            </Body>
        </Html>
    );
}
