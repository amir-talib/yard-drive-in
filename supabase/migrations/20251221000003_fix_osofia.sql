-- Fix movie ID: rename sophia-london to osofia-london
-- Run this in Supabase SQL Editor if you already ran the initial migration

-- Delete the old entry if it exists
DELETE FROM movies WHERE id = 'sophia-london';

-- Insert the correct entry
INSERT INTO movies (id, title, votes) VALUES ('osofia-london', 'Osofia in London', 0)
ON CONFLICT (id) DO NOTHING;

-- Verify the movies table
SELECT * FROM movies ORDER BY title;
