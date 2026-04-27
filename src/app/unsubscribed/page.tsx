import Link from "next/link";

export const metadata = {
    title: "Unsubscribed | Notify",
    description: "You have been successfully unsubscribed from Notify email notifications.",
};

export default function UnsubscribedPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080810]">

            {/* ── Ambient background orbs ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Top-left large teal orb */}
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-emerald-500/[0.07] blur-[120px]" />
                {/* Bottom-right cyan orb */}
                <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.06] blur-[100px]" />
                {/* Center faint */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-emerald-400/[0.04] blur-[80px]" />
            </div>

            {/* ── Subtle dot-grid overlay ── */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.18]"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* ── Card ── */}
            <div className="relative z-10 w-full max-w-[440px] mx-4">

                {/* Outer glow ring */}
                <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-emerald-500/40 via-transparent to-cyan-500/30 blur-[2px]" />

                <div className="relative rounded-[28px] bg-[#0e0e1a]/95 backdrop-blur-xl border border-white/[0.08] overflow-hidden shadow-2xl">

                    {/* Top accent bar */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

                    <div className="px-10 pt-10 pb-8 text-center">

                        {/* ── Icon cluster ── */}
                        <div className="relative inline-flex items-center justify-center mb-7">
                            {/* Outer ring */}
                            <div className="absolute w-[88px] h-[88px] rounded-full border border-emerald-400/20 animate-ping [animation-duration:2.5s]" />
                            <div className="absolute w-[72px] h-[72px] rounded-full border border-emerald-400/30" />
                            {/* Icon circle */}
                            <div className="relative w-[60px] h-[60px] rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-7 h-7 text-emerald-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>

                        {/* ── Headline ── */}
                        <h1 className="text-[28px] font-extrabold text-white mb-2 tracking-tight leading-snug">
                            You&apos;re unsubscribed
                        </h1>
                        <p className="text-[14px] text-white/40 leading-relaxed mb-8 max-w-[300px] mx-auto">
                            You&apos;ve been removed from all Notify email alerts and reminders. No further emails will be sent.
                        </p>

                        {/* ── Status pill ── */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                            <span className="text-xs font-semibold text-emerald-400 tracking-wide">Unsubscribe confirmed</span>
                        </div>

                        {/* ── Info row (what changed) ── */}
                        <div className="grid grid-cols-3 gap-2 mb-8">
                            {[
                                { icon: "⚡", label: "Contest Alerts" },
                                { icon: "🔔", label: "Reminders" },
                                { icon: "📊", label: "Platform News" },
                            ].map(({ icon, label }) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                                >
                                    <span className="text-lg">{icon}</span>
                                    <span className="text-[10px] font-medium text-white/30 leading-tight text-center">{label}</span>
                                    <span className="text-[9px] font-semibold text-red-400/70 uppercase tracking-wide">Off</span>
                                </div>
                            ))}
                        </div>

                        {/* ── CTAs ── */}
                        <div className="space-y-3">
                            <Link
                                href="/settings"
                                className="group relative block w-full py-3.5 px-6 rounded-2xl text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"
                                style={{
                                    background: "linear-gradient(135deg, #10B981, #059669)",
                                }}
                            >
                                <span className="relative z-10">Re-enable Notifications →</span>
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                            </Link>

                            <Link
                                href="/dashboard"
                                className="block w-full py-3.5 px-6 rounded-2xl text-sm font-medium text-white/50 hover:text-white/80 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.07] transition-all duration-200"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* ── Footer strip ── */}
                    <div className="px-10 py-4 border-t border-white/[0.05] bg-black/20 text-center">
                        <p className="text-[11px] text-white/20 leading-relaxed">
                            Changed your mind? Re-enable anytime from{" "}
                            <Link href="/settings" className="text-white/35 underline underline-offset-2 hover:text-white/60 transition-colors">
                                Settings
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}
