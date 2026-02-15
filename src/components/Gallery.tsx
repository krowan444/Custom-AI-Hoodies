"use client";

const designs = [
    { prompt: "Cyberpunk Wolf", color: "#6d28d9" },
    { prompt: "Neon Galaxy", color: "#0891b2" },
    { prompt: "Abstract Waves", color: "#059669" },
    { prompt: "Geometric Fox", color: "#dc2626" },
    { prompt: "Retro Sunset", color: "#ea580c" },
    { prompt: "Digital Dreams", color: "#7c3aed" },
];

export default function Gallery() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Recent Creations
                </h2>
                <p className="text-white/50 text-lg max-w-2xl mx-auto">
                    See what our community has been designing
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {designs.map((design, i) => (
                    <div
                        key={i}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:-translate-y-1 transition-all duration-300"
                    >
                        {/* Placeholder Gradient Design */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(135deg, ${design.color}40, ${design.color}20, #0a0a0a)`,
                            }}
                        />
                        {/* Hoodie Silhouette */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-20 group-hover:opacity-40 transition-opacity">
                                <path d="M60 20C50 20 42 28 40 38L25 55V80L35 85V100H85V85L95 80V55L80 38C78 28 70 20 60 20Z" stroke="white" strokeWidth="2" />
                                <path d="M45 38C45 38 50 45 60 45C70 45 75 38 75 38" stroke="white" strokeWidth="2" />
                            </svg>
                        </div>
                        {/* Label */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white font-medium text-sm">{design.prompt}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
