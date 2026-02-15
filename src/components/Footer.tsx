"use client";

import Link from "next/link";

const socialLinks = [
    {
        name: "Instagram",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        name: "TikTok",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34A6.34 6.34 0 009.49 21.64a6.34 6.34 0 006.34-6.34V8.56a8.13 8.13 0 004.76 1.52V6.69h-1z" />
            </svg>
        ),
    },
    {
        name: "X",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        name: "Facebook",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                                AI
                            </div>
                            <span className="text-white font-bold text-lg">Custom AI Hoodies</span>
                        </div>
                        <p className="text-white/40 max-w-sm leading-relaxed">
                            AI-powered custom hoodie design studio. From imagination to your wardrobe.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
                        <ul className="space-y-3">
                            <li><Link href="/create" className="text-white/40 hover:text-white/80 transition-colors text-sm">Create Design</Link></li>
                            <li><Link href="/membership" className="text-white/40 hover:text-white/80 transition-colors text-sm">Pricing</Link></li>
                            <li><Link href="/account" className="text-white/40 hover:text-white/80 transition-colors text-sm">My Account</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Follow Us</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/30 text-sm">
                        © {new Date().getFullYear()} Custom AI Hoodies. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">Privacy</a>
                        <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
