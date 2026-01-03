"use client";

import { StarryBackground } from "@/components/features/hero/StarryBackground";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/shared/Marquee";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative min-h-screen w-full flex flex-col overflow-hidden" style={{ backgroundColor: '#1A233A' }}>
            {/* Background Layer - Force behind everything */}
            <div className="absolute inset-0">
                <StarryBackground />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A233A]/50 to-[#1A233A] z-[1]" />

            {/* Content Layer */}
            <div className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center safe-area-inset-top">

                {/* Floating Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 md:mb-10"
                >
                    <div className="inline-flex items-center gap-2 md:gap-3 border-2 border-[#F4C430] bg-[#1A233A] px-3 md:px-5 py-2 md:py-2.5 shadow-[3px_3px_0px_0px_#F4C430] md:shadow-[4px_4px_0px_0px_#F4C430] crt-flicker">
                        <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B0000] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-[#8B0000]"></span>
                        </span>
                        <span className="text-[#F4C430] font-pixel tracking-wider text-[7px] md:text-[8px] uppercase">Live in Abuja • Jan 10</span>
                    </div>
                </motion.div>

                {/* Title - Clean Single Block */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 md:mb-10"
                >
                    <h1 className="font-script text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] leading-[0.85] text-[#EFE6D5] -rotate-2 select-none chromatic-aberration">
                        Yard <span className="text-[#F4C430]">Drive-</span>
                    </h1>
                    <h1 className="font-script text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] leading-[0.85] text-[#EFE6D5] rotate-1 select-none -mt-1 md:-mt-4 chromatic-aberration">
                        In
                    </h1>
                </motion.div>

                {/* Event Details Row */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-4 md:gap-12 mb-6 md:mb-10 text-[#EFE6D5]"
                >
                    <div className="text-center">
                        <p className="text-[#F4C430] text-[7px] md:text-[8px] font-pixel tracking-widest uppercase mb-1 md:mb-2">When</p>
                        <p className="font-mono font-bold text-xs md:text-base uppercase tracking-wide">Gates 5PM</p>
                    </div>
                    <div className="w-px h-6 md:h-8 bg-[#F4C430]/40" />
                    <div className="text-center">
                        <p className="text-[#F4C430] text-[7px] md:text-[8px] font-pixel tracking-widest uppercase mb-1 md:mb-2">Where</p>
                        <p className="font-mono font-bold text-xs md:text-base uppercase tracking-wide">Judges Quarters</p>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0"
                >
                    <Button
                        size="lg"
                        className="text-sm md:text-lg px-6 md:px-10 py-5 md:py-7 bg-[#8B0000] hover:bg-[#8B0000]/90 text-white border-2 border-[#1A233A] shadow-[4px_4px_0px_0px_#1A233A] md:shadow-[6px_6px_0px_0px_#1A233A] hover:shadow-[2px_2px_0px_0px_#1A233A] hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 transition-all font-bold tracking-wider w-full sm:w-auto"
                    >
                        SECURE YOUR SPOT
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="text-sm md:text-lg px-6 md:px-10 py-5 md:py-7 bg-[#F4C430] text-[#1A233A] border-2 border-[#1A233A] shadow-[4px_4px_0px_0px_#1A233A] md:shadow-[6px_6px_0px_0px_#1A233A] hover:shadow-[2px_2px_0px_0px_#1A233A] hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 transition-all font-bold tracking-wider w-full sm:w-auto"
                    >
                        CINEMA WARS
                    </Button>
                </motion.div>
            </div>

            {/* Marquee Footer */}
            <div className="relative z-20 w-full border-t-4 border-[#1A233A] bg-[#F4C430] py-2 md:py-3">
                <Marquee className="text-[#1A233A] font-bold text-base md:text-xl uppercase tracking-widest font-mono">
                    <span>LIMITED CAPACITY /// 100 CARS ONLY /// RETRO VIBES /// PRE-ORDER SNACKS /// JAN 10 /// ABUJA /// </span>
                </Marquee>
            </div>
        </section>
    );
}
