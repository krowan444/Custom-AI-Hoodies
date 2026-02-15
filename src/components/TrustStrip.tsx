import { ShieldCheck, Truck, RefreshCcw, Lock } from "lucide-react";

const policies = [
    { icon: ShieldCheck, text: "Secure Payments" },
    { icon: Truck, text: "Worldwide Shipping" },
    { icon: RefreshCcw, text: "Free Returns*" },
    { icon: Lock, text: "Encrypted Data" },
];

export default function TrustStrip() {
    return (
        <section className="border-t border-white/5 bg-black/40 backdrop-blur-md py-8">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16">
                {policies.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/40 hover:text-white/70 transition-colors cursor-default">
                        <p.icon className="w-5 h-5" />
                        <span className="text-sm font-medium uppercase tracking-wider">{p.text}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
