"use client";

import { TicketCard } from "@/components/shared/TicketCard";
import { Marquee } from "@/components/shared/Marquee";

export function TicketSection() {
    return (
        <section className="py-12 md:py-24 bg-navy relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

            <div className="container mx-auto px-3 md:px-4 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-paper mb-3 md:mb-4 uppercase drop-shadow-[4px_4px_0px_#000]">
                        Admit One
                    </h2>
                    <div className="w-16 md:w-24 h-1.5 md:h-2 bg-red mx-auto mb-4 md:mb-6" />
                    <p className="font-mono text-base md:text-xl text-gold max-w-xl mx-auto px-2">
                        Secure your spot. Capacity is strictly limited to 100 cars.
                        Don't be the one watching from Instagram stories.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto items-center">
                    {/* Standard Ticket */}
                    <TicketCard
                        type="NORMAL"
                        price="₦12,000"
                        includes={[
                            "Admit One Car (Max 4 Ppl)",
                            "General Parking Spot",
                            "Access to all on-site vendors",
                            "Event Access"
                        ]}
                    />

                    {/* VIP Ticket */}
                    <TicketCard
                        type="VIP"
                        price="₦35,000"
                        includes={[
                            "Admit One Car (Max 4 Ppl)",
                            "Prime Center View Parking",
                            "Snack Box (2x Popcorn/Drinks)",
                            "Priority Lane Access (Skip Line)",
                            "Cozy Blankets provided"
                        ]}
                        className="md:-rotate-1 md:scale-105 z-10"
                    />
                </div>
            </div>

            {/* Bottom Marquee */}
            <div className="mt-16 md:mt-24 border-y-4 border-gold bg-red py-2 md:py-3">
                <Marquee direction="right" className="text-paper font-display text-lg md:text-2xl uppercase tracking-widest">
                    <span> /// DEC 28 /// GATES OPEN 5PM /// FOOD VENDORS ON SITE /// DEC 28 /// GATES OPEN 5PM /// </span>
                </Marquee>
            </div>
        </section>
    );
}
