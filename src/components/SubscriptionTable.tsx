"use client";

import Link from "next/link";

const plans = [
    {
        name: "Enthusiast",
        price: "£9.99",
        period: "/month",
        features: ["10 AI generations/month", "5% order discount", "Standard support", "Basic templates"],
        gradient: "from-violet-500 to-purple-600",
        popular: false,
    },
    {
        name: "Creator",
        price: "£19.99",
        period: "/month",
        features: ["50 AI generations/month", "15% order discount", "Priority support", "Premium templates", "Early access features"],
        gradient: "from-cyan-500 to-blue-600",
        popular: true,
    },
    {
        name: "Mogul",
        price: "£49.99",
        period: "/month",
        features: ["Unlimited generations", "25% order discount", "24/7 VIP support", "All templates", "Commercial license", "API access"],
        gradient: "from-amber-500 to-orange-600",
        popular: false,
    },
];

export default function SubscriptionTable() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Choose Your Plan
                </h2>
                <p className="text-white/50 text-lg max-w-2xl mx-auto">
                    Unlock your creative potential with a plan that fits your needs
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative rounded-2xl border ${plan.popular ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/10 bg-white/[0.02]'} p-8 hover:-translate-y-1 transition-all duration-300`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                                Most Popular
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                            <span className="text-white/50">{plan.period}</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Link href="/membership">
                            <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 shadow-lg shadow-cyan-500/25' : 'border border-white/20 text-white hover:bg-white/5'}`}>
                                Get Started
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
