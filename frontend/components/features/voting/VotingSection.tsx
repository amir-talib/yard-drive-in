"use client";

import { useState, useEffect, useCallback } from "react";
import { MovieCard } from "./MovieCard";
import { VoteModal } from "./VoteModal";
import { MovieDetailModal } from "./MovieDetailModal";
import { Marquee } from "@/components/shared/Marquee";
import { supabase, isSupabaseConfigured, submitVote, checkVoter, type Movie } from "@/lib/supabase";
import { MOVIES_DATA, getMovieById } from "@/lib/movies";

// Generate initial votes (zeros for SSR consistency)
const generateInitialVotes = () => {
    const initial: Record<string, number> = {};
    MOVIES_DATA.forEach(m => initial[m.id] = 0);
    return initial;
};

export function VotingSection() {
    const [votes, setVotes] = useState<Record<string, number>>(generateInitialVotes);
    const [userVote, setUserVote] = useState<string | null>(null);
    const [voterName, setVoterName] = useState<string | null>(null);
    const [voterEmail, setVoterEmail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSupabaseActive, setIsSupabaseActive] = useState(false);

    // Vote Modal state
    const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
    const [selectedMovieForVote, setSelectedMovieForVote] = useState<{ id: string; title: string } | null>(null);

    // Detail Modal state
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedMovieForDetail, setSelectedMovieForDetail] = useState<string | null>(null);

    // Fetch initial votes from Supabase
    const fetchVotes = useCallback(async () => {
        if (!isSupabaseConfigured() || !supabase) {
            setIsLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('movies')
                .select('id, votes');

            if (error) throw error;

            if (data && data.length > 0) {
                const voteMap: Record<string, number> = {};
                data.forEach((movie: { id: string; votes: number }) => {
                    voteMap[movie.id] = movie.votes;
                });
                setVotes(prev => ({ ...prev, ...voteMap }));
                setIsSupabaseActive(true);
            }
        } catch (error) {
            console.warn('Supabase fetch failed, using local state:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Subscribe to real-time updates
    useEffect(() => {
        fetchVotes();

        if (!isSupabaseConfigured() || !supabase) return;

        const channel = supabase
            .channel('movies-votes')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'movies' },
                (payload) => {
                    const { id, votes: newVotes } = payload.new as Movie;
                    setVotes(prev => ({ ...prev, [id]: newVotes }));
                }
            )
            .subscribe();

        return () => {
            if (supabase) supabase.removeChannel(channel);
        };
    }, [fetchVotes]);

    // Check localStorage for previous voter info and verify with Supabase
    useEffect(() => {
        const checkExistingVoter = async () => {
            const savedEmail = localStorage.getItem('yard-drive-in-email');
            const savedVote = localStorage.getItem('yard-drive-in-vote');
            const savedName = localStorage.getItem('yard-drive-in-name');

            if (savedEmail && isSupabaseActive) {
                // Verify with Supabase that this email actually voted
                const result = await checkVoter(savedEmail);
                if (result?.has_voted && result.movie_id) {
                    setUserVote(result.movie_id);
                    setVoterEmail(savedEmail);
                    setVoterName(result.voter_name || savedName);
                } else if (savedVote) {
                    // Fallback to localStorage
                    setUserVote(savedVote);
                    setVoterEmail(savedEmail);
                    setVoterName(savedName);
                }
            } else if (savedVote) {
                // Demo mode fallback
                setUserVote(savedVote);
                setVoterEmail(savedEmail);
                setVoterName(savedName);
            }
        };

        if (!isLoading) {
            checkExistingVoter();
        }
    }, [isLoading, isSupabaseActive]);

    const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

    // Open vote modal when user wants to vote
    const handleVoteClick = (id: string) => {
        if (userVote) return; // Already voted

        const movie = MOVIES_DATA.find(m => m.id === id);
        if (movie) {
            setSelectedMovieForVote({ id: movie.id, title: movie.title });
            setIsVoteModalOpen(true);
        }
    };

    // Open detail modal when user clicks poster
    const handlePosterClick = (id: string) => {
        setSelectedMovieForDetail(id);
        setIsDetailModalOpen(true);
    };

    // Handle vote from detail modal
    const handleVoteFromDetailModal = () => {
        if (!selectedMovieForDetail || userVote) return;

        setIsDetailModalOpen(false);
        const movie = MOVIES_DATA.find(m => m.id === selectedMovieForDetail);
        if (movie) {
            setSelectedMovieForVote({ id: movie.id, title: movie.title });
            setIsVoteModalOpen(true);
        }
    };

    // Handle vote submission from modal
    const handleVoteSubmit = async (name: string, email: string): Promise<{ success: boolean; message: string }> => {
        if (!selectedMovieForVote) {
            return { success: false, message: "No movie selected" };
        }

        // Submit to Supabase
        if (isSupabaseActive) {
            const result = await submitVote(email, name, selectedMovieForVote.id);

            if (result.success) {
                // Update local state
                setVotes(prev => ({ ...prev, [selectedMovieForVote.id]: prev[selectedMovieForVote.id] + 1 }));
                setUserVote(selectedMovieForVote.id);
                setVoterEmail(email);
                setVoterName(name);

                // Save to localStorage
                localStorage.setItem('yard-drive-in-vote', selectedMovieForVote.id);
                localStorage.setItem('yard-drive-in-email', email);
                localStorage.setItem('yard-drive-in-name', name);

                return { success: true, message: "Vote recorded!" };
            } else {
                // Check if it's a duplicate vote error
                if (result.message.includes('already voted') || result.voted_movie) {
                    return {
                        success: false,
                        message: `This email has already voted for ${MOVIES_DATA.find(m => m.id === result.voted_movie)?.title || 'a movie'}`
                    };
                }
                return { success: false, message: result.message };
            }
        } else {
            // Demo mode - just update local state
            setVotes(prev => ({ ...prev, [selectedMovieForVote.id]: prev[selectedMovieForVote.id] + 1 }));
            setUserVote(selectedMovieForVote.id);
            setVoterEmail(email);
            setVoterName(name);

            localStorage.setItem('yard-drive-in-vote', selectedMovieForVote.id);
            localStorage.setItem('yard-drive-in-email', email);
            localStorage.setItem('yard-drive-in-name', name);

            return { success: true, message: "Vote recorded!" };
        }
    };

    const votedMovieTitle = userVote ? MOVIES_DATA.find(m => m.id === userVote)?.title : null;
    const selectedMovieDetails = selectedMovieForDetail ? getMovieById(selectedMovieForDetail) : null;
    const selectedMovieVotes = selectedMovieForDetail ? votes[selectedMovieForDetail] || 0 : 0;
    const selectedMoviePercentage = totalVotes > 0 && selectedMovieForDetail
        ? Math.round((selectedMovieVotes / totalVotes) * 100)
        : 0;

    return (
        <section id="movie-wars" className="py-12 md:py-20 bg-paper border-b-4 border-navy overflow-hidden">
            {/* Section Header */}
            <div className="container mx-auto px-4 mb-10 md:mb-16 text-center">
                <div className="inline-block bg-red text-paper px-4 py-1 mb-4 font-mono text-xs md:text-sm uppercase tracking-widest animate-pulse">
                    🏆 Semi-Finals • Top {MOVIES_DATA.length} Contenders
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-navy mb-3 md:mb-4 uppercase drop-shadow-[4px_4px_0px_rgba(244,196,48,1)]">
                    Movie Wars
                </h2>
                <p className="font-mono text-lg md:text-xl lg:text-2xl text-navy font-bold mb-2">
                    Vote Your Favourite Movies
                </p>
                <p className="font-mono text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2 mb-3">
                    These films fought their way to the top. Now only <strong>ONE</strong> will claim the big screen.
                    Your vote decides the champion.
                </p>
                <p className="font-mono text-xs md:text-sm text-gold bg-navy/10 inline-block px-3 py-1.5 rounded-full">
                    👆 Tap any poster to see movie details
                </p>
                {userVote && voterName && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-gold/20 border-2 border-gold px-4 py-2">
                        <span className="text-sm font-mono text-navy">
                            👋 Hey <strong>{voterName}</strong>! You voted for <strong>{votedMovieTitle}</strong>
                        </span>
                    </div>
                )}
            </div>

            {/* Marquee Divider */}
            <div className="mb-10 md:mb-16 -rotate-1 bg-navy py-2 border-y-2 border-gold">
                <Marquee className="text-paper font-mono text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em]">
                    <span> /// SEMI-FINALS /// VOTE NOW /// TOP CONTENDERS /// LIVE RESULTS /// YOUR VOTE DECIDES /// </span>
                </Marquee>
            </div>

            {/* Movie Grid */}
            <div className="container mx-auto px-3 md:px-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-6 lg:gap-8">
                    {[...MOVIES_DATA]
                        .map(movie => ({ ...movie, voteCount: votes[movie.id] || 0 }))
                        .sort((a, b) => b.voteCount - a.voteCount)
                        .map((movie, index) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                posterUrl={movie.posterUrl}
                                votes={votes[movie.id] || 0}
                                totalVotes={totalVotes}
                                hasVoted={userVote === movie.id}
                                userHasVotedForAnother={userVote !== null && userVote !== movie.id}
                                onVote={handleVoteClick}
                                onPosterClick={handlePosterClick}
                                rank={index + 1}
                            />
                        ))}
                </div>
            </div>

            {/* Vote Modal */}
            <VoteModal
                isOpen={isVoteModalOpen}
                onClose={() => {
                    setIsVoteModalOpen(false);
                    setSelectedMovieForVote(null);
                }}
                onSubmit={handleVoteSubmit}
                movieTitle={selectedMovieForVote?.title || ""}
            />

            {/* Movie Detail Modal */}
            <MovieDetailModal
                movie={selectedMovieDetails || null}
                isOpen={isDetailModalOpen}
                onClose={() => {
                    setIsDetailModalOpen(false);
                    setSelectedMovieForDetail(null);
                }}
                onVote={handleVoteFromDetailModal}
                hasVoted={userVote === selectedMovieForDetail}
                userHasVotedForAnother={userVote !== null && userVote !== selectedMovieForDetail}
                voteCount={selectedMovieVotes}
                votePercentage={selectedMoviePercentage}
            />
        </section>
    );
}
