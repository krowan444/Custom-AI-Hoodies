"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Sparkles } from "lucide-react";

const rotatingPrompts = [
    "Cyberpunk neon streetwear hoodie...",
    "Minimal luxury black and gold design...",
    "Anime-inspired pastel aesthetic...",
    "Spiritual sacred geometry hoodie...",
    "Futuristic AI glitch art style...",
    "Vintage 90s vaporwave collage..."
];

export default function IdentityBridge() {
    const [promptIndex, setPromptIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPromptIndex((prev) => (prev + 1) % rotatingPrompts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-32 px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Left: Emotional Copy */}
                <div className="space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Your Vision. <br />
                        Your Style. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                            Your Statement.
                        </span>
                    </h2>
                    <div className="space-y-4 text-lg text-white/70">
                        <p>Not just clothing. A reflection of who you are.</p>
                        <p>
                            Cyberpunk, spiritual, anime, minimal, luxury — whatever lives in your imagination becomes wearable.
                        </p>
                        <div className="pt-4 border-l-2 border-violet-500 pl-4">
                            <h3 className="text-white font-bold text-xl mb-2">Why CustomAIHoodies Exists</h3>
                            <p className="text-sm text-white/50">
                                We believe clothing should reflect imagination — not mass production.
                                No design skills. No limits. Just your vision brought to life.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Rotating Prompt Inspiration */}
                <GlassCard className="p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6 text-violet-300 font-medium tracking-wide uppercase text-sm">
                            <Sparkles className="w-4 h-4" />
                            <span>Imagine Your Hoodie</span>
                        </div>

                        <div className="text-2xl md:text-4xl font-bold text-white mb-8 min-h-[80px] transition-all duration-500">
                            "{rotatingPrompts[promptIndex]}"
                        </div>

                        <div className="flex items-center gap-3 text-white/40 text-sm">
                            <div className="h-px bg-white/10 flex-1" />
                            <span>No design skills needed</span>
                            <div className="h-px bg-white/10 flex-1" />
                        </div>
                    </div>
                </GlassCard>

            </div>
        </section>
    );
}
