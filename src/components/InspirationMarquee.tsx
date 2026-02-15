"use client";

const inspirations = [
    "Cyberpunk Wolf", "Neon Galaxy", "Abstract Waves", "Geometric Fox",
    "Retro Sunset", "Digital Dreams", "Cosmic Flowers", "Urban Jungle",
    "Crystal Skull", "Holographic", "Vapor Wave", "Pixel Art",
];

export default function InspirationMarquee() {
    return (
        <section className="py-8 border-y border-white/5 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...inspirations, ...inspirations].map((item, i) => (
                    <span
                        key={i}
                        className="mx-8 text-white/30 text-sm font-medium uppercase tracking-widest hover:text-violet-400 transition-colors cursor-default"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </section>
    );
}
