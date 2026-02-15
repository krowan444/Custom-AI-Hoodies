"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
    {
        q: "How does the AI design process work?",
        a: "Simply type a text prompt describing what you want. Our AI generates 4 variations. You can upscale your favorite, refine it, and place it on a hoodie mockup instantly."
    },
    {
        q: "What is the quality of the hoodies?",
        a: "We use premium 400gsm organic cotton tailored for a modern, relaxed fit. The print uses DTG (Direct-to-Garment) technology for vibrant, durable colors."
    },
    {
        q: "How long does shipping take?",
        a: "Production takes 1-2 business days. Shipping adds 2-4 days for UK orders and 5-8 days for international orders."
    },
    {
        q: "Can I use the designs for my own brand?",
        a: "Yes! If you subscribe to the 'Mogul' plan, you get a full commercial license for all designs you generate."
    },
    {
        q: "What if I'm not happy with the print?",
        a: "We offer a 100% satisfaction guarantee. If there is a defect in the print or garment, we will replace it for free."
    },
    {
        q: "Do you ship internationally?",
        a: "Yes, we ship to over 50 countries including the US, Canada, Australia, and most of Europe."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Frequently Asked Questions
                </h2>
            </div>

            <div className="space-y-4">
                {items.map((item, i) => (
                    <GlassCard
                        key={i}
                        className="overflow-hidden transition-all duration-300"
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    >
                        <button className="w-full text-left p-6 flex items-center justify-between group">
                            <span className={cn("text-lg font-medium transition-colors", openIndex === i ? "text-violet-300" : "text-white")}>
                                {item.q}
                            </span>
                            <ChevronDown className={cn("w-5 h-5 text-white/50 transition-transform duration-300", openIndex === i && "rotate-180")} />
                        </button>
                        <div
                            className={cn(
                                "px-6 text-white/60 overflow-hidden transition-all duration-300 ease-in-out",
                                openIndex === i ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
                            )}
                        >
                            <p className="leading-relaxed">{item.a}</p>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
}
