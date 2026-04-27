import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Row,
    Column,
    Text,
    Link,
    Hr,
} from "@react-email/components";
import * as React from "react";

interface UnsubscribeEmailProps {
    username: string;
    resubscribeUrl: string;
    settingsUrl: string;
}

export default function UnsubscribeEmail({
    username,
    resubscribeUrl,
    settingsUrl,
}: UnsubscribeEmailProps) {
    return (
        <Html lang="en">
            <Head />
            <Preview>You&apos;ve been unsubscribed — we&apos;ll miss you, {username} 👋</Preview>

            <Body
                style={{
                    backgroundColor: "#09090F",
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    margin: "0",
                    padding: "48px 0 64px",
                }}
            >
                {/* ── Outer wrapper ── */}
                <Container
                    style={{
                        maxWidth: "540px",
                        margin: "0 auto",
                    }}
                >
                    {/* ╔══════════════════════════════════════╗
                         Hero header block — dark with teal glow
                        ╚══════════════════════════════════════╝ */}
                    <Section
                        style={{
                            backgroundColor: "#0F0F1A",
                            borderRadius: "20px 20px 0 0",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderBottom: "none",
                            padding: "48px 40px 36px",
                            textAlign: "center",
                            position: "relative",
                        }}
                    >
                        {/* Top accent line */}
                        <div
                            style={{
                                height: "3px",
                                background: "linear-gradient(90deg, transparent, #10B981, #34D399, transparent)",
                                borderRadius: "2px",
                                marginBottom: "36px",
                            }}
                        />

                        {/* Wordmark */}
                        <Text
                            style={{
                                fontSize: "11px",
                                fontWeight: "700",
                                letterSpacing: "4px",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.22)",
                                margin: "0 0 32px",
                            }}
                        >
                            Contest Tracker
                        </Text>

                        {/* Large goodbye icon */}
                        <Section
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                backgroundColor: "rgba(16,185,129,0.10)",
                                border: "1px solid rgba(16,185,129,0.25)",
                                margin: "0 auto 24px",
                                display: "table",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "36px",
                                    margin: "0",
                                    lineHeight: "80px",
                                    textAlign: "center",
                                    display: "table-cell",
                                    verticalAlign: "middle",
                                }}
                            >
                                👋
                            </Text>
                        </Section>

                        {/* Headline */}
                        <Text
                            style={{
                                fontSize: "30px",
                                fontWeight: "800",
                                color: "#FFFFFF",
                                margin: "0 0 12px",
                                lineHeight: "1.2",
                                letterSpacing: "-0.5px",
                            }}
                        >
                            You&apos;re unsubscribed
                        </Text>

                        <Text
                            style={{
                                fontSize: "15px",
                                color: "rgba(255,255,255,0.40)",
                                margin: "0",
                                lineHeight: "1.7",
                            }}
                        >
                            We&apos;ve removed <strong style={{ color: "rgba(255,255,255,0.65)", fontWeight: "600" }}>{username}</strong> from all
                            <br />contest alerts and reminder emails.
                        </Text>
                    </Section>

                    {/* ╔══════════════════════════════════════╗
                         Confirmation pill — teal glow strip
                        ╚══════════════════════════════════════╝ */}
                    <Section
                        style={{
                            background: "linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(52,211,153,0.08) 100%)",
                            borderLeft: "1px solid rgba(255,255,255,0.07)",
                            borderRight: "1px solid rgba(255,255,255,0.07)",
                            padding: "18px 40px",
                            textAlign: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#34D399",
                                margin: "0",
                                letterSpacing: "0.2px",
                            }}
                        >
                            ✓ &nbsp; Unsubscribe confirmed — no further emails will be sent
                        </Text>
                    </Section>

                    {/* ╔══════════════════════════════════════╗
                         Body card
                        ╚══════════════════════════════════════╝ */}
                    <Section
                        style={{
                            backgroundColor: "#0F0F1A",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderTop: "none",
                            borderBottom: "none",
                            padding: "36px 40px 32px",
                        }}
                    >
                        {/* Miss you message */}
                        <Text
                            style={{
                                fontSize: "15px",
                                color: "rgba(255,255,255,0.45)",
                                margin: "0 0 28px",
                                lineHeight: "1.8",
                                textAlign: "center",
                            }}
                        >
                            We&apos;re sorry to see you go. If you ever want to stay
                            on top of competitive programming contests again,
                            your preferences are just a click away.
                        </Text>

                        <Hr
                            style={{
                                borderColor: "rgba(255,255,255,0.06)",
                                margin: "0 0 28px",
                            }}
                        />

                        {/* What you had — feature pills */}
                        <Text
                            style={{
                                fontSize: "11px",
                                fontWeight: "700",
                                letterSpacing: "2px",
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.2)",
                                margin: "0 0 16px",
                                textAlign: "center",
                            }}
                        >
                            What you had
                        </Text>

                        <Row style={{ marginBottom: "28px" }}>
                            {/* Feature 1 */}
                            <Column style={{ width: "33.3%", padding: "0 4px" }}>
                                <Section
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        borderRadius: "10px",
                                        padding: "14px 8px",
                                        textAlign: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: "20px", margin: "0 0 6px" }}>⚡</Text>
                                    <Text
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "600",
                                            color: "rgba(255,255,255,0.4)",
                                            margin: "0",
                                            lineHeight: "1.4",
                                        }}
                                    >
                                        Contest Alerts
                                    </Text>
                                </Section>
                            </Column>

                            {/* Feature 2 */}
                            <Column style={{ width: "33.3%", padding: "0 4px" }}>
                                <Section
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        borderRadius: "10px",
                                        padding: "14px 8px",
                                        textAlign: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: "20px", margin: "0 0 6px" }}>🔔</Text>
                                    <Text
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "600",
                                            color: "rgba(255,255,255,0.4)",
                                            margin: "0",
                                            lineHeight: "1.4",
                                        }}
                                    >
                                        Reminders
                                    </Text>
                                </Section>
                            </Column>

                            {/* Feature 3 */}
                            <Column style={{ width: "33.3%", padding: "0 4px" }}>
                                <Section
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        borderRadius: "10px",
                                        padding: "14px 8px",
                                        textAlign: "center",
                                    }}
                                >
                                    <Text style={{ fontSize: "20px", margin: "0 0 6px" }}>🏆</Text>
                                    <Text
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "600",
                                            color: "rgba(255,255,255,0.4)",
                                            margin: "0",
                                            lineHeight: "1.4",
                                        }}
                                    >
                                        Platform Updates
                                    </Text>
                                </Section>
                            </Column>
                        </Row>

                        {/* Primary CTA — Re-enable */}
                        <Link
                            href={resubscribeUrl}
                            style={{
                                display: "block",
                                textAlign: "center",
                                padding: "16px 28px",
                                borderRadius: "12px",
                                fontSize: "15px",
                                fontWeight: "700",
                                color: "#FFFFFF",
                                textDecoration: "none",
                                marginBottom: "12px",
                                letterSpacing: "0.2px",
                                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                            }}
                        >
                            Re-enable Email Notifications
                        </Link>

                        {/* Secondary CTA — Settings */}
                        <Link
                            href={settingsUrl}
                            style={{
                                display: "block",
                                textAlign: "center",
                                padding: "15px 28px",
                                borderRadius: "12px",
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "rgba(255,255,255,0.45)",
                                textDecoration: "none",
                                backgroundColor: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            Manage all preferences →
                        </Link>
                    </Section>

                    {/* ╔══════════════════════════════════════╗
                         Footer
                        ╚══════════════════════════════════════╝ */}
                    <Section
                        style={{
                            backgroundColor: "#0B0B16",
                            borderRadius: "0 0 20px 20px",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderTop: "1px solid rgba(255,255,255,0.04)",
                            padding: "22px 40px 28px",
                            textAlign: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: "12px",
                                color: "rgba(255,255,255,0.15)",
                                margin: "0 0 6px",
                                lineHeight: "1.7",
                            }}
                        >
                            This email confirms your unsubscribe request for{" "}
                            <strong style={{ color: "rgba(255,255,255,0.25)" }}>{username}</strong>.
                        </Text>
                        <Text
                            style={{
                                fontSize: "12px",
                                color: "rgba(255,255,255,0.10)",
                                margin: "0",
                            }}
                        >
                            © Contest Tracker &nbsp;·&nbsp; All rights reserved
                        </Text>
                    </Section>

                </Container>
            </Body>
        </Html>
    );
}
