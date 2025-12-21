# Supabase Setup Guide

This guide walks you through setting up Supabase for the Yard Drive-In voting system.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in.
2. Click **New Project**.
3. Fill in:
   - **Name**: `yard-drive-in`
   - **Database Password**: (save this somewhere safe)
   - **Region**: Choose closest to Abuja (e.g., Frankfurt or London)
4. Wait for the project to be created (~2 minutes).

## 2. Get Your API Keys

1. In your project dashboard, go to **Settings** → **API**.
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. Create Environment File

Create a file called `.env.local` in the `frontend` folder:

```bash
# /frontend/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Create Database Tables

Go to **SQL Editor** in your Supabase dashboard and run:

```sql
-- Create movies table
CREATE TABLE movies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read
CREATE POLICY "Anyone can read movies" ON movies
  FOR SELECT USING (true);

-- Allow anyone to update (for voting)
CREATE POLICY "Anyone can vote" ON movies
  FOR UPDATE USING (true);

-- Insert initial movies
INSERT INTO movies (id, title, votes) VALUES
  ('rush-hour', 'Rush Hour', 0),
  ('ride-along', 'Ride Along', 0),
  ('godfather', 'Godfather', 0),
  ('annabelle', 'Annabelle', 0),
  ('interstellar', 'Interstellar', 0),
  ('sophia-london', 'Sophia in London', 0),
  ('home-alone', 'Home Alone', 0),
  ('james-bond', 'James Bond', 0),
  ('titanic', 'Titanic', 0),
  ('mask', 'The Mask', 0);

-- Create atomic vote increment function
CREATE OR REPLACE FUNCTION increment_vote(movie_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE movies SET votes = votes + 1 WHERE id = movie_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 5. Enable Realtime

1. Go to **Database** → **Replication** in Supabase dashboard.
2. Find the `movies` table.
3. Toggle **ON** for Realtime updates.

## 6. Restart Dev Server

After creating `.env.local`, restart your dev server:

```bash
npm run dev
```

## 7. Test It!

1. Open `localhost:3000` in two browser tabs.
2. Vote for a movie in one tab.
3. Watch the vote update in real-time in both tabs!

---

## Troubleshooting

### "Demo mode" message showing?
- Check that your `.env.local` file exists and has the correct values.
- Restart the dev server after adding environment variables.

### Votes not persisting?
- Check Supabase dashboard → **Table Editor** → `movies` table.
- Ensure the `increment_vote` function exists in **Database** → **Functions**.

### Real-time not working?
- Enable Realtime for the `movies` table in **Database** → **Replication**.
