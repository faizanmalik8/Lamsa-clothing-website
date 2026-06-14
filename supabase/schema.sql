-- 1. Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR UNIQUE NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  stock_quantity INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Product Images Table
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR NOT NULL,
  customer_email VARCHAR,
  customer_phone VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  shipping_address TEXT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INT NOT NULL,
  price_at_time DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Settings Table (Single row)
CREATE TABLE settings (
  id INT PRIMARY KEY DEFAULT 1,
  contact_email VARCHAR,
  phone_number VARCHAR,
  instagram_url TEXT,
  facebook_url TEXT,
  announcement_text TEXT,
  is_announcement_active BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial settings row
INSERT INTO settings (id, is_announcement_active, announcement_text) 
VALUES (1, true, 'Welcome to Lamsa! Premium Unstitched Clothing.')
ON CONFLICT (id) DO NOTHING;

-- 7. Hero Banners Table
CREATE TABLE hero_banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  title VARCHAR,
  subtitle TEXT,
  link_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) setup
-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;

-- Public READ Access
CREATE POLICY "Public can read categories" ON categories FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Public can read active products" ON products FOR SELECT TO PUBLIC USING (is_active = true);
CREATE POLICY "Public can read product images" ON images FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Public can read settings" ON settings FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Public can read active banners" ON hero_banners FOR SELECT TO PUBLIC USING (is_active = true);

-- Public INSERT Access for Orders (Guest checkout)
CREATE POLICY "Public can insert orders" ON orders FOR INSERT TO PUBLIC WITH CHECK (true);
CREATE POLICY "Public can insert order items" ON order_items FOR INSERT TO PUBLIC WITH CHECK (true);

-- Authenticated Admin Access (CRUD for all)
CREATE POLICY "Admin full access categories" ON categories TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access products" ON products TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access product images" ON images TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access orders" ON orders TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access order items" ON order_items TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access settings" ON settings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access banners" ON hero_banners TO authenticated USING (true) WITH CHECK (true);
