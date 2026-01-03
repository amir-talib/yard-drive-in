-- Update movie vote counts to ~1200 total with Annabelle in the lead
-- Uses realistic, organic-looking numbers
-- Run this in Supabase SQL Editor

UPDATE movies SET votes = 347 WHERE id = 'annabelle';
UPDATE movies SET votes = 189 WHERE id = 'interstellar';
UPDATE movies SET votes = 156 WHERE id = 'godfather';
UPDATE movies SET votes = 142 WHERE id = 'titanic';
UPDATE movies SET votes = 98 WHERE id = 'rush-hour';
UPDATE movies SET votes = 83 WHERE id = 'ride-along';
UPDATE movies SET votes = 71 WHERE id = 'home-alone';
UPDATE movies SET votes = 52 WHERE id = 'osofia-london';
UPDATE movies SET votes = 38 WHERE id = 'james-bond';
UPDATE movies SET votes = 27 WHERE id = 'mask';

-- Verify total: 1203 votes
SELECT SUM(votes) as total_votes FROM movies;
SELECT id, title, votes FROM movies ORDER BY votes DESC;
