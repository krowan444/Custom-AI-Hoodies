export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Placeholder for App Sidebar/Header */}
            <nav className="border-b border-white/10 p-4 flex justify-between items-center bg-black/20 backdrop-blur-md sticky top-0 z-50">
                <div className="font-bold text-xl tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Studio
                </div>
                {/* We will add UserButton here later */}
            </nav>
            <main className="p-6">
                {children}
            </main>
        </div>
    );
}
