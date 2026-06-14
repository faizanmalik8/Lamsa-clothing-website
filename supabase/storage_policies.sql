-- Run this in your Supabase SQL Editor to enable Image Uploads

-- Allow public read access to the products bucket
CREATE POLICY "Public Read Access Products Bucket" 
ON storage.objects FOR SELECT TO PUBLIC 
USING (bucket_id = 'products');

-- Allow authenticated admins to upload images to the products bucket
CREATE POLICY "Admin Upload Access Products Bucket" 
ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'products');

-- Allow public read access to the hero_banners bucket
CREATE POLICY "Public Read Access Banners Bucket" 
ON storage.objects FOR SELECT TO PUBLIC 
USING (bucket_id = 'hero_banners');

-- Allow authenticated admins to upload images to the hero_banners bucket
CREATE POLICY "Admin Upload Access Banners Bucket" 
ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'hero_banners');
