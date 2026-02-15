import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Custom AI Hoodies | Design Your Imagination",
  description: "Create unique, AI-generated hoodie designs with our powerful design studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.variable} antialiased bg-black text-white font-sans selection:bg-violet-500/30`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
