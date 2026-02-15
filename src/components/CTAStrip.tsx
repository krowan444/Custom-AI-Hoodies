"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CTAStrip() {
    return (
        <section className="py-24 px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-cyan-900/20 pointer-events-none" />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
                    Ready to Wear Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Imagination?</span>
                </h2>
                <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                    Join thousands of creators designing the future of fashion. No design skills needed.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/create">
                        <Button size="lg" glow className="px-10 py-6 text-xl">
                            Start Designing Now
                        </Button>
                    </Link>
                    <Link href="#pricing">
                        <Button variant="outline" size="lg" className="px-10 py-6 text-xl">
                            View Pricing
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
