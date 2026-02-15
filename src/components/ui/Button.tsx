import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    glow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", glow = false, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",

                    // Variants
                    variant === "primary" && "bg-white text-black hover:bg-white/90",
                    variant === "secondary" && "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md",
                    variant === "ghost" && "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
                    variant === "outline" && "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",

                    // Sizes
                    size === "sm" && "h-9 px-4 text-sm",
                    size === "md" && "h-12 px-6 text-base",
                    size === "lg" && "h-14 px-8 text-lg",

                    // Glow Effect (Primary only usually)
                    glow && variant === "primary" && "shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.6)]",
                    glow && variant === "secondary" && "shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)]",

                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
