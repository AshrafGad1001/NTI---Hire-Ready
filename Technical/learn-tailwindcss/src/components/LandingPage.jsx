export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

            {/* ===== NAVBAR ===== */}
            <nav className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-sky-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">T</div>
                    <span className="font-semibold text-sm">TailwindApp</span>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Features</a>
                    <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Pricing</a>
                    <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Docs</a>
                </div>
                <button className="bg-sky-500 hover:bg-sky-600 active:scale-95 transition-all text-white text-sm font-medium px-4 py-2 rounded-lg">
                    Get started free
                </button>
            </nav>

            {/* ===== HERO ===== */}
            <section className="text-center px-8 py-24 bg-sky-50">
                <span className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-xs font-medium px-3 py-1 rounded-full border border-sky-200 mb-6">
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                    Tailwind CSS v4 — now available
                </span>

                <h1 className="text-5xl font-bold leading-tight text-slate-900 mb-4">
                    Build interfaces{" "}
                    <span className="text-sky-500">way faster</span>
                    <br />
                    without writing CSS
                </h1>

                <p className="text-slate-500 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                    Tailwind gives you ready-made utility classes — spacing, colors,
                    typography, hover states — all directly in your HTML.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 active:scale-95 transition-all text-white font-semibold px-8 py-3 rounded-xl shadow-md shadow-sky-200">
                        Get started free →
                    </button>
                    <button className="w-full sm:w-auto bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium px-8 py-3 rounded-xl transition-all">
                        View the docs
                    </button>
                </div>

                <p className="text-slate-400 text-sm mt-8">Used by 50,000+ developers every day</p>
            </section>

            {/* ===== FEATURES ===== */}
            <section className="px-8 py-20 max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Why Tailwind?</h2>
                    <p className="text-slate-500 max-w-sm mx-auto">All the reasons you won't go back to plain CSS</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 transition-colors duration-200 ${f.iconBg} group-hover:${f.iconHover}`}>
                                {f.icon}
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== PRICING ===== */}
            <section className="bg-slate-900 px-8 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-3">Pricing</h2>
                    <p className="text-slate-400">Pick the plan that works for you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-2xl p-6 transition-colors ${plan.featured
                                    ? "border-2 border-sky-500 bg-sky-500/5"
                                    : "border border-slate-700 hover:border-slate-500 bg-slate-800"
                                }`}
                        >
                            {plan.featured && (
                                <span className="bg-sky-500/20 text-sky-400 text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
                                    Most popular
                                </span>
                            )}
                            <p className="text-slate-400 text-sm mb-1">{plan.name}</p>
                            <p className="text-4xl font-bold text-white">{plan.price}</p>
                            <p className="text-slate-500 text-sm mb-6">/month</p>

                            <ul className="space-y-2 mb-6">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className={`flex items-center gap-2 text-sm ${feat.included ? "text-slate-300" : "text-slate-600"}`}>
                                        <span className={feat.included ? "text-sky-400" : ""}>
                                            {feat.included ? "✓" : "✗"}
                                        </span>
                                        {feat.label}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${plan.featured
                                        ? "bg-sky-500 hover:bg-sky-400 text-white"
                                        : "border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white"
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="flex flex-wrap items-center justify-between gap-4 px-8 py-6 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-sm font-semibold">
                    <div className="w-5 h-5 bg-sky-500 rounded flex items-center justify-center text-white text-xs font-bold">T</div>
                    TailwindApp
                </div>
                <p className="text-slate-400 text-sm">Built as a Tailwind CSS learning example</p>
                <div className="flex gap-5">
                    {["Docs", "GitHub", "Contact"].map((link) => (
                        <a key={link} href="#" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">
                            {link}
                        </a>
                    ))}
                </div>
            </footer>

        </div>
    );
}

// ===== DATA =====

const features = [
    { icon: "⚡", title: "Super fast", desc: "No time wasted naming classes. The utility is already there.", iconBg: "bg-sky-100", iconHover: "bg-sky-500" },
    { icon: "🎨", title: "Design system included", desc: "Consistent color and spacing scale from day one.", iconBg: "bg-violet-100", iconHover: "bg-violet-500" },
    { icon: "📱", title: "Responsive by default", desc: "Use md: and lg: prefixes to control any screen size.", iconBg: "bg-emerald-100", iconHover: "bg-emerald-500" },
    { icon: "🔍", title: "Pseudo classes", desc: "hover:, focus:, active: — directly on the element, no extra CSS.", iconBg: "bg-amber-100", iconHover: "bg-amber-500" },
    { icon: "✨", title: "Pseudo elements", desc: "before: and after: without ever opening a CSS file.", iconBg: "bg-pink-100", iconHover: "bg-pink-500" },
    { icon: "🚀", title: "Auto purge", desc: "The build removes every unused class — tiny final bundle.", iconBg: "bg-green-100", iconHover: "bg-green-500" },
];

const plans = [
    {
        name: "Free", price: "$0", featured: false, cta: "Get started",
        features: [
            { label: "3 projects", included: true },
            { label: "Core utilities", included: true },
            { label: "Responsive prefixes", included: false },
        ],
    },
    {
        name: "Pro", price: "$12", featured: true, cta: "Subscribe now",
        features: [
            { label: "Unlimited projects", included: true },
            { label: "All utilities", included: true },
            { label: "Dark mode + Responsive", included: true },
        ],
    },
    {
        name: "Team", price: "$49", featured: false, cta: "Contact us",
        features: [
            { label: "Everything in Pro", included: true },
            { label: "10 members", included: true },
            { label: "Priority support", included: true },
        ],
    },
];