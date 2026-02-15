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

const NORMAL_SPEED = 0.5;
const FAST_SPEED = 4;

export default function Gallery() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollPosRef = useRef(0);
    const speedRef = useRef(NORMAL_SPEED);
    const directionRef = useRef<1 | -1>(1); // 1 = right, -1 = left

    const handleArrowHover = useCallback((direction: "left" | "right") => {
        directionRef.current = direction === "left" ? -1 : 1;
        speedRef.current = FAST_SPEED;
    }, []);

    const handleArrowLeave = useCallback(() => {
        directionRef.current = 1; // resume normal right scroll
        speedRef.current = NORMAL_SPEED;
    }, []);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId: number;

        const animate = () => {
            scrollPosRef.current += speedRef.current * directionRef.current;

            const halfWidth = scrollContainer.scrollWidth / 2;
            if (scrollPosRef.current >= halfWidth) scrollPosRef.current = 0;
            if (scrollPosRef.current < 0) scrollPosRef.current = halfWidth;

            scrollContainer.scrollLeft = scrollPosRef.current;
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

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

            <div className="relative">
                {/* Left Arrow */}
                <button
                    onMouseEnter={() => handleArrowHover("left")}
                    onMouseLeave={handleArrowLeave}
                    aria-label="Scroll left"
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:border-white/40 transition-all backdrop-blur-sm shadow-lg cursor-pointer"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                {/* Right Arrow */}
                <button
                    onMouseEnter={() => handleArrowHover("right")}
                    onMouseLeave={handleArrowLeave}
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
                >
                    {allHoodies.map((hoodie, i) => (
                        <div key={i} className="flex-shrink-0 w-[280px] md:w-[320px] group">
                            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/20 hover:scale-[1.02]">
                                <Image
                                    src={hoodie.src}
                                    alt={hoodie.alt}
                                    fill
                                    sizes="(max-width: 768px) 280px, 320px"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
