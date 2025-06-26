/*
  # Create users and health data tables

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `phone` (text)
      - `age` (integer)
      - `avatar` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `health_data`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `steps` (integer)
      - `heart_rate` (integer)
      - `sleep_hours` (decimal)
      - `water_glasses` (integer)
      - `weight` (decimal)
      - `date` (date)
      - `created_at` (timestamp)
    
    - `favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `item_type` (text) - 'remedy', 'recipe', 'yoga_session'
      - `item_id` (text)
      - `item_data` (jsonb)
      - `created_at` (timestamp)
    
    - `consultations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `doctor_name` (text)
      - `date` (date)
      - `time` (text)
      - `type` (text)
      - `status` (text)
      - `created_at` (timestamp)
    
    - `yoga_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `instructor` (text)
      - `session_name` (text)
      - `date` (date)
      - `time` (text)
      - `type` (text)
      - `status` (text)
      - `created_at` (timestamp)
    
    - `symptoms`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `symptom` (text)
      - `severity` (text)
      - `notes` (text)
      - `date` (date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  age integer,
  avatar text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Health data table
CREATE TABLE IF NOT EXISTS health_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  steps integer DEFAULT 0,
  heart_rate integer DEFAULT 0,
  sleep_hours decimal DEFAULT 0,
  water_glasses integer DEFAULT 0,
  weight decimal DEFAULT 0,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('remedy', 'recipe', 'yoga_session')),
  item_id text NOT NULL,
  item_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

-- Consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  doctor_name text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  type text NOT NULL CHECK (type IN ('video', 'phone', 'chat')),
  status text DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Yoga sessions table
CREATE TABLE IF NOT EXISTS yoga_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  instructor text NOT NULL,
  session_name text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Symptoms table
CREATE TABLE IF NOT EXISTS symptoms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  symptom text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('Low', 'Medium', 'High')),
  notes text,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE yoga_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert own data" ON users
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = id::text);

-- Create policies for health_data table
CREATE POLICY "Users can read own health data" ON health_data
  FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own health data" ON health_data
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own health data" ON health_data
  FOR UPDATE TO authenticated
  USING (auth.uid()::text = user_id::text);

-- Create policies for favorites table
CREATE POLICY "Users can read own favorites" ON favorites
  FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE TO authenticated
  USING (auth.uid()::text = user_id::text);

-- Create policies for consultations table
CREATE POLICY "Users can read own consultations" ON consultations
  FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own consultations" ON consultations
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own consultations" ON consultations
  FOR UPDATE TO authenticated
  USING (auth.uid()::text = user_id::text);

-- Create policies for yoga_sessions table
CREATE POLICY "Users can read own yoga sessions" ON yoga_sessions
  FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own yoga sessions" ON yoga_sessions
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own yoga sessions" ON yoga_sessions
  FOR UPDATE TO authenticated
  USING (auth.uid()::text = user_id::text);

-- Create policies for symptoms table
CREATE POLICY "Users can read own symptoms" ON symptoms
  FOR SELECT TO authenticated
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own symptoms" ON symptoms
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own symptoms" ON symptoms
  FOR UPDATE TO authenticated
  USING (auth.uid()::text = user_id::text);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_health_data_user_date ON health_data(user_id, date);
CREATE INDEX IF NOT EXISTS idx_favorites_user_type ON favorites(user_id, item_type);
CREATE INDEX IF NOT EXISTS idx_consultations_user_date ON consultations(user_id, date);
CREATE INDEX IF NOT EXISTS idx_yoga_sessions_user_date ON yoga_sessions(user_id, date);
CREATE INDEX IF NOT EXISTS idx_symptoms_user_date ON symptoms(user_id, date);