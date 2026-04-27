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

interface AnnouncementEmailProps {
    username: string;
    unsubscribeUrl: string;
}

export default function AnnouncementEmail({
    username,
    unsubscribeUrl,
}: AnnouncementEmailProps) {
    const BASE = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const changes = [
        {
            emoji: "🔕",
            title: "One-Click Unsubscribe",
            desc: "Every email now has an unsubscribe link in the footer. One click — no login required.",
            accent: "#059669",
            bg: "#F0FDF4",
            border: "#BBF7D0",
            tag: "Privacy",
            tagColor: "#059669",
            tagBg: "#DCFCE7",
        },
        {
            emoji: "📅",
            title: "Smarter Contest Alerts",
            desc: "Contest emails are now only sent when a contest starts within 2 days — no more weeks-early notifications.",
            accent: "#2563EB",
            bg: "#EFF6FF",
            border: "#BFDBFE",
            tag: "Improvement",
            tagColor: "#2563EB",
            tagBg: "#DBEAFE",
        },
        {
            emoji: "✉️",
            title: "Redesigned Email Templates",
            desc: "All emails — alerts, reminders, verification, password reset — have been rebuilt with a modern premium design.",
            accent: "#7C3AED",
            bg: "#F5F3FF",
            border: "#DDD6FE",
            tag: "Design",
            tagColor: "#7C3AED",
            tagBg: "#EDE9FE",
        },
    ];

    return (
        <Html lang="en">
            <Head />
            <Preview>
                📣 Notify just got better — here&apos;s what&apos;s new for you, {username}
            </Preview>

            <Body
                style={{
                    backgroundColor: "#F3F4F6",
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    margin: "0",
                    padding: "48px 0 64px",
                }}
            >
                <Container style={{ maxWidth: "560px", margin: "0 auto" }}>

                    {/* ── Header ── */}
                    <Section
                        style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: "20px 20px 0 0",
                            border: "1px solid #E5E7EB",
                            borderBottom: "none",
                            padding: "0 40px 36px",
                            textAlign: "center",
                        }}
                    >
                        {/* Rainbow top bar */}
                        <div
                            style={{
                                height: "4px",
                                background: "linear-gradient(90deg, #10B981, #3B82F6, #8B5CF6, #F59E0B)",
                                borderRadius: "2px 2px 0 0",
                                marginBottom: "40px",
                            }}
                        />

                        {/* Wordmark */}
                        <Text
                            style={{
                                fontSize: "11px",
                                fontWeight: "700",
                                letterSpacing: "4px",
                                textTransform: "uppercase" as const,
                                color: "#9CA3AF",
                                margin: "0 0 24px",
                            }}
                        >
                            Notify
                        </Text>

                        {/* Badge */}
                        <Section
                            style={{
                                display: "table",
                                margin: "0 auto 22px",
                                padding: "5px 14px",
                                borderRadius: "100px",
                                backgroundColor: "#F9FAFB",
                                border: "1px solid #E5E7EB",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    letterSpacing: "1px",
                                    textTransform: "uppercase" as const,
                                    color: "#6B7280",
                                    margin: "0",
                                }}
                            >
                                📣 &nbsp; Platform Update
                            </Text>
                        </Section>

                        {/* Headline */}
                        <Text
                            style={{
                                fontSize: "30px",
                                fontWeight: "900",
                                color: "#111827",
                                margin: "0 0 12px",
                                lineHeight: "1.2",
                                letterSpacing: "-0.5px",
                            }}
                        >
                            We&apos;ve been busy
                            <br />
                            <span style={{ color: "#6B7280", fontWeight: "700", fontSize: "26px" }}>
                                building for you
                            </span>
                        </Text>

                        <Text
                            style={{
                                fontSize: "15px",
                                color: "#6B7280",
                                margin: "0",
                                lineHeight: "1.7",
                            }}
                        >
                            Hey{" "}
                            <strong style={{ color: "#111827", fontWeight: "700" }}>{username}</strong>
                            , we just shipped a set of improvements to make Notify
                            a better experience for you.
                        </Text>
                    </Section>

                    {/* ── What's new strip ── */}
                    <Section
                        style={{
                            background: "linear-gradient(90deg, #F0FDF4, #EFF6FF, #F5F3FF)",
                            borderLeft: "1px solid #E5E7EB",
                            borderRight: "1px solid #E5E7EB",
                            padding: "13px 40px",
                            textAlign: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "#9CA3AF",
                                margin: "0",
                                letterSpacing: "0.4px",
                            }}
                        >
                            Here&apos;s what&apos;s new &nbsp; ↓
                        </Text>
                    </Section>

                    {/* ── Change cards ── */}
                    <Section
                        style={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #E5E7EB",
                            borderTop: "none",
                            borderBottom: "none",
                            padding: "28px 40px",
                        }}
                    >
                        {changes.map((item, i) => (
                            <Row
                                key={item.title}
                                style={{
                                    marginBottom: i < changes.length - 1 ? "14px" : "0",
                                    backgroundColor: item.bg,
                                    border: `1px solid ${item.border}`,
                                    borderRadius: "14px",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Left accent stripe */}
                                <Column
                                    style={{
                                        width: "4px",
                                        backgroundColor: item.accent,
                                        borderRadius: "14px 0 0 14px",
                                        verticalAlign: "top",
                                    }}
                                />

                                {/* Content */}
                                <Column style={{ padding: "18px 18px 18px 16px" }}>
                                    <Row>
                                        <Column>
                                            <Text
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "700",
                                                    color: "#111827",
                                                    margin: "0 0 5px",
                                                }}
                                            >
                                                <span style={{ marginRight: "7px" }}>{item.emoji}</span>
                                                {item.title}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: "13px",
                                                    color: "#4B5563",
                                                    margin: "0",
                                                    lineHeight: "1.65",
                                                }}
                                            >
                                                {item.desc}
                                            </Text>
                                        </Column>
                                        {/* Tag pill — right aligned */}
                                        <Column style={{ width: "80px", textAlign: "right", verticalAlign: "top" }}>
                                            <Text
                                                style={{
                                                    display: "inline-block",
                                                    fontSize: "10px",
                                                    fontWeight: "700",
                                                    letterSpacing: "0.5px",
                                                    padding: "3px 8px",
                                                    borderRadius: "100px",
                                                    backgroundColor: item.tagBg,
                                                    color: item.tagColor,
                                                    margin: "0",
                                                    whiteSpace: "nowrap" as const,
                                                }}
                                            >
                                                {item.tag}
                                            </Text>
                                        </Column>
                                    </Row>
                                </Column>
                            </Row>
                        ))}
                    </Section>

                    {/* ── CTA block ── */}
                    <Section
                        style={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #E5E7EB",
                            borderTop: "1px solid #F3F4F6",
                            borderBottom: "none",
                            padding: "24px 40px 28px",
                            textAlign: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: "14px",
                                color: "#9CA3AF",
                                margin: "0 0 18px",
                                lineHeight: "1.6",
                            }}
                        >
                            Your preferences haven&apos;t changed — you&apos;re still receiving
                            alerts for the platforms you chose.
                        </Text>

                        <Link
                            href={`${BASE}/dashboard`}
                            style={{
                                display: "block",
                                textAlign: "center",
                                padding: "14px 28px",
                                borderRadius: "12px",
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#FFFFFF",
                                textDecoration: "none",
                                marginBottom: "10px",
                                backgroundColor: "#111827",
                            }}
                        >
                            Go to your Dashboard →
                        </Link>

                        <Link
                            href={`${BASE}/settings`}
                            style={{
                                display: "block",
                                textAlign: "center",
                                padding: "13px 28px",
                                borderRadius: "12px",
                                fontSize: "13px",
                                fontWeight: "500",
                                color: "#6B7280",
                                textDecoration: "none",
                                backgroundColor: "#F9FAFB",
                                border: "1px solid #E5E7EB",
                            }}
                        >
                            Manage notification preferences
                        </Link>
                    </Section>

                    {/* ── Footer ── */}
                    <Section
                        style={{
                            backgroundColor: "#F9FAFB",
                            borderRadius: "0 0 20px 20px",
                            border: "1px solid #E5E7EB",
                            borderTop: "none",
                            padding: "18px 40px 24px",
                            textAlign: "center",
                        }}
                    >
                        <Hr style={{ borderColor: "#E5E7EB", margin: "0 0 16px" }} />
                        <Text
                            style={{
                                fontSize: "12px",
                                color: "#9CA3AF",
                                margin: "0 0 5px",
                                lineHeight: "1.7",
                            }}
                        >
                            You&apos;re receiving this because you have an account on Notify.
                        </Text>
                        <Text style={{ fontSize: "12px", color: "#D1D5DB", margin: "0" }}>
                            <Link href={unsubscribeUrl} style={{ color: "#9CA3AF", textDecoration: "underline" }}>
                                Unsubscribe
                            </Link>
                            {"  ·  "}
                            <Link href={`${BASE}/settings`} style={{ color: "#9CA3AF", textDecoration: "underline" }}>
                                Manage preferences
                            </Link>
                            {"  ·  © Notify"}
                        </Text>
                    </Section>

                </Container>
            </Body>
        </Html>
    );
}
