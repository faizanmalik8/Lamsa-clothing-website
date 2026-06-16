-- Run this in your Supabase SQL Editor to fix the schema cache error
-- This ensures the column exists and forces Supabase to refresh its API schema

ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_address TEXT NOT NULL DEFAULT 'Not provided';

-- Reload the schema cache
NOTIFY pgrst, 'reload schema';
