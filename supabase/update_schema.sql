-- Run this in your Supabase SQL Editor to sync the database with the frontend application

-- 0. Drop dependencies FIRST so we can alter the tables
DROP POLICY IF EXISTS "Public can read active products" ON products;

-- 1. Update Products Table
ALTER TABLE products DROP COLUMN IF EXISTS sale_price;
ALTER TABLE products ADD COLUMN IF NOT EXISTS compare_at_price DECIMAL(10, 2);

ALTER TABLE products DROP COLUMN IF EXISTS status CASCADE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

ALTER TABLE products DROP CONSTRAINT IF EXISTS products_product_id_key;
ALTER TABLE products DROP COLUMN IF EXISTS product_id;

-- Add the missing slug column
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug VARCHAR UNIQUE;

-- 2. Rename Images Table
-- Ignore if already renamed
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'product_images') THEN
    ALTER TABLE product_images RENAME TO images;
  END IF;
END $$;

-- 3. Recreate RLS Policies
CREATE POLICY "Public can read active products" ON products FOR SELECT TO PUBLIC USING (is_active = true);

DROP POLICY IF EXISTS "Public can read product images" ON images;
CREATE POLICY "Public can read product images" ON images FOR SELECT TO PUBLIC USING (true);

DROP POLICY IF EXISTS "Admin full access product images" ON images;
CREATE POLICY "Admin full access product images" ON images TO authenticated USING (true) WITH CHECK (true);

-- 4. Reload the schema cache
NOTIFY pgrst, 'reload schema';
