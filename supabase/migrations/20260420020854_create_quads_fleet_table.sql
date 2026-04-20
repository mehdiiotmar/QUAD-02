/*
  # Create Quads Fleet Table

  1. New Tables
    - `quads`
      - `id` (uuid, primary key)
      - `name` (text) — display name of quad/buggy
      - `engine` (text) — engine displacement e.g. "250cc"
      - `transmission` (text) — "Manuel" or "Automatique"
      - `seats` (int) — number of seats
      - `for_who` (text) — target audience description
      - `price_per_hour` (int) — price in MAD
      - `price_label` (text) — formatted price label e.g. "200 MAD/h"
      - `tag` (text) — badge label e.g. "Sport"
      - `tag_color` (text) — hex color for badge
      - `image_url` (text) — photo URL
      - `is_available` (boolean) — availability flag
      - `sort_order` (int) — display order
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `quads` table
    - Public SELECT allowed (products are publicly visible)
    - Only service role can INSERT/UPDATE/DELETE

  3. Notes
    - This table powers the quad fleet listing on the landing page
    - Seeded with 6 initial quad products
*/

CREATE TABLE IF NOT EXISTS quads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  engine text NOT NULL DEFAULT '',
  transmission text NOT NULL DEFAULT 'Manuel',
  seats int NOT NULL DEFAULT 1,
  for_who text NOT NULL DEFAULT '',
  price_per_hour int NOT NULL DEFAULT 0,
  price_label text NOT NULL DEFAULT '',
  tag text NOT NULL DEFAULT '',
  tag_color text NOT NULL DEFAULT '#FF5C00',
  image_url text NOT NULL DEFAULT '',
  is_available boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read quads"
  ON quads FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO quads (name, engine, transmission, seats, for_who, price_per_hour, price_label, tag, tag_color, image_url, is_available, sort_order) VALUES
  ('Quad 110cc — Enfant',   '110cc', 'Automatique', 1, 'Enfants 6–12 ans',   80,  '80 MAD/h',  'Junior',    '#FFB800', 'https://images.pexels.com/photos/163210/motorcycles-race-speed-helmet-163210.jpeg?auto=compress&w=800', true, 1),
  ('Quad 150cc — Adulte',   '150cc', 'Manuel',       1, 'Adultes débutants',  150, '150 MAD/h', 'Populaire', '#FF5C00', 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&w=800',             true, 2),
  ('Quad 250cc — Sport',    '250cc', 'Manuel',       1, 'Riders expérimentés',200, '200 MAD/h', 'Sport',     '#FF8A00', 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&w=800',              true, 3),
  ('Buggy 500cc — Duo',     '500cc', 'Automatique', 2, 'Couples & amis',     350, '350 MAD/h', 'Duo',       '#FF5C00', 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&w=800',             true, 4),
  ('Quad 400cc — Expert',   '400cc', 'Manuel',       1, 'Experts & groupes',  280, '280 MAD/h', 'Expert',    '#FF8A00', 'https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&w=800',             true, 5),
  ('Buggy 800cc — Famille', '800cc', 'Automatique', 4, 'Familles & groupes', 500, '500 MAD/h', 'Famille',   '#FFB800', 'https://images.pexels.com/photos/3894874/pexels-photo-3894874.jpeg?auto=compress&w=800',             true, 6);
