"use client";

import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
            {/* Background Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

            {/* Badge */}
            <div className="mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/80 text-sm font-medium">AI-Powered Design Studio</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center leading-tight tracking-tight max-w-5xl">
                <span className="text-white">Design Your </span>
                <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    Future
                </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg md:text-xl text-white/60 text-center max-w-2xl leading-relaxed">
                Create unique, AI-generated hoodie designs that express your style. From imagination to reality in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/sign-in">
                    <button className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-lg hover:opacity-90 transition-all hover:shadow-2xl hover:shadow-violet-500/25 hover:-translate-y-0.5">
                        Start Creating
                    </button>
                </Link>
                <Link href="/membership">
                    <button className="px-8 py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-all hover:-translate-y-0.5">
                        View Plans
                    </button>
                </Link>
            </div>

            {/* Stats Bar */}
            <div className="mt-20 grid grid-cols-3 gap-8 md:gap-16">
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
                    <div className="text-sm text-white/50 mt-1">Designs Created</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white">99%</div>
                    <div className="text-sm text-white/50 mt-1">Satisfaction</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white">24h</div>
                    <div className="text-sm text-white/50 mt-1">Fast Delivery</div>
                </div>
            </div>
        </section>
    );
}
