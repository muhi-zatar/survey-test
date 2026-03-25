/*
  # Survey Responses Database Schema

  1. New Tables
    - `survey_responses`
      - `id` (uuid, primary key) - Unique identifier for each response
      - `created_at` (timestamptz) - Timestamp when response was submitted
      - `consent_agreed` (boolean) - Whether participant agreed to consent
      - `consent_signature` (text) - Participant's signature
      - `consent_date` (text) - Date of consent
      - `demographic_age` (text) - Age group of participant
      - `demographic_gender` (text) - Gender of participant
      - `demographic_ethnicity` (text) - Ethnicity of participant
      - `demographic_education` (text) - Education level of participant
      - `demographic_location` (text) - Location of participant
      - `survey_responses` (jsonb) - All survey question responses stored as JSON
      - `referral_source` (text) - How participant heard about the study
      - `referral_other` (text) - Other referral source if applicable
      - `referral_newsletter` (boolean) - Whether participant wants newsletter updates
      - `referral_email` (text) - Email for newsletter (optional)

  2. Security
    - Enable RLS on `survey_responses` table
    - Add policy to allow anyone to insert their own responses (public survey)
    - No read access for survey takers (only admins can read via dashboard)

  3. Important Notes
    - All fields allow NULL except id and created_at
    - Survey responses stored as JSONB for flexibility
    - Public can only INSERT, cannot SELECT their own or others' data
    - Admins access data through Supabase dashboard
*/

CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now() NOT NULL,
  consent_agreed boolean,
  consent_signature text,
  consent_date text,
  demographic_age text,
  demographic_gender text,
  demographic_ethnicity text,
  demographic_education text,
  demographic_location text,
  survey_responses jsonb,
  referral_source text,
  referral_other text,
  referral_newsletter boolean DEFAULT false,
  referral_email text
);

ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit survey responses (public survey)
CREATE POLICY "Anyone can submit survey responses"
  ON survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create index for faster queries on created_at
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at DESC);