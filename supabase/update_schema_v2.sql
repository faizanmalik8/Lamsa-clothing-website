-- Run this in your Supabase SQL Editor to add new fields for Settings

ALTER TABLE settings ADD COLUMN IF NOT EXISTS whatsapp_number VARCHAR;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Create settings_images bucket for logo uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('settings_images', 'settings_images', true) ON CONFLICT DO NOTHING;

-- Storage Policies for 'settings_images' bucket
CREATE POLICY "Public Read Access Settings Bucket" 
ON storage.objects FOR SELECT TO PUBLIC 
USING (bucket_id = 'settings_images');

CREATE POLICY "Admin Upload Access Settings Bucket" 
ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'settings_images');

CREATE POLICY "Admin Update Access Settings Bucket" 
ON storage.objects FOR UPDATE TO authenticated 
WITH CHECK (bucket_id = 'settings_images');

CREATE POLICY "Admin Delete Access Settings Bucket" 
ON storage.objects FOR DELETE TO authenticated 
USING (bucket_id = 'settings_images');

NOTIFY pgrst, 'reload schema';
