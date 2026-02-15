"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreatePage() {
    const router = useRouter();
    const [prompt, setPrompt] = useState("");
    const [color, setColor] = useState("Black");
    const [size, setSize] = useState("L");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                body: JSON.stringify({ prompt, color, size }),
            });

            if (!res.ok) {
                if (res.status === 403) router.push("/membership");
                const msg = await res.text();
                throw new Error(msg);
            }

            const data = await res.json();
            setResult(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBuy = async () => {
        if (!result || !result.design) return;

        try {
            const res = await fetch("/api/stripe/order-checkout", {
                method: "POST",
                body: JSON.stringify({
                    designId: result.design.id,
                    color,
                    size
                })
            });

            if (!res.ok) throw new Error("Checkout Failed");
            const { url } = await res.json();
            if (url) window.location.href = url;
        } catch (e) {
            setError("Failed to initiate checkout. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-24">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Left: Input & Config */}
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                        Creation Engine
                    </h1>

                    <div className="space-y-8">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                Vision Prompt
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe your masterpiece..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:outline-none focus:border-violet-500 transition-colors h-40 resize-none"
                            />
                        </div>

                        <div className="flex gap-8">
                            <div className="flex-1">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    Base Color
                                </label>
                                <div className="flex gap-4">
                                    {["Black", "White", "Navy"].map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setColor(c)}
                                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${color === c ? "border-violet-500 bg-violet-500/10 text-white" : "border-white/10 text-gray-400 hover:bg-white/5"
                                                }`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                                    Size
                                </label>
                                <div className="flex gap-2">
                                    {["S", "M", "L", "XL", "XXL"].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSize(s)}
                                            className={`w-10 h-10 rounded-lg border text-sm font-bold flex items-center justify-center transition-all ${size === s ? "border-cyan-500 bg-cyan-500/10 text-cyan-400" : "border-white/10 text-gray-400 hover:bg-white/5"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleGenerate}
                            disabled={loading || !prompt}
                            className="w-full py-6 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 font-bold uppercase tracking-[0.2em] hover:opacity-90 disabled:opacity-50 transition-all text-lg shadow-xl shadow-violet-900/20"
                        >
                            {loading ? "Forging..." : "Generate Design"}
                        </button>

                        {result && (
                            <p className="text-center text-xs text-gray-500 font-mono mt-4">
                                REMAINING CREDITS: {result.remaining} / {result.limit}
                            </p>
                        )}
                    </div>
                </div>

                {/* Right: Preview & Order */}
                <div className="relative">
                    <div className="aspect-[3/4] rounded-[2.5rem] bg-white/5 border border-white/10 p-8 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

                        {result ? (
                            <>
                                <div className="flex-grow flex items-center justify-center relative">
                                    {/* Simple mock composition */}
                                    <div className="relative w-full h-full max-h-[500px] bg-black rounded-xl overflow-hidden shadow-2xl border border-white/5">
                                        <img
                                            src={result.design.image_url}
                                            alt="Generated Design"
                                            className="w-full h-full object-cover opacity-80"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className="text-[10rem] font-black text-white/5 uppercase rotate-[-15deg]">
                                                {size}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                                    <div className="flex justify-between items-end mb-6">
                                        <div>
                                            <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total (Incl. Shipping)</div>
                                            <div className="text-3xl font-black">£45.98</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full uppercase tracking-wider mb-1">
                                                Member Discount Applied
                                            </div>
                                            <div className="text-xs text-gray-500 line-through">£52.98</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleBuy}
                                        className="w-full py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest hover:bg-gray-200 transition-colors"
                                    >
                                        Order Hoodie
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex-grow flex items-center justify-center text-gray-600 font-mono text-sm border-2 border-dashed border-white/10 rounded-2xl">
                                [PREVIEW MATRIX OFFLINE]
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
