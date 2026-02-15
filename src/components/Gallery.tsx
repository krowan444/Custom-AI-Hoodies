"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const hoodies = [
    { src: "/hoodies/IMG_E0576.JPG", alt: "Custom hoodie design 1" },
    { src: "/hoodies/IMG_E0577.JPG", alt: "Custom hoodie design 2" },
    { src: "/hoodies/IMG_E0578.JPG", alt: "Custom hoodie design 3" },
    { src: "/hoodies/IMG_E0581.JPG", alt: "Custom hoodie design 4" },
    { src: "/hoodies/IMG_E0582.JPG", alt: "Custom hoodie design 5" },
    { src: "/hoodies/IMG_E0584.JPG", alt: "Custom hoodie design 6" },
    { src: "/hoodies/IMG_E0585.JPG", alt: "Custom hoodie design 7" },
    { src: "/hoodies/IMG_E0586.JPG", alt: "Custom hoodie design 8" },
    { src: "/hoodies/IMG_E0587.JPG", alt: "Custom hoodie design 9" },
    { src: "/hoodies/IMG_E0589.JPG", alt: "Custom hoodie design 10" },
    { src: "/hoodies/IMG_E0590.JPG", alt: "Custom hoodie design 11" },
    { src: "/hoodies/IMG_E0591.JPG", alt: "Custom hoodie design 12" },
    { src: "/hoodies/IMG_E0592.JPG", alt: "Custom hoodie design 13" },
    { src: "/hoodies/IMG_E0593.JPG", alt: "Custom hoodie design 14" },
];

const CARD_WIDTH = 320; // md width
const CARD_GAP = 24; // gap-6 = 24px
const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;

export default function Gallery() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const animationRef = useRef<number>(0);
    const scrollPosRef = useRef(0);

    const scroll = useCallback((direction: "left" | "right") => {
        const container = scrollRef.current;
        if (!container) return;

        // Pause auto-scroll briefly when user clicks arrows
        setIsPaused(true);

        const amount = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
        scrollPosRef.current += amount;

        // Wrap around
        const halfWidth = container.scrollWidth / 2;
        if (scrollPosRef.current >= halfWidth) scrollPosRef.current = 0;
        if (scrollPosRef.current < 0) scrollPosRef.current = halfWidth - SCROLL_AMOUNT;

        container.scrollTo({ left: scrollPosRef.current, behavior: "smooth" });

        // Resume auto-scroll after 3 seconds
        setTimeout(() => setIsPaused(false), 3000);
    }, []);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const speed = 0.5;

        const animate = () => {
            if (!isPaused) {
                scrollPosRef.current += speed;
                const halfWidth = scrollContainer.scrollWidth / 2;
                if (scrollPosRef.current >= halfWidth) {
                    scrollPosRef.current = 0;
                }
                scrollContainer.scrollLeft = scrollPosRef.current;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current);
    }, [isPaused]);

    // Duplicate items for seamless infinite scroll
    const allHoodies = [...hoodies, ...hoodies];

    return (
        <section className="py-16 overflow-hidden">
            <div className="text-center mb-10 px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Inspiration Gallery
                </h2>
                <p className="text-white/50 text-lg max-w-2xl mx-auto">
                    Real designs created by our AI
                </p>
            </div>

            <div className="relative group/gallery">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll("left")}
                    aria-label="Scroll left"
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all backdrop-blur-sm shadow-lg cursor-pointer"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll("right")}
                    aria-label="Scroll right"
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all backdrop-blur-sm shadow-lg cursor-pointer"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>

                {/* Gradient Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-[5] pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-[5] pointer-events-none" />

                {/* Scrolling Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-hidden px-6"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {allHoodies.map((hoodie, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[280px] md:w-[320px] group"
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-violet-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10">
                                <Image
                                    src={hoodie.src}
                                    alt={hoodie.alt}
                                    fill
                                    sizes="(max-width: 768px) 280px, 320px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
