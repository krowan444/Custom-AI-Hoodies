"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Sparkles, Zap, Shield, Crown, Palette, Truck } from "lucide-react";

const features = [
    {
        icon: Sparkles,
        title: "AI Perfection",
        description: "Our advanced models understand style, texture, and lighting to create photorealistic designs."
    },
    {
        icon: Zap,
        title: "Instant Generation",
        description: "Go from text prompt to high-res hoodie mockup in under 30 seconds."
    },
    {
        icon: Palette,
        title: "Limitless Style",
        description: "Cyberpunk, vintage, abstract, or minimal. If you can type it, you can wear it."
    },
    {
        icon: Crown,
        title: "Premium Quality",
        description: "Printed on heavyweight, 400gsm organic cotton that feels as good as it looks."
    },
    {
        icon: Shield,
        title: "Secure & Private",
        description: "Your designs are yours. We use enterprise-grade encryption for all payments and data."
    },
    {
        icon: Truck,
        title: "Global Shipping",
        description: "Fast, tracked shipping to the UK, US, and Europe. Free on orders over £100."
    }
];

export default function FeatureGrid() {
    return (
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Why <span className="text-violet-400">Custom AI</span> Hoodies?
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                    We combine cutting-edge generative AI with premium streetwear quality.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                    <GlassCard key={i} className="p-8 hover:bg-white/10 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-violet-500/30 group-hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]">
                            <feature.icon className="w-6 h-6 text-violet-300" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-white/50 leading-relaxed">
                            {feature.description}
                        </p>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
