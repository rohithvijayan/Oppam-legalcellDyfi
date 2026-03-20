-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Complaint status enum
CREATE TYPE complaint_status AS ENUM ('PENDING', 'REVIEWED', 'ACTION_TAKEN');

-- Complaints table
CREATE TABLE IF NOT EXISTS complaints (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  victim_name         TEXT NOT NULL,
  victim_age          INTEGER NOT NULL,
  address             TEXT NOT NULL,
  contact_phone       TEXT NOT NULL,
  contact_email       TEXT NOT NULL,
  location_district   TEXT NOT NULL,
  location_local_body TEXT NOT NULL,
  police_station      TEXT NOT NULL,
  victim_social_link  TEXT NOT NULL,
  accused_social_link TEXT NOT NULL,
  evidence_urls       TEXT[] NOT NULL DEFAULT '{}',
  description         TEXT,
  status              complaint_status NOT NULL DEFAULT 'PENDING',
  admin_notes         TEXT
);

-- Row Level Security
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone (anon) can INSERT a complaint
CREATE POLICY "Allow anonymous complaint submission"
  ON complaints FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can read complaints
CREATE POLICY "Allow admin to read complaints"
  ON complaints FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users (admins) can update complaints
CREATE POLICY "Allow admin to update complaints"
  ON complaints FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Evidence Storage Bucket (run in Supabase dashboard under Storage)
-- 1. Create a bucket named: evidence
-- 2. Set to PRIVATE (not public)
-- 3. Allowed MIME types: image/jpeg, image/png, application/pdf, video/mp4, video/webm, video/quicktime
-- 4. Max file size: 52428800 bytes (50MB)

-- Storage RLS: Only admins can read signed URLs
-- The API route handles uploads using the anon key, which bypasses bucket policies.
-- Set the bucket policy in Supabase dashboard to: Authenticated users can SELECT.
