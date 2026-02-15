"use client";

import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

const plans = [
    {
        name: "Enthusiast",
        price: "£9.99",
        period: "/month",
        features: ["10 AI generations/month", "5% order discount", "Standard support", "Basic templates"],
        gradient: "from-violet-500 to-purple-600",
        popular: false,
        stripeLink: "https://buy.stripe.com/dRmaEXgqgftS1wC01Odby01",
    },
    {
        name: "Creator",
        price: "£24.99",
        period: "/month",
        features: ["50 AI generations/month", "15% order discount", "Priority support", "Premium templates", "Early access features"],
        gradient: "from-cyan-500 to-blue-600",
        popular: true,
        stripeLink: "https://buy.stripe.com/eVqaEXb5WepO7V04i4dby02",
    },
    {
        name: "Mogul",
        price: "£49.99",
        period: "/month",
        features: ["Unlimited generations", "25% order discount", "24/7 VIP support", "All templates", "Commercial license", "API access"],
        gradient: "from-amber-500 to-orange-600",
        popular: false,
        stripeLink: "https://buy.stripe.com/aFa00jfmc95u4IOaGsdby03",
    },
];

export default function SubscriptionTable() {
    return (
        <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
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
                    <GlassCard
                        key={plan.name}
                        className={`p-8 flex flex-col h-full bg-white/5 ${plan.popular
                                ? 'border-violet-500/50 shadow-[0_0_50px_-10px_rgba(139,92,246,0.3)] bg-violet-500/5'
                                : 'bg-white/5'
                            }`}
                        hoverEffect={true}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-cyan-500/40 z-20">
                                Most Popular
                            </div>
                        )}

                        {/* Plan Header */}
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                            <span className="text-white/50">{plan.period}</span>
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-8 flex-grow">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {/* CTA Button */}
                        <a href={plan.stripeLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
                            <Button
                                className="w-full"
                                variant={plan.popular ? 'primary' : 'outline'}
                                glow={plan.popular}
                            >
                                Get Started
                            </Button>
                        </a>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
