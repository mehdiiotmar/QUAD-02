/*
  # Create Gallery, Hero Slides, and Offers Tables

  1. New Tables
    - `gallery_images`
      - `id` (uuid, primary key)
      - `image_url` (text) — full image URL
      - `alt_text` (text) — accessibility description
      - `tall` (boolean) — whether card is tall in masonry grid
      - `sort_order` (int) — display order
      - `is_active` (boolean) — show/hide
      - `created_at` (timestamptz)

    - `hero_slides`
      - `id` (uuid, primary key)
      - `image_url` (text) — background image URL
      - `position` (text) — CSS background-position e.g. "center 40%"
      - `sort_order` (int) — slide order
      - `is_active` (boolean)
      - `created_at` (timestamptz)

    - `offers`
      - `id` (uuid, primary key)
      - `title` (text)
      - `duration` (text) — e.g. "2h"
      - `description` (text)
      - `price` (text) — e.g. "350 MAD"
      - `image_url` (text)
      - `is_popular` (boolean) — show "Populaire" badge
      - `sort_order` (int)
      - `is_active` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public SELECT allowed (content is publicly visible)
    - Only service role can INSERT/UPDATE/DELETE

  3. Notes
    - All tables are driven from Google Sheets sync
    - is_active allows hiding rows without deleting
*/

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL DEFAULT '',
  alt_text text NOT NULL DEFAULT 'GoQuad Tetouan',
  tall boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read gallery_images"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL DEFAULT '',
  position text NOT NULL DEFAULT 'center 40%',
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read hero_slides"
  ON hero_slides FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  is_popular boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read offers"
  ON offers FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO gallery_images (image_url, alt_text, tall, sort_order) VALUES
  ('https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=600', 'Quad ride Tetouan', true, 1),
  ('https://images.pexels.com/photos/163210/motorcycles-race-speed-helmet-163210.jpeg?auto=compress&w=600', 'Quad helmet speed', false, 2),
  ('https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&w=600', 'Quad 250cc sport', false, 3),
  ('https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&w=600', 'Buggy duo', true, 4),
  ('https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&w=600', 'Quad adventure', false, 5),
  ('https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&w=600', 'Off-road vehicle', false, 6),
  ('https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&w=600', 'Desert quad', true, 7),
  ('https://images.pexels.com/photos/1616317/pexels-photo-1616317.jpeg?auto=compress&w=600', 'Quad trail', false, 8),
  ('https://images.pexels.com/photos/3894874/pexels-photo-3894874.jpeg?auto=compress&w=600', 'Family buggy', false, 9);

INSERT INTO hero_slides (image_url, position, sort_order) VALUES
  ('https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=1600', 'center 40%', 1),
  ('https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&w=1600', 'center 50%', 2),
  ('https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&w=1600', 'center 35%', 3);

INSERT INTO offers (title, duration, description, price, image_url, is_popular, sort_order) VALUES
  ('Découverte', '1h', 'Parfait pour débuter — circuit balisé avec guide', '200 MAD', 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=800', false, 1),
  ('Aventure', '2h', 'Trail complet avec pause panoramique sur Tetouan', '350 MAD', 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&w=800', true, 2),
  ('Expédition', '4h', 'Journée complète dans le Rif — déjeuner inclus', '600 MAD', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&w=800', false, 3);
