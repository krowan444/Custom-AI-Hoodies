"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const hoodies = [
    { src: "/hoodies/IMG_0535.PNG", alt: "Custom hoodie design 1" },
    { src: "/hoodies/IMG_0536.PNG", alt: "Custom hoodie design 2" },
    { src: "/hoodies/IMG_0537.PNG", alt: "Custom hoodie design 3" },
    { src: "/hoodies/IMG_0538.PNG", alt: "Custom hoodie design 4" },
    { src: "/hoodies/IMG_E0576.JPG", alt: "Custom hoodie design 5" },
    { src: "/hoodies/IMG_E0577.JPG", alt: "Custom hoodie design 6" },
    { src: "/hoodies/IMG_E0578.JPG", alt: "Custom hoodie design 7" },
    { src: "/hoodies/IMG_E0581.JPG", alt: "Custom hoodie design 8" },
    { src: "/hoodies/IMG_E0582.JPG", alt: "Custom hoodie design 9" },
    { src: "/hoodies/IMG_E0584.JPG", alt: "Custom hoodie design 10" },
    { src: "/hoodies/IMG_E0585.JPG", alt: "Custom hoodie design 11" },
    { src: "/hoodies/IMG_E0586.JPG", alt: "Custom hoodie design 12" },
    { src: "/hoodies/IMG_E0587.JPG", alt: "Custom hoodie design 13" },
    { src: "/hoodies/IMG_E0589.JPG", alt: "Custom hoodie design 14" },
    { src: "/hoodies/IMG_E0590.JPG", alt: "Custom hoodie design 15" },
    { src: "/hoodies/IMG_E0591.JPG", alt: "Custom hoodie design 16" },
    { src: "/hoodies/IMG_E0592.JPG", alt: "Custom hoodie design 17" },
    { src: "/hoodies/IMG_E0593.JPG", alt: "Custom hoodie design 18" },
];

export default function Gallery() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationId: number;
        let scrollPos = 0;
        const speed = 0.5; // pixels per frame

        const animate = () => {
            scrollPos += speed;
            // Reset when we've scrolled through half the items (since we duplicate them)
            const halfWidth = scrollContainer.scrollWidth / 2;
            if (scrollPos >= halfWidth) {
                scrollPos = 0;
            }
            scrollContainer.scrollLeft = scrollPos;
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        // Pause on hover
        const handleMouseEnter = () => cancelAnimationFrame(animationId);
        const handleMouseLeave = () => {
            animationId = requestAnimationFrame(animate);
        };

        scrollContainer.addEventListener("mouseenter", handleMouseEnter);
        scrollContainer.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationId);
            scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
            scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // Duplicate items for seamless infinite scroll
    const allHoodies = [...hoodies, ...hoodies];

    return (
        <section className="py-16 overflow-hidden">
            <div className="text-center mb-10 px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Inspiration Gallery
                </h2>
                <p className="text-white/50 text-lg max-w-2xl mx-auto">
                    Real designs created by our AI — hover to pause, scroll to explore
                </p>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-hidden px-6"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
