"use client";

import { motion } from "framer-motion";

interface TicketCardProps {
    title: string;
    price: string;
    description: string;
    perks: string[];
    note?: string;
    badge?: string;
    featured?: boolean;
}

export function TicketCard({ title, price, description, perks, note, badge, featured }: TicketCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative bg-navy rounded-2xl overflow-hidden border-4 ${featured ? 'border-gold shadow-[0_0_30px_rgba(212,175,55,0.3)]' : 'border-paper/20'
                }`}
        >
            {badge && (
                <div className="absolute top-0 right-0 bg-gold text-navy font-bold px-4 py-1 text-sm rounded-bl-xl">
                    {badge}
                </div>
            )}

            <div className="p-6">
                <h3 className="font-display text-2xl md:text-3xl text-paper uppercase mb-2">
                    {title}
                </h3>
                <div className="font-display text-4xl md:text-5xl text-gold mb-4">
                    {price}
                </div>
                <p className="font-mono text-paper/70 text-sm mb-6">
                    {description}
                </p>

                <div className="space-y-2 mb-6">
                    <p className="font-bold text-gold text-sm uppercase tracking-wider">Perks Included:</p>
                    <ul className="space-y-2">
                        {perks.map((perk, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm font-mono text-paper/90">
                                <span className="text-gold mt-0.5">✓</span>
                                {perk}
                            </li>
                        ))}
                    </ul>
                </div>

                {note && (
                    <p className="font-mono text-xs text-paper bg-gold/20 p-3 rounded-lg italic">
                        💡 {note}
                    </p>
                )}
            </div>
        </motion.div>
    );
}

export const ticketData = [
    {
        title: "General Admission",
        price: "₦15,000",
        description: "Entry for one person to enjoy the Yard Drive-In experience.",
        perks: [
            "Access to the Yard Drive-In experience",
            "Listen through the event speakers",
            "General parking"
        ]
    },
    {
        title: "Couples Ticket",
        price: "₦25,000",
        description: "Bring a friend or partner and enjoy a special discounted rate for two!",
        perks: [
            "Entry for 2 people",
            "Access to event speakers",
            "General parking"
        ],
        note: "Perfect for a date or just bringing a friend along!",
        badge: "Best Value for Two",
        featured: true
    },
    {
        title: "VIP Experience",
        price: "₦50,000",
        description: "Premium experience for those who want exclusive perks and closer access.",
        perks: [
            "Full access to the Yard Drive-In",
            "Priority access to event speakers",
            "VIP parking / closer spots to the screen",
            "Complimentary snacks & drinks",
            "Access to VIP lounge or reserved seating"
        ]
    },
    {
        title: "Car Package",
        price: "₦35,000",
        description: "Perfect for car enthusiasts who want a premium showcase experience.",
        perks: [
            "Everything included in VIP tickets",
            "Reserved car display spot",
            "Featured photography / recognition for your car",
            "Exclusive Matcha Street London merchandise & perks"
        ],
        badge: "Matcha Street London"
    }
];
