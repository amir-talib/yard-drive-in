import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Voting will use local state only.');
}

export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Type definitions for our database
export interface Movie {
    id: string;
    title: string;
    votes: number;
    poster_url: string | null;
    created_at: string;
}

export interface Voter {
    id: string;
    email: string;
    name: string;
    movie_id: string;
    voted_at: string;
}

export interface VoteResult {
    success: boolean;
    message: string;
    voted_movie: string | null;
}

export interface CheckVoterResult {
    has_voted: boolean;
    movie_id: string | null;
    voter_name: string | null;
}

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => !!supabase;

// Check if an email has already voted
export async function checkVoter(email: string): Promise<CheckVoterResult | null> {
    if (!supabase) return null;

    const { data, error } = await supabase
        .rpc('check_voter', { voter_email: email })
        .single();

    if (error) {
        console.error('Error checking voter:', error);
        return null;
    }

    return data as CheckVoterResult;
}

// Submit a vote
export async function submitVote(email: string, name: string, movieId: string): Promise<VoteResult> {
    if (!supabase) {
        return { success: false, message: 'Supabase not configured', voted_movie: null };
    }

    const { data, error } = await supabase
        .rpc('vote_for_movie', {
            voter_email: email,
            voter_name: name,
            movie: movieId
        })
        .single();

    if (error) {
        console.error('Error submitting vote:', error);
        return { success: false, message: error.message, voted_movie: null };
    }

    return data as VoteResult;
}

// Get poster URL from storage
export function getPosterUrl(movieId: string): string | null {
    if (!supabase) return null;

    const { data } = supabase.storage
        .from('movie-posters')
        .getPublicUrl(`${movieId}.jpg`);

    return data.publicUrl;
}
