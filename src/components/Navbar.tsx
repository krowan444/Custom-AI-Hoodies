"use client";

import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/50 transition-shadow">
                        AI
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
                        Custom AI Hoodies
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                        Home
                    </Link>
                    <Link href="/membership" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                        Membership
                    </Link>
                    <Link href="/create" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                        Create
                    </Link>
                    <Link href="/account" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                        Account
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <Link href="/sign-in">
                            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25">
                                Sign In
                            </button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 ring-2 ring-violet-500/50",
                                },
                            }}
                        />
                    </SignedIn>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-white/70 hover:text-white ml-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {menuOpen ? (
                                <>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </>
                            ) : (
                                <>
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className="md:hidden fixed inset-0 top-[73px] bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
                    <Link href="/" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-semibold hover:text-violet-400 transition-colors">
                        Home
                    </Link>
                    <Link href="/membership" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-semibold hover:text-violet-400 transition-colors">
                        Membership
                    </Link>
                    <Link href="/create" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-semibold hover:text-violet-400 transition-colors">
                        Create
                    </Link>
                    <Link href="/account" onClick={() => setMenuOpen(false)} className="text-white text-2xl font-semibold hover:text-violet-400 transition-colors">
                        Account
                    </Link>
                </div>
            )}
        </nav>
    );
}
