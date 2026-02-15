import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { checkSubscription } from "@/lib/subscription";

// Plan Configuration (In real app, fetch from Stripe or Config)
const PLANS = [
    {
        name: "Enthusiast",
        price: "£9.99",
        limit: "10 Generations",
        discount: "5% Off Hoodies",
        stripePriceIdKey: "STRIPE_PRICE_ENTHUSIAST",
        color: "from-blue-500 to-cyan-400",
    },
    {
        name: "Creator",
        price: "£24.99",
        limit: "50 Generations",
        discount: "15% Off Hoodies",
        stripePriceIdKey: "STRIPE_PRICE_CREATOR",
        color: "from-violet-600 to-purple-400",
        popular: true,
    },
    {
        name: "Mogul",
        price: "£49.99",
        limit: "Unlimited Generations",
        discount: "25% Off Hoodies",
        stripePriceIdKey: "STRIPE_PRICE_MOGUL",
        color: "from-amber-400 to-orange-500",
    },
];

export default async function MembershipPage() {
    const { userId } = await auth();
    const isSubscribed = await checkSubscription();

    if (!userId) {
        redirect("/sign-in");
    }

    if (isSubscribed) {
        redirect("/create");
    }

    return (
        <div className="min-h-screen bg-black text-white py-20 px-6">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">
                    Choose Your Edge
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Unlock the advanced AI generation engine and get exclusive member-only pricing on physical drops.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {PLANS.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative p-8 rounded-3xl border ${plan.popular ? "border-violet-500 bg-white/5" : "border-white/10 bg-black"
                            } flex flex-col`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-violet-600 rounded-full text-xs font-bold uppercase tracking-widest">
                                Most Popular
                            </div>
                        )}

                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-4xl font-black mb-6">{plan.price}<span className="text-sm font-normal text-gray-400">/mo</span></div>

                        <ul className="space-y-4 mb-8 flex-grow">
                            <li className="flex items-center gap-3 text-sm">
                                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {plan.limit}
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {plan.discount}
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-400">
                                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Stripe Secure Payment
                            </li>
                        </ul>

                        <form action="/api/stripe/checkout" method="POST">
                            <input type="hidden" name="priceKey" value={plan.stripePriceIdKey} />
                            <button
                                type="submit"
                                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform bg-gradient-to-r ${plan.color}`}
                            >
                                Select Tier
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
