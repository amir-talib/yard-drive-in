"use client";

import { Marquee } from "@/components/shared/Marquee";
import { TicketCard, ticketData } from "./TicketCard";
import Script from "next/script";
import { motion } from "framer-motion";

export function TicketSection() {
    return (
        <section className="py-12 md:py-24 bg-navy relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

            <div className="container mx-auto px-3 md:px-4 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-paper mb-3 md:mb-4 uppercase drop-shadow-[4px_4px_0px_#000]">
                        Get Your Tickets Now
                    </h2>
                    <div className="w-16 md:w-24 h-1.5 md:h-2 bg-red mx-auto mb-4 md:mb-6" />
                    <p className="font-mono text-base md:text-xl text-gold max-w-xl mx-auto px-2">
                        Tickets are selling fast! Don't be the one watching from Instagram stories.
                    </p>
                </div>

                {/* Event Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-12 md:mb-16"
                >
                    <div className="bg-paper/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-gold/30 text-center">
                        <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 md:gap-8">
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl">📅</span>
                                <span className="font-display text-xl md:text-2xl text-paper">10th January 2026</span>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gold/30" />
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl">📍</span>
                                <span className="font-mono text-sm md:text-base text-paper/90">
                                    Opposite Federal Ministry of Justice (Judges Quarters), Abuja
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Ticket Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12 md:mb-16">
                    {ticketData.map((ticket, index) => (
                        <TicketCard
                            key={index}
                            title={ticket.title}
                            price={ticket.price}
                            description={ticket.description}
                            perks={ticket.perks}
                            note={ticket.note}
                            badge={ticket.badge}
                            featured={ticket.featured}
                        />
                    ))}
                </div>

                {/* Event Notes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <div className="bg-red/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-red/30">
                        <h3 className="font-display text-xl text-paper mb-4 uppercase">📝 Event Notes & Tips</h3>
                        <ul className="space-y-2 font-mono text-sm text-paper/80">
                            <li className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                Arrive early to secure the best parking spot.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                Audio is via speakers – no FM transmission this year.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                Outside food & drinks are not allowed (unless specified).
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                Car Package attendees will be featured on the event page and recognized during the event.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                Couples Ticket is valid only for 2 people; no additional add-ons.
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <div className="text-center mb-8">
                    <a
                        href="#tix-widget"
                        className="inline-block bg-gold text-navy font-display text-xl md:text-2xl px-8 py-4 rounded-xl uppercase tracking-wider hover:bg-gold/90 transition-all hover:scale-105 shadow-lg"
                    >
                        🎟️ Book Now
                    </a>
                </div>

                {/* How to Get Tickets - Instructions */}
                <div className="max-w-2xl mx-auto mb-8 bg-navy/80 rounded-xl p-5 md:p-6 border border-gold/30">
                    <h4 className="font-display text-gold text-base md:text-lg uppercase mb-3 text-center">
                        How to Get Your Tickets
                    </h4>
                    <ol className="space-y-2 font-mono text-paper/90 text-xs md:text-sm">
                        <li className="flex gap-2 items-start">
                            <span className="bg-gold text-navy font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs">1</span>
                            <span>Select your ticket type and quantity below</span>
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="bg-gold text-navy font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs">2</span>
                            <span>Click <strong className="text-gold">"Proceed"</strong> to continue</span>
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="bg-gold text-navy font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs">3</span>
                            <span>Enter your details and complete payment</span>
                        </li>
                        <li className="flex gap-2 items-start">
                            <span className="bg-gold text-navy font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs">4</span>
                            <span>Receive your e-ticket via email — show it at the gate!</span>
                        </li>
                    </ol>
                </div>

                <div id="tix-widget" className="max-w-5xl mx-auto relative">
                    {/* Selling Fast Badge - Corner */}
                    <span className="absolute -top-2 -right-2 z-10 bg-[#8B0000] text-white font-mono text-[10px] md:text-xs px-3 py-1.5 rounded-bl-lg rounded-tr-lg uppercase tracking-wide border-2 border-white shadow-lg animate-[wiggle_1s_ease-in-out_infinite]">
                        🔥 Selling Fast!
                    </span>
                    {/* Tix.africa Widget - Scrollable Container */}
                    <div className="tt-widget w-full h-[80vh] md:h-[85vh] bg-paper rounded-2xl border-2 border-gold/20 shadow-2xl overflow-y-auto overflow-x-hidden [-webkit-overflow-scrolling:touch]">
                        <div className="tt-widget-fallback w-full">
                            <iframe
                                src="https://widget.tix.africa/yard-drive-in/VXNlci1jMDAwY2Y3NC02MGMzLTRlNTgtODJhZi05ZWUyMDhkZTVmMTM="
                                className="w-full border-none min-h-[2000px]"
                                title="Ticket Widget"
                                scrolling="yes"
                            />
                        </div>

                        <Script
                            src="https://widget.tix.africa/widget.js"
                            strategy="lazyOnload"
                            data-url="https://widget.tix.africa/yard-drive-in/VXNlci1jMDAwY2Y3NC02MGMzLTRlNTgtODJhZi05ZWUyMDhkZTVmMTM="
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Marquee */}
            <div className="mt-16 md:mt-24 border-y-4 border-gold bg-red py-2 md:py-3">
                <Marquee direction="right" className="text-paper font-display text-lg md:text-2xl uppercase tracking-widest">
                    <span> /// JAN 10 /// GATES OPEN 5PM /// FOOD VENDORS ON SITE /// JAN 10 /// GATES OPEN 5PM /// </span>
                </Marquee>
            </div>
        </section>
    );
}
