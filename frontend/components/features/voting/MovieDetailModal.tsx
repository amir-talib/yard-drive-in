"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Calendar, Star, Film, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface MovieDetails {
    id: string;
    title: string;
    year: number;
    runtime: string;
    genre: string;
    rating: string;
    director: string;
    cast: string[];
    synopsis: string;
    posterUrl: string;
}

interface MovieDetailModalProps {
    movie: MovieDetails | null;
    isOpen: boolean;
    onClose: () => void;
    onVote: () => void;
    hasVoted: boolean;
    userHasVotedForAnother: boolean;
    voteCount: number;
    votePercentage: number;
}

export function MovieDetailModal({
    movie,
    isOpen,
    onClose,
    onVote,
    hasVoted,
    userHasVotedForAnother,
    voteCount,
    votePercentage
}: MovieDetailModalProps) {
    if (!movie) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/85 backdrop-blur-md z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:w-full md:max-w-4xl md:max-h-[90vh] overflow-hidden"
                    >
                        <div className="relative h-full bg-[#F5F0E6] border-4 border-navy shadow-[8px_8px_0px_0px_var(--color-gold)] overflow-hidden flex flex-col">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 bg-navy text-paper p-2 hover:bg-red transition-colors rounded-full shadow-lg"
                            >
                                <X size={20} />
                            </button>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="flex flex-col md:flex-row">
                                    {/* Poster */}
                                    <div className="relative w-full md:w-[40%] aspect-[2/3] md:aspect-auto md:min-h-[500px] flex-shrink-0">
                                        <Image
                                            src={movie.posterUrl}
                                            alt={movie.title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent md:hidden" />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 p-4 md:p-8 space-y-4 md:space-y-6">
                                        {/* Title & Year */}
                                        <div>
                                            <h2 className="font-display text-3xl md:text-5xl text-navy uppercase leading-tight">
                                                {movie.title}
                                            </h2>
                                            <p className="text-muted-foreground font-mono text-sm mt-1">
                                                {movie.year} • {movie.genre}
                                            </p>
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap gap-4">
                                            <div className="flex items-center gap-2 bg-navy/10 px-3 py-2">
                                                <Clock size={16} className="text-gold" />
                                                <span className="text-sm font-mono">{movie.runtime}</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-navy/10 px-3 py-2">
                                                <Star size={16} className="text-gold" />
                                                <span className="text-sm font-mono">{movie.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-navy/10 px-3 py-2">
                                                <Calendar size={16} className="text-gold" />
                                                <span className="text-sm font-mono">{movie.year}</span>
                                            </div>
                                        </div>

                                        {/* Director */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Film size={14} className="text-gold" />
                                                <span className="text-xs font-mono font-bold uppercase tracking-widest text-navy">Director</span>
                                            </div>
                                            <p className="text-sm font-merriweather">{movie.director}</p>
                                        </div>

                                        {/* Cast */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Users size={14} className="text-gold" />
                                                <span className="text-xs font-mono font-bold uppercase tracking-widest text-navy">Cast</span>
                                            </div>
                                            <p className="text-sm font-merriweather">{movie.cast.join(", ")}</p>
                                        </div>

                                        {/* Synopsis */}
                                        <div>
                                            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-navy mb-2">
                                                Synopsis
                                            </h3>
                                            <p className="text-sm md:text-base font-merriweather leading-relaxed text-muted-foreground">
                                                {movie.synopsis}
                                            </p>
                                        </div>

                                        {/* Vote Stats */}
                                        <div className="pt-4 border-t-2 border-navy/10">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-mono font-bold uppercase tracking-widest text-navy">
                                                    Current Votes
                                                </span>
                                                <span className="font-mono font-bold text-gold">
                                                    {voteCount} votes ({votePercentage}%)
                                                </span>
                                            </div>
                                            <div className="h-3 w-full bg-navy/10 border border-navy/20 p-[2px]">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${votePercentage}%` }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    className={`h-full ${hasVoted ? "bg-green-500" : "bg-gold"}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Fixed Bottom Action Bar */}
                            <div className="flex-shrink-0 p-4 md:p-6 bg-navy/5 border-t-2 border-navy/10">
                                <Button
                                    onClick={onVote}
                                    disabled={hasVoted || userHasVotedForAnother}
                                    size="lg"
                                    className="w-full py-6 text-lg font-display uppercase tracking-widest border-2 border-navy shadow-[4px_4px_0px_0px_var(--color-navy)] hover:shadow-[2px_2px_0px_0px_var(--color-navy)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all"
                                    variant={hasVoted ? "secondary" : "default"}
                                >
                                    {hasVoted
                                        ? "✓ YOU VOTED FOR THIS"
                                        : userHasVotedForAnother
                                            ? "YOU'VE ALREADY VOTED"
                                            : "VOTE FOR THIS MOVIE"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
