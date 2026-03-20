# Supabase & Application Setup Guide

This guide covers everything required to set up Supabase and the application environment to run this project smoothly.

## 1. Prerequisites
- A [Supabase](https://supabase.com/) account.
- Node.js (v18 or higher) and `npm` installed.

## 2. Supabase Project Setup
1. Log in to your Supabase account and create a new project.
2. Go to **Project Settings -> API** to retrieve your project keys:
   - `Project URL`
   - `anon public` key
   - `service_role` secret

## 3. Environment Variables
Create a `.env.local` file in the root of your project (`d:\legalcell\oppam\.env.local`) and add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret
ENCRYPTION_KEY=your_32_byte_secret_hex_string

# Add any other required environment variables across the app here
```

> **Note**: `SUPABASE_SERVICE_ROLE_KEY` and `ENCRYPTION_KEY` are highly sensitive keys. Never expose them to the client side. `ENCRYPTION_KEY` secures PII at rest and MUST be exactly the same always to decrypt old records.

## 4. Database Setup (SQL Query)

You will need to run the following SQL query in your Supabase SQL Editor. This sets up the necessary extensions, ENUM types, tables, and Row-Level Security (RLS) policies.

Copy the following SQL and execute it manually in the **SQL Editor** of your Supabase dashboard:

```sql
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

-- Enable Row Level Security
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
```

## 5. Storage (Buckets) Setup

This project relies on a storage bucket named `evidence` for storing uploaded files related to complaints. Follow these steps to set it up:

1. In the Supabase Dashboard, navigate to **Storage**.
2. Click **New bucket**.
3. Name it exactly: `evidence`.
4. Leave it as **Private** (do not check the "Public" toggle).
5. Add restriction configurations (optional but highly recommended):
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `application/pdf`, `video/mp4`, `video/webm`, `video/quicktime`
   - **Maximum file size**: `52428800 bytes` (50MB)

### Storage Policies
To allow necessary bucket access, create Storage policies in your Supabase Storage settings:
- **SELECT**: Ensure the `evidence` bucket policy allows **Authenticated users** to `SELECT` (read) files. This permits the admin interface to view evidence files.
- (Note: The API route handling uploads currently uses the server-side logic in the standard flow, bypassing the stricter client restrictions if using `service_role`, or handling uploads via anon if the relevant RLS policy is present.)

## 6. Authentication Setup (for Admin Panel)
Since this app relies on user authentication for the admin panel, ensure that:
1. In the Supabase Dashboard, go to **Authentication -> Providers**.
2. **Email / Password** provider is enabled.
3. If you want to log in as an admin immediately, go to **Authentication -> Users** and click **Add User** to manually invite/create an admin user.
4. Use this internal user account to log in and review incoming complaints securely.

## 7. Run the Application
Once the database, bucket, and `.env.local` files are properly set up, you can start the application locally:

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000` to interact with the application. To test the admin panel side, head over to `/admin`.
