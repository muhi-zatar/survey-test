/*
  # Create Survey Database Schema

  1. New Tables
    - `respondents`
      - `id` (uuid, primary key)
      - `workplace` (text)
      - `role` (text)
      - `country` (text)
      - `years_experience` (text)
      - `power_systems_fields` (text array)
      - `tasks` (text array)
      - `email` (text, optional)
      - `created_at` (timestamp)
    - `survey_responses`
      - `id` (uuid, primary key)
      - `respondent_id` (uuid, foreign key)
      - `template_type` (text)
      - `responses` (jsonb)
      - `task_integration_levels` (jsonb, optional)
      - `completed` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public insert access (since this is an anonymous survey)
    - Add policies for authenticated read access for researchers
*/

-- Create respondents table
CREATE TABLE IF NOT EXISTS respondents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workplace text NOT NULL,
  role text NOT NULL,
  country text NOT NULL,
  years_experience text NOT NULL,
  power_systems_fields text[] DEFAULT '{}',
  tasks text[] NOT NULL,
  email text,
  created_at timestamptz DEFAULT now()
);

-- Create survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  respondent_id uuid REFERENCES respondents(id) ON DELETE CASCADE,
  template_type text NOT NULL,
  responses jsonb NOT NULL DEFAULT '{}',
  task_integration_levels jsonb DEFAULT '{}',
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE respondents ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for public insert access (anonymous survey)
CREATE POLICY "Allow public insert on respondents"
  ON respondents
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public insert on survey_responses"
  ON survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies for authenticated read access (for researchers)
CREATE POLICY "Allow authenticated read on respondents"
  ON respondents
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read on survey_responses"
  ON survey_responses
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_respondents_created_at ON respondents(created_at);
CREATE INDEX IF NOT EXISTS idx_survey_responses_respondent_id ON survey_responses(respondent_id);
CREATE INDEX IF NOT EXISTS idx_survey_responses_template_type ON survey_responses(template_type);
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at);