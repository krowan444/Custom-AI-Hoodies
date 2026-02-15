"use client";

const steps = [
    {
        number: "01",
        title: "Describe Your Vision",
        description: "Type a prompt describing your dream hoodie design. Be as creative as you want — abstract art, animals, landscapes, anything.",
        gradient: "from-violet-500 to-purple-600",
    },
    {
        number: "02",
        title: "AI Generates Your Design",
        description: "Our AI engine creates a unique, high-resolution design tailored to your description. Preview it on a hoodie mockup instantly.",
        gradient: "from-cyan-500 to-blue-600",
    },
    {
        number: "03",
        title: "Order & Receive",
        description: "Love what you see? Order your custom hoodie. We print it on premium fabric and ship it to your door within 24 hours.",
        gradient: "from-emerald-500 to-teal-600",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    How It Works
                </h2>
                <p className="text-white/50 text-lg max-w-2xl mx-auto">
                    From idea to your wardrobe in three simple steps
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${step.gradient} text-white font-bold text-lg mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                            {step.number}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-white/50 leading-relaxed">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
