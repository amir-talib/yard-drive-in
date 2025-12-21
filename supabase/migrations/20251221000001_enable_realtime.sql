-- Enable Realtime for movies table
-- Run this in Supabase SQL Editor

-- First, check if realtime publication exists
DO $$
BEGIN
  -- Add movies table to realtime publication
  ALTER PUBLICATION supabase_realtime ADD TABLE movies;
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE 'Table already added to realtime';
END $$;

-- Verify realtime is enabled
SELECT * FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
