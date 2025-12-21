"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Lock, Info } from "lucide-react";
import Image from "next/image";

interface MovieCardProps {
    id: string;
    title: string;
    posterUrl: string;
    votes: number;
    totalVotes: number;
    hasVoted: boolean;
    userHasVotedForAnother?: boolean;
    onVote: (id: string) => void;
    onPosterClick: (id: string) => void;
    className?: string;
}

export function MovieCard({
    id,
    title,
    posterUrl,
    votes,
    totalVotes,
    hasVoted,
    userHasVotedForAnother = false,
    onVote,
    onPosterClick,
    className
}: MovieCardProps) {
    const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
    const isDisabled = hasVoted || userHasVotedForAnother;

    return (
        <motion.div
            whileHover={!isDisabled ? { scale: 1.02 } : {}}
            whileTap={!isDisabled ? { scale: 0.98 } : {}}
            className={cn(
                "relative group flex flex-col",
                userHasVotedForAnother && !hasVoted && "opacity-60",
                className
            )}
        >
            {/* Poster Container - Clickable */}
            <div
                onClick={() => onPosterClick(id)}
                className={cn(
                    "relative aspect-[2/3] w-full bg-navy border-2 border-gold shadow-[4px_4px_0px_0px_var(--color-navy)] md:shadow-[8px_8px_0px_0px_var(--color-navy)] overflow-hidden cursor-pointer",
                    userHasVotedForAnother && !hasVoted && "grayscale"
                )}
            >
                {/* Actual Poster Image */}
                <Image
                    src={posterUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy via-navy/80 to-transparent p-2 md:p-4 pt-8 md:pt-12">
                    <h3 className="font-display text-sm md:text-xl text-paper uppercase leading-tight drop-shadow-md">
                        {title}
                    </h3>
                </div>

                {/* Info Hint on Hover */}
                <div className="absolute top-2 right-2 bg-navy/80 text-paper p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Info size={14} />
                </div>

                {/* Selected State Overlay - User voted for THIS movie */}
                {hasVoted && (
                    <div className="absolute inset-0 bg-gold/30 flex items-center justify-center backdrop-blur-[1px]">
                        <div className="bg-gold text-navy rounded-full p-1.5 md:p-2 shadow-lg animate-in zoom-in">
                            <Check size={20} className="md:w-8 md:h-8" strokeWidth={3} />
                        </div>
                    </div>
                )}

                {/* Locked State Overlay - User voted for ANOTHER movie */}
                {userHasVotedForAnother && !hasVoted && (
                    <div className="absolute inset-0 bg-navy/50 flex items-center justify-center">
                        <div className="bg-navy/80 text-paper rounded-full p-1.5 md:p-2 shadow-lg">
                            <Lock size={16} className="md:w-6 md:h-6" strokeWidth={2} />
                        </div>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="mt-2 md:mt-4 space-y-1 md:space-y-2">
                <div className="flex justify-between text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider md:tracking-widest text-navy">
                    <span>{percentage}%</span>
                    <span>{votes} Votes</span>
                </div>
                <div className="h-3 md:h-4 w-full bg-navy/10 border border-navy/20 p-[2px]">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn("h-full bg-gold", hasVoted && "bg-green-500")}
                    />
                </div>
            </div>

            {/* Vote Button */}
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onVote(id);
                }}
                disabled={isDisabled}
                variant={hasVoted ? "secondary" : "default"}
                className={cn(
                    "mt-2 md:mt-4 w-full border-2 border-navy font-display text-xs md:text-lg tracking-wider md:tracking-widest py-3 md:py-4 active:scale-95 transition-transform",
                    userHasVotedForAnother && !hasVoted && "opacity-50 cursor-not-allowed"
                )}
            >
                {hasVoted ? "YOUR VOTE ✓" : userHasVotedForAnother ? "LOCKED" : "VOTE"}
            </Button>
        </motion.div>
    );
}
