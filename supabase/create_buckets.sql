-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('hero_banners', 'hero_banners', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('settings_images', 'settings_images', true) ON CONFLICT DO NOTHING;

-- Note: The RLS policies for these buckets are already defined in your storage_policies.sql
