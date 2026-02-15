import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

/* 
  SECURITY NOTE: 
  This page is protected by checking the user's email against the ADMIN_EMAILS env var.
*/

export default async function AdminPage() {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        redirect("/sign-in");
    }

    const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
    const superAdmins = ["kierandrowan@gmail.com"];
    const userEmail = user.emailAddresses[0].emailAddress;

    if (!adminEmails.includes(userEmail) && !superAdmins.includes(userEmail)) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <h1 className="text-red-500 text-3xl font-bold uppercase">Access Denied</h1>
                <p className="mt-4 text-gray-400">Your email ({userEmail}) isn't on the list.</p>
            </div>
        );
    }

    // Action to Simulate Plan
    async function simulatePlan(formData: FormData) {
        "use server";
        const targetUserId = formData.get("userId") as string;
        const plan = formData.get("plan") as string;

        if (!targetUserId) return;

        let priceId = "";
        if (plan === "enthusiast") priceId = process.env.STRIPE_PRICE_ENTHUSIAST!;
        if (plan === "creator") priceId = process.env.STRIPE_PRICE_CREATOR!;
        if (plan === "mogul") priceId = process.env.STRIPE_PRICE_MOGUL!;

        // Upsert subscription
        await supabaseAdmin.from("subscriptions").upsert({
            user_id: targetUserId,
            status: "active",
            price_id: priceId,
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // +30 days
            cancel_at_period_end: false,
        });

        // Reset usage
        await supabaseAdmin.from("usage").delete().eq("user_id", targetUserId);

        revalidatePath("/admin");
    }

    return (
        <div className="min-h-screen bg-black text-white p-12 font-mono">
            <h1 className="text-4xl font-bold mb-8 text-red-500 uppercase border-b border-red-900 pb-4">
                Admin Control Panel
            </h1>

            <div className="bg-red-900/20 border border-red-500/30 p-8 rounded-xl max-w-2xl">
                <h2 className="text-xl font-bold mb-4 uppercase">Simulate Subscription</h2>
                <p className="text-sm text-gray-400 mb-6">
                    For testing only. This will override the target user's subscription in Supabase.
                </p>

                <form action={simulatePlan} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase mb-1">Target User ID (Clerk)</label>
                        <input
                            name="userId"
                            defaultValue={userId}
                            className="w-full bg-black border border-white/20 p-2 rounded text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase mb-1">Select Tier</label>
                        <select name="plan" className="w-full bg-black border border-white/20 p-2 rounded text-white">
                            <option value="enthusiast">Enthusiast (10 gens)</option>
                            <option value="creator">Creator (50 gens)</option>
                            <option value="mogul">Mogul (Unlimited)</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase rounded">
                        Apply Simulation
                    </button>
                </form>
            </div>
        </div>
    );
}
