"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Alex M.",
        role: "Digital Artist",
        content: "The quality of the print blew me away. I was worried the AI details would get lost, but it looks exactly like the preview.",
        stars: 5,
    },
    {
        name: "Sarah K.",
        role: "Fashion Student",
        content: "Finally, a way to make clothes that actually match my aesthetic. The 'Creator' plan is a steal for the amount of designs you can generate.",
        stars: 5,
    },
    {
        name: "Jordan P.",
        role: "Streamer",
        content: "Ordered merch for my community using this. The turnaround time was insane, and the hoodies are super soft.",
        stars: 4,
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Loved by <span className="text-violet-400">Creators</span>
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                    <GlassCard key={i} className="p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, starIndex) => (
                                    <Star
                                        key={starIndex}
                                        className={`w-4 h-4 ${starIndex < t.stars ? "fill-amber-400 text-amber-400" : "text-white/20"}`}
                                    />
                                ))}
                            </div>
                            <p className="text-white/80 text-lg leading-relaxed mb-6">
                                "{t.content}"
                            </p>
                        </div>
                        <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-bold text-white">
                                {t.name[0]}
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">{t.name}</div>
                                <div className="text-white/40 text-xs">{t.role}</div>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
