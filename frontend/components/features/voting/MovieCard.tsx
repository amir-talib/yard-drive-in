"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Lock, Sparkles, Eye } from "lucide-react";
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
    rank?: number;
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
    className,
    rank
}: MovieCardProps) {
    const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
    const isDisabled = hasVoted || userHasVotedForAnother;
    const isLeading = rank === 1;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: rank ? rank * 0.1 : 0 }}
            whileHover={!isDisabled ? { scale: 1.03, y: -4 } : {}}
            whileTap={!isDisabled ? { scale: 0.98 } : {}}
            className={cn(
                "relative group flex flex-col",
                isLeading && "z-10",
                className
            )}
        >
            {/* Leading Indicator Glow */}
            {isLeading && (
                <div className="absolute -inset-1 bg-gradient-to-r from-gold via-orange to-gold rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
            )}

            {/* Poster Container - Clickable */}
            <div
                onClick={() => onPosterClick(id)}
                className={cn(
                    "relative aspect-[2/3] w-full bg-navy overflow-hidden cursor-pointer transition-all duration-300",
                    "border-3 shadow-[4px_4px_0px_0px_var(--color-navy)] md:shadow-[8px_8px_0px_0px_var(--color-navy)]",
                    "group-hover:shadow-[6px_6px_0px_0px_var(--color-gold)] md:group-hover:shadow-[12px_12px_0px_0px_var(--color-gold)]",
                    isLeading ? "border-gold border-4" : "border-gold border-2",
                    userHasVotedForAnother && !hasVoted && "grayscale"
                )}
            >
                {/* Actual Poster Image */}
                <Image
                    src={posterUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Cinematic Vignette Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

                {/* Rank Badge */}
                {rank && (
                    <div className={cn(
                        "absolute top-2 left-2 z-20 flex items-center justify-center font-display font-bold shadow-[0_4px_8px_rgba(0,0,0,0.5)]",
                        isLeading
                            ? "w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#C09000] text-navy border-2 border-white rotate-[-10deg] rounded-full ring-2 ring-[#C09000]/50"
                            : "w-10 h-10 md:w-12 md:h-12 bg-white text-black border-2 border-gold rotate-[5deg] rounded-lg"
                    )}>
                        {isLeading ? (
                            <div className="flex flex-col items-center justify-center leading-none">
                                <span className="text-xl md:text-2xl drop-shadow-sm">#1</span>
                            </div>
                        ) : (
                            <span className="text-base md:text-xl">#{rank}</span>
                        )}
                    </div>
                )}

                {/* Title Overlay - Enhanced */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 md:p-4 pt-16 md:pt-20">
                    <h3 className="font-display text-sm md:text-xl text-white uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                        {title}
                    </h3>
                    {/* Quick Stats */}
                    <div className="flex items-center gap-2 mt-1 text-[10px] md:text-xs text-white/90 font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        <span className="flex items-center gap-1">
                            <Sparkles size={10} className="text-gold" />
                            {votes} votes
                        </span>
                        <span>•</span>
                        <span>{percentage}%</span>
                    </div>
                </div>

                {/* Tap for Details Hint - Enhanced */}
                <div className="absolute top-2 right-2 bg-navy/95 text-paper px-2 py-1.5 rounded-md flex items-center gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 text-[10px] md:text-xs font-mono border border-gold/30 backdrop-blur-sm">
                    <Eye size={12} className="text-gold" />
                    <span>View Details</span>
                </div>

                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Selected State Overlay - User voted for THIS movie */}
                {hasVoted && (
                    <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center backdrop-blur-[2px]">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-green-500 text-white rounded-full p-2 md:p-3 shadow-lg"
                        >
                            <Check size={24} className="md:w-8 md:h-8" strokeWidth={3} />
                        </motion.div>
                    </div>
                )}

                {/* Locked State Overlay - User voted for ANOTHER movie */}
                {userHasVotedForAnother && !hasVoted && (
                    <div className="absolute inset-0 bg-navy/60 flex items-center justify-center backdrop-blur-[1px]">
                        <div className="bg-navy/90 text-paper/60 rounded-full p-2 md:p-3 shadow-lg border border-paper/20">
                            <Lock size={18} className="md:w-6 md:h-6" strokeWidth={2} />
                        </div>
                    </div>
                )}
            </div>

            {/* Progress Bar - Enhanced */}
            <div className="mt-3 md:mt-4 space-y-1.5 md:space-y-2">
                <div className="flex justify-between text-[10px] md:text-xs font-mono font-bold uppercase tracking-wide text-[#1A233A]">
                    <span className="flex items-center gap-1">
                        {isLeading && <span className="text-gold">👑</span>}
                        {percentage}%
                    </span>
                    <span className="text-[#1A233A]/70">{votes} Votes</span>
                </div>
                <div className="h-3 md:h-4 w-full bg-[#1A233A]/20 border-2 border-[#1A233A]/30 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        className={cn(
                            "h-full relative",
                            hasVoted ? "bg-green-500" : isLeading ? "bg-gradient-to-r from-gold to-orange" : "bg-gold"
                        )}
                    >
                        {/* Shimmer effect on progress */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </motion.div>
                </div>
            </div>

            {/* Vote Button - Enhanced */}
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onVote(id);
                }}
                disabled={isDisabled}
                variant={hasVoted ? "secondary" : userHasVotedForAnother ? "outline" : "default"}
                className={cn(
                    "mt-3 md:mt-4 w-full font-display text-xs md:text-base tracking-wider py-3 md:py-4 transition-all duration-300",
                    !isDisabled && "hover:shadow-[4px_4px_0px_0px_var(--color-gold)] hover:-translate-y-0.5",
                    hasVoted && "!bg-green-600 border-2 border-green-700 text-white hover:!bg-green-700",
                    userHasVotedForAnother && !hasVoted && "!bg-navy/80 border-2 border-navy text-paper/70 cursor-not-allowed"
                )}
            >
                {hasVoted ? (
                    <span className="flex items-center justify-center gap-2">
                        <Check size={16} /> YOUR VOTE
                    </span>
                ) : userHasVotedForAnother ? (
                    <span className="flex items-center justify-center gap-2 opacity-70">
                        <Lock size={14} /> LOCKED
                    </span>
                ) : (
                    "VOTE NOW"
                )}
            </Button>
        </motion.div>
    );
}
