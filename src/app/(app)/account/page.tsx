import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import Image from "next/image";
import Link from "next/link";

export default async function AccountPage() {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
        redirect("/sign-in");
    }

    // Fetch Designs
    const { data: designs } = await supabaseAdmin
        .from("designs")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    // Fetch Orders
    const { data: orders } = await supabaseAdmin
        .from("orders")
        .select("*, designs(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">
                            Command Center
                        </h1>
                        <p className="text-gray-400">Welcome back, {user?.firstName}</p>
                    </div>
                    <Link href="/create">
                        <button className="px-6 py-3 bg-white text-black font-bold uppercase rounded-lg hover:bg-gray-200">
                            New Design
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Recent Designs */}
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-widest text-gray-500 mb-6">Recent Designs</h2>
                        <div className="space-y-4">
                            {designs && designs.length > 0 ? (
                                designs.map((design: any) => (
                                    <div key={design.id} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                                        <div className="w-20 h-20 rounded-lg bg-black overflow-hidden relative shrink-0">
                                            <Image src={design.image_url} alt="Design" fill className="object-cover" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm mb-1 line-clamp-1">{design.prompt}</div>
                                            <div className="text-xs text-gray-400 uppercase">{design.hoodie_color} • {design.hoodie_size}</div>
                                            <div className="text-xs text-gray-500 mt-2">Created {new Date(design.created_at).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 italic">No designs forged yet.</div>
                            )}
                        </div>
                    </div>

                    {/* Order History */}
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-widest text-gray-500 mb-6">Order History</h2>
                        <div className="space-y-4">
                            {orders && orders.length > 0 ? (
                                orders.map((order: any) => (
                                    <div key={order.id} className="p-6 rounded-xl bg-white/5 border border-white/10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="font-bold text-lg">Order #{order.id.slice(0, 8)}</div>
                                                <div className="text-sm text-gray-400 capitalize">{order.status}</div>
                                            </div>
                                            <div className="text-xl font-bold">£{order.total_gbp}</div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="w-12 h-12 rounded bg-black overflow-hidden relative shrink-0">
                                                <Image src={order.designs?.image_url || '/placeholder.png'} alt="Design" fill className="object-cover" />
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                Custom Hoodie ({order.hoodie_color}, {order.hoodie_size})<br />
                                                <span className="text-xs opacity-70">Incl. £{order.shipping_gbp} Shipping</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500 italic">No orders yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
