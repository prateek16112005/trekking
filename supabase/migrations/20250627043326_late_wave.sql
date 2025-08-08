/*
  # Create reservations and inquiries schema

  1. New Tables
    - `reservations`
      - `id` (uuid, primary key)
      - `trek_id` (text, references the trek)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text, optional)
      - `preferred_date` (date, optional)
      - `group_size` (text)
      - `message` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `contact_inquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text, optional)
      - `message` (text)
      - `inquiry_type` (text, default 'general')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public insert access (for form submissions)
    - Add policies for authenticated admin access (for viewing/managing)
*/

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trek_id text NOT NULL,
  trek_title text NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text DEFAULT '',
  preferred_date date,
  group_size text NOT NULL DEFAULT '1',
  message text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text DEFAULT '',
  message text NOT NULL,
  inquiry_type text NOT NULL DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for reservations
CREATE POLICY "Anyone can submit reservations"
  ON reservations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all reservations"
  ON reservations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update reservations"
  ON reservations
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for contact inquiries
CREATE POLICY "Anyone can submit contact inquiries"
  ON contact_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all inquiries"
  ON contact_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for reservations
CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reservations_email ON reservations(customer_email);
CREATE INDEX IF NOT EXISTS idx_reservations_trek_id ON reservations(trek_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);