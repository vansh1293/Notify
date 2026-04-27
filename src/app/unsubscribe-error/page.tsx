import Link from "next/link";

export const metadata = {
    title: "Invalid Unsubscribe Link | Contest Tracker",
    description: "This unsubscribe link is invalid or has already been used.",
};

export default function UnsubscribeErrorPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080810]">

            {/* ── Ambient background orbs ── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Top-right orange/red orb */}
                <div className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full bg-rose-500/[0.07] blur-[120px]" />
                {/* Bottom-left amber orb */}
                <div className="absolute -bottom-32 -left-32 w-[480px] h-[480px] rounded-full bg-orange-500/[0.05] blur-[100px]" />
                {/* Center faint */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-red-400/[0.03] blur-[80px]" />
            </div>

            {/* ── Subtle dot-grid overlay ── */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.16]"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* ── Card ── */}
            <div className="relative z-10 w-full max-w-[440px] mx-4">

                {/* Outer glow ring */}
                <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-rose-500/30 via-transparent to-orange-500/20 blur-[2px]" />

                <div className="relative rounded-[28px] bg-[#0e0e1a]/95 backdrop-blur-xl border border-white/[0.08] overflow-hidden shadow-2xl">

                    {/* Top accent bar */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-rose-400 to-transparent" />

                    <div className="px-10 pt-10 pb-8 text-center">

                        {/* ── Icon cluster ── */}
                        <div className="relative inline-flex items-center justify-center mb-7">
                            {/* Outer ring — no pulse for error state */}
                            <div className="absolute w-[72px] h-[72px] rounded-full border border-rose-400/20" />
                            {/* Icon circle */}
                            <div className="relative w-[60px] h-[60px] rounded-full bg-gradient-to-br from-rose-500/20 to-rose-700/10 border border-rose-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.15)]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-7 h-7 text-rose-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* ── Headline ── */}
                        <h1 className="text-[28px] font-extrabold text-white mb-2 tracking-tight leading-snug">
                            Link unavailable
                        </h1>
                        <p className="text-[14px] text-white/40 leading-relaxed mb-7 max-w-[300px] mx-auto">
                            This unsubscribe link is invalid or has already been used. Log in to manage your email preferences directly.
                        </p>

                        {/* ── Status pill ── */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-8">
                            <span className="w-2 h-2 rounded-full bg-rose-400" />
                            <span className="text-xs font-semibold text-rose-400 tracking-wide">Invalid or expired link</span>
                        </div>

                        {/* ── Why this happens ── */}
                        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 mb-8 text-left space-y-3">
                            <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-white/20 mb-3">
                                Possible reasons
                            </p>
                            {[
                                { icon: "🔗", text: "The link was already used to unsubscribe" },
                                { icon: "✂️", text: "The URL got cut off or modified" },
                                { icon: "🔄", text: "Your preferences were reset via Settings" },
                            ].map(({ icon, text }) => (
                                <div key={text} className="flex items-start gap-3">
                                    <span className="text-sm mt-[1px]">{icon}</span>
                                    <span className="text-[13px] text-white/35 leading-relaxed">{text}</span>
                                </div>
                            ))}
                        </div>

                        {/* ── CTAs ── */}
                        <div className="space-y-3">
                            <Link
                                href="/sign-in"
                                className="group relative block w-full py-3.5 px-6 rounded-2xl text-sm font-semibold text-white overflow-hidden border border-white/15 bg-white/[0.07] hover:bg-white/[0.11] transition-all duration-200"
                            >
                                Sign In to Manage Preferences
                            </Link>

                            <Link
                                href="/"
                                className="block w-full py-3.5 px-6 rounded-2xl text-sm font-medium text-white/40 hover:text-white/65 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] transition-all duration-200"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>

                    {/* ── Footer strip ── */}
                    <div className="px-10 py-4 border-t border-white/[0.05] bg-black/20 text-center">
                        <p className="text-[11px] text-white/20 leading-relaxed">
                            Need help?{" "}
                            <Link href="/settings" className="text-white/35 underline underline-offset-2 hover:text-white/60 transition-colors">
                                Manage preferences
                            </Link>{" "}
                            directly from your account.
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}
