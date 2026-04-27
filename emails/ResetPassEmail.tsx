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

interface ResetPassProps {
    username: string;
    resetCode: string;
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
    intro: {
        fontSize: "15px",
        color: "rgba(255,255,255,0.55)",
        margin: "0 0 24px",
        lineHeight: "1.7",
    } as React.CSSProperties,
    codeWrapper: {
        backgroundColor: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.25)",
        borderRadius: "12px",
        padding: "24px 32px",
        margin: "0 auto 24px",
    } as React.CSSProperties,
    codeLabel: {
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "2px",
        textTransform: "uppercase" as const,
        color: "rgba(239,68,68,0.8)",
        margin: "0 0 10px",
    } as React.CSSProperties,
    code: {
        fontSize: "38px",
        fontWeight: "800",
        fontFamily: "'Courier New', monospace",
        letterSpacing: "10px",
        color: "#FFFFFF",
        margin: "0",
        textIndent: "10px",
    } as React.CSSProperties,
    expiryNote: {
        fontSize: "13px",
        color: "rgba(255,255,255,0.3)",
        margin: "16px 0 0",
    } as React.CSSProperties,
    warningBox: {
        backgroundColor: "rgba(239,68,68,0.06)",
        borderLeft: "3px solid rgba(239,68,68,0.5)",
        borderRadius: "6px",
        padding: "14px 18px",
        marginBottom: "20px",
        textAlign: "left" as const,
    } as React.CSSProperties,
    warningText: {
        fontSize: "13px",
        color: "rgba(239,68,68,0.7)",
        margin: "0",
        lineHeight: "1.6",
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
export default function ResetPassEmail({ username, resetCode }: ResetPassProps) {
    return (
        <Html lang="en">
            <Head />
            <Preview>🔑 Your Contest Tracker password reset code: {resetCode}</Preview>
            <Body style={styles.body}>
                <Container style={styles.container}>

                    {/* ── Header ── */}
                    <Section style={styles.header}>
                        <Text style={styles.wordmark}>Contest Tracker</Text>
                        <Text style={{ fontSize: "36px", margin: "0 0 16px" }}>🔑</Text>
                        <Text style={styles.headline}>Reset your password</Text>
                        <Text style={styles.subHeadline}>
                            Hi {username}, we received a request to reset your password.
                        </Text>
                    </Section>

                    <Hr style={styles.divider} />

                    {/* ── Reset Code ── */}
                    <Section style={styles.body2}>
                        <Text style={styles.intro}>
                            Use the code below to set a new password. This code is valid for 10 minutes.
                        </Text>

                        <Section style={styles.codeWrapper}>
                            <Text style={styles.codeLabel}>Reset Code</Text>
                            <Text style={styles.code}>{resetCode}</Text>
                            <Text style={styles.expiryNote}>⏱ Valid for 10 minutes</Text>
                        </Section>

                        {/* Security warning */}
                        <Section style={styles.warningBox}>
                            <Text style={styles.warningText}>
                                ⚠️ If you did not request this, please ignore this email. Your password will not change unless you use this code. Consider securing your email if you keep receiving these.
                            </Text>
                        </Section>

                        <Text style={styles.disclaimer}>
                            This link was requested from your Contest Tracker account. For security, this code expires in 10 minutes and can only be used once.
                        </Text>
                    </Section>

                    <Hr style={styles.divider} />

                    {/* ── Footer ── */}
                    <Section style={styles.footer}>
                        <Text style={styles.footerText}>
                            © Contest Tracker · This is an automated security email, please do not reply.
                        </Text>
                    </Section>

                </Container>
            </Body>
        </Html>
    );
}
