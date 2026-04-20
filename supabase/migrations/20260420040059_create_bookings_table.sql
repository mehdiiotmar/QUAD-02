/*
  # Create Bookings Table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `service` (text) — selected forfait/package
      - `date` (date) — reservation date
      - `time` (text) — selected time slot e.g. "10:00"
      - `people` (int) — number of people
      - `name` (text) — customer full name
      - `phone` (text) — customer phone number
      - `email` (text, nullable) — customer email (optional)
      - `notes` (text) — special requests
      - `source` (text) — "form" or "cart"
      - `cart_items` (jsonb, nullable) — serialized cart when source=cart
      - `status` (text) — "pending" | "confirmed" | "cancelled"
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Anonymous users can INSERT (create bookings without login)
    - Only authenticated users (admin) can SELECT all bookings
    - Anonymous users can SELECT their own bookings by phone number

  3. Notes
    - Bookings are created from both the reservation form and cart checkout
    - cart_items stores the full cart JSON when booking comes from cart drawer
    - status defaults to "pending" until confirmed by staff via WhatsApp
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service text NOT NULL DEFAULT '',
  date date,
  time text NOT NULL DEFAULT '',
  people int NOT NULL DEFAULT 1,
  name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text,
  notes text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT 'form',
  cart_items jsonb,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a booking"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);
