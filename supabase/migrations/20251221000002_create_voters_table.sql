-- Create voters table to track who has voted
CREATE TABLE IF NOT EXISTS voters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  movie_id TEXT NOT NULL REFERENCES movies(id),
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE voters ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (vote)
CREATE POLICY "Anyone can vote" ON voters
  FOR INSERT WITH CHECK (true);

-- Allow checking if email exists (for duplicate prevention)
CREATE POLICY "Anyone can check email" ON voters
  FOR SELECT USING (true);

-- Create index on email for fast lookups
CREATE INDEX IF NOT EXISTS idx_voters_email ON voters(email);

-- Create index on movie_id for vote counting
CREATE INDEX IF NOT EXISTS idx_voters_movie_id ON voters(movie_id);

-- Update increment_vote to also record the voter
CREATE OR REPLACE FUNCTION vote_for_movie(
  voter_email TEXT,
  voter_name TEXT,
  movie TEXT
)
RETURNS TABLE(success BOOLEAN, message TEXT, voted_movie TEXT) AS $$
DECLARE
  existing_vote TEXT;
BEGIN
  -- Check if email already voted
  SELECT movie_id INTO existing_vote FROM voters WHERE email = voter_email;
  
  IF existing_vote IS NOT NULL THEN
    RETURN QUERY SELECT false, 'Email has already voted', existing_vote;
    RETURN;
  END IF;
  
  -- Insert voter record
  INSERT INTO voters (email, name, movie_id) VALUES (voter_email, voter_name, movie);
  
  -- Increment vote count
  UPDATE movies SET votes = votes + 1 WHERE id = movie;
  
  RETURN QUERY SELECT true, 'Vote recorded successfully', movie;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if email has voted
CREATE OR REPLACE FUNCTION check_voter(voter_email TEXT)
RETURNS TABLE(has_voted BOOLEAN, movie_id TEXT, voter_name TEXT) AS $$
BEGIN
  RETURN QUERY 
  SELECT 
    true as has_voted,
    v.movie_id,
    v.name as voter_name
  FROM voters v 
  WHERE v.email = voter_email
  LIMIT 1;
  
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::TEXT, NULL::TEXT;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create storage bucket for movie posters
INSERT INTO storage.buckets (id, name, public)
VALUES ('movie-posters', 'movie-posters', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to movie posters
CREATE POLICY "Public read access for movie posters"
ON storage.objects FOR SELECT
USING (bucket_id = 'movie-posters');

-- Allow authenticated uploads (for admin)
CREATE POLICY "Admin upload access for movie posters"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'movie-posters');

-- Add poster_url column to movies table
ALTER TABLE movies ADD COLUMN IF NOT EXISTS poster_url TEXT;

-- Enable realtime for voters table too
ALTER PUBLICATION supabase_realtime ADD TABLE voters;
