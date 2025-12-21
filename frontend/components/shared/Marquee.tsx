"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MarqueeProps {
    children: React.ReactNode;
    className?: string;
    duration?: number;
    reverse?: boolean;
    direction?: "left" | "right";
}

export function Marquee({
    children,
    className,
    duration = 20,
    reverse = false,
    direction = "left",
}: MarqueeProps) {
    const isReverse = reverse || direction === "right";

    return (
        <div className={cn("flex overflow-hidden whitespace-nowrap select-none", className)}>
            <motion.div
                className="flex min-w-full shrink-0 items-center gap-10 pr-10"
                initial={{ x: isReverse ? "-100%" : "0%" }}
                animate={{ x: isReverse ? "0%" : "-100%" }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {children}
                {children}
                {children}
                {children}
            </motion.div>
            <motion.div
                className="flex min-w-full shrink-0 items-center gap-10 pr-10"
                initial={{ x: isReverse ? "-100%" : "0%" }}
                animate={{ x: isReverse ? "0%" : "-100%" }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}
