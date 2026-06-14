-- Drop existing policies just in case they are conflicting
DROP POLICY IF EXISTS "Public Read Access Settings Bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Access Settings Bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Access Settings Bucket" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Access Settings Bucket" ON storage.objects;

-- Re-create the correct policies for the settings_images bucket
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
