"use client";

import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
            {/* Background Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />

            {/* Badge */}
            <div className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg shadow-violet-500/10 inline-flex items-center gap-2 hover:border-white/20 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-white/90 text-sm font-medium tracking-wide">AI-Powered Design Studio</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-center leading-tight tracking-tight max-w-5xl drop-shadow-2xl">
                <span className="text-white">Design Your </span>
                <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                    Future
                </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-8 text-lg md:text-xl text-white/60 text-center max-w-2xl leading-relaxed text-balance">
                Create unique, AI-generated hoodie designs that express your style. From imagination to reality in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-5">
                <Link href="/sign-in">
                    <button className="group px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-100 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
                        Start Creating
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                </Link>
                <Link href="/membership">
                    <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5">
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
