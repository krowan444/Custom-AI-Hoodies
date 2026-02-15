"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import Image from "next/image";

const examples = [
    {
        prompt: "Cyberpunk samurai glitsch art, neon colors, detailed vector style",
        image: "/hoodies/samurai-hoodie.png", // Fallback to existing images
        color: "from-pink-500 to-rose-500"
    },
    {
        prompt: "Abstract geometric waves, vaporwave aesthetic, pastel gradients",
        image: "/hoodies/abstract-hoodie.png",
        color: "from-cyan-400 to-blue-500"
    },
    {
        prompt: "Vintage japanese woodblock print of a cat surfing, textured",
        image: "/hoodies/cat-surfing.png",
        color: "from-amber-400 to-orange-500"
    }
];

export default function PromptShowcase() {
    return (
        <section id="showcase" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    From <span className="text-cyan-400">Prompt</span> to Product
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                    See how simple text transforms into wearable art.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                {examples.map((ex, i) => (
                    <GlassCard key={i} className="group p-2 overflow-hidden">
                        {/* Mock Preview Window */}
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/40 mb-4 border border-white/5">
                            <Image
                                src={ex.image}
                                alt="Prompt visualization"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Prompt Overlay */}
                            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                                <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Input Prompt</div>
                                <p className="text-white text-sm font-medium leading-relaxed">
                                    "{ex.prompt}"
                                </p>
                            </div>
                        </div>

                        <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${ex.color} opacity-70`} />
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
