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
import { Contest } from "@/model/Contest";

// ─── Platform Config ──────────────────────────────────────────────────────────
const platformConfig = {
    LeetCode: {
        accent: "#F59E0B",
        accentDark: "#D97706",
        accentLight: "#FEF3C7",
        badge: "⚡ LeetCode",
        emoji: "🟡",
    },
    CodeForces: {
        accent: "#3B82F6",
        accentDark: "#2563EB",
        accentLight: "#DBEAFE",
        badge: "🔵 Codeforces",
        emoji: "🔵",
    },
    CodeChef: {
        accent: "#8B5CF6",
        accentDark: "#7C3AED",
        accentLight: "#EDE9FE",
        badge: "👨‍🍳 CodeChef",
        emoji: "🟣",
    },
};

const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    });

const formatTime = (date: Date) =>
    new Date(date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
    body: {
        backgroundColor: "#0D0D14",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        margin: 0,
        padding: "40px 0",
    } as React.CSSProperties,
    container: {
        maxWidth: "560px",
        margin: "0 auto",
        backgroundColor: "#13131F",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
    } as React.CSSProperties,
    header: {
        padding: "36px 40px 28px",
        textAlign: "center" as const,
    },
    wordmark: {
        fontSize: "13px",
        fontWeight: "700",
        letterSpacing: "3px",
        textTransform: "uppercase" as const,
        color: "rgba(255,255,255,0.3)",
        marginBottom: "24px",
    } as React.CSSProperties,
    badge: {
        display: "inline-block",
        padding: "5px 14px",
        borderRadius: "100px",
        fontSize: "12px",
        fontWeight: "600",
        letterSpacing: "0.5px",
        marginBottom: "20px",
    } as React.CSSProperties,
    headline: {
        fontSize: "26px",
        fontWeight: "800",
        color: "#FFFFFF",
        margin: "0 0 8px",
        lineHeight: "1.3",
    } as React.CSSProperties,
    subHeadline: {
        fontSize: "15px",
        color: "rgba(255,255,255,0.5)",
        margin: "0",
        lineHeight: "1.5",
    } as React.CSSProperties,
    divider: {
        borderColor: "rgba(255,255,255,0.07)",
        margin: "0",
    } as React.CSSProperties,
    body2: {
        padding: "28px 40px",
    } as React.CSSProperties,
    infoCard: {
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: "12px",
        padding: "20px 24px",
        marginBottom: "16px",
        border: "1px solid rgba(255,255,255,0.07)",
    } as React.CSSProperties,
    infoLabel: {
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "1.5px",
        textTransform: "uppercase" as const,
        color: "rgba(255,255,255,0.35)",
        margin: "0 0 4px",
        display: "block",
    } as React.CSSProperties,
    infoValue: {
        fontSize: "15px",
        fontWeight: "600",
        color: "#FFFFFF",
        margin: "0",
    } as React.CSSProperties,
    ctaButton: {
        display: "block",
        textAlign: "center" as const,
        padding: "15px 32px",
        borderRadius: "10px",
        fontSize: "15px",
        fontWeight: "700",
        color: "#FFFFFF",
        textDecoration: "none",
        margin: "24px 0 0",
        letterSpacing: "0.3px",
    } as React.CSSProperties,
    footer: {
        padding: "20px 40px 28px",
        textAlign: "center" as const,
    },
    footerText: {
        fontSize: "12px",
        color: "rgba(255,255,255,0.2)",
        margin: "0 0 6px",
        lineHeight: "1.6",
    } as React.CSSProperties,
    footerLink: {
        color: "rgba(255,255,255,0.35)",
        textDecoration: "underline",
        fontSize: "12px",
    } as React.CSSProperties,
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ContestEmail({
    code,
    name,
    platform,
    startTime,
    endTime,
    duration,
    url,
    unsubscribeUrl,
}: Contest & { unsubscribeUrl: string }) {
    const cfg = platformConfig[platform as keyof typeof platformConfig] ?? platformConfig.LeetCode;

    return (
        <Html lang="en">
            <Head />
            <Preview>
                {cfg.emoji} New {platform} contest: {name} — starts {formatDate(startTime)}
            </Preview>
            <Body style={styles.body}>
                <Container style={styles.container}>

                    {/* ── Header ── */}
                    <Section style={styles.header}>
                        <Text style={styles.wordmark}>Contest Tracker</Text>

                        {/* Platform badge */}
                        <Text
                            style={{
                                ...styles.badge,
                                backgroundColor: `${cfg.accent}22`,
                                color: cfg.accent,
                                border: `1px solid ${cfg.accent}44`,
                            }}
                        >
                            {cfg.badge}
                        </Text>

                        <Text style={styles.headline}>{name}</Text>
                        <Text style={styles.subHeadline}>
                            A new contest is live — don&apos;t miss it.
                        </Text>
                    </Section>

                    <Hr style={styles.divider} />

                    {/* ── Contest Details ── */}
                    <Section style={styles.body2}>

                        {/* Start Time */}
                        <Row style={styles.infoCard}>
                            <Column>
                                <Text style={styles.infoLabel}>Starts</Text>
                                <Text style={styles.infoValue}>
                                    {formatDate(startTime)} &nbsp;·&nbsp; {formatTime(startTime)}
                                </Text>
                            </Column>
                        </Row>

                        {/* End Time + Duration side by side */}
                        <Row style={{ marginBottom: "16px" }}>
                            <Column style={{ width: "50%", paddingRight: "8px" }}>
                                <Row
                                    style={{
                                        ...styles.infoCard,
                                        marginBottom: 0,
                                    }}
                                >
                                    <Column>
                                        <Text style={styles.infoLabel}>Ends</Text>
                                        <Text style={styles.infoValue}>{formatDate(endTime)}</Text>
                                    </Column>
                                </Row>
                            </Column>
                            <Column style={{ width: "50%", paddingLeft: "8px" }}>
                                <Row
                                    style={{
                                        ...styles.infoCard,
                                        marginBottom: 0,
                                    }}
                                >
                                    <Column>
                                        <Text style={styles.infoLabel}>Duration</Text>
                                        <Text style={styles.infoValue}>{duration} min</Text>
                                    </Column>
                                </Row>
                            </Column>
                        </Row>

                        {/* Contest Code */}
                        <Row style={styles.infoCard}>
                            <Column>
                                <Text style={styles.infoLabel}>Contest Code</Text>
                                <Text
                                    style={{
                                        ...styles.infoValue,
                                        fontFamily: "'Courier New', monospace",
                                        fontSize: "17px",
                                        letterSpacing: "1px",
                                        color: cfg.accent,
                                    }}
                                >
                                    {code}
                                </Text>
                            </Column>
                        </Row>

                        {/* CTA */}
                        <Link
                            href={url}
                            style={{
                                ...styles.ctaButton,
                                background: `linear-gradient(135deg, ${cfg.accent}, ${cfg.accentDark})`,
                                boxShadow: `0 4px 24px ${cfg.accent}44`,
                            }}
                        >
                            Join Contest →
                        </Link>
                    </Section>

                    <Hr style={styles.divider} />

                    {/* ── Footer ── */}
                    <Section style={styles.footer}>
                        <Text style={styles.footerText}>
                            You&apos;re receiving this because you have {platform} email alerts enabled.
                        </Text>
                        <Text style={styles.footerText}>
                            <Link href={unsubscribeUrl} style={styles.footerLink}>
                                Unsubscribe
                            </Link>
                            {" · "}
                            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/settings`} style={styles.footerLink}>
                                Manage preferences
                            </Link>
                        </Text>
                    </Section>

                </Container>
            </Body>
        </Html>
    );
}