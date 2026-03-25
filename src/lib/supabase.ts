import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Environment variables:', {
    url: supabaseUrl,
    key: supabaseAnonKey ? 'present' : 'missing',
    allEnv: import.meta.env
  });
  throw new Error('Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env file and restart the dev server.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DatabaseRespondent {
  id: string;
  workplace: string;
  role: string;
  years_experience: string;
  power_systems_fields: string[];
  tasks: string[];
  created_at: string;
}

export interface DatabaseSurveyResponse {
  id: string;
  respondent_id: string;
  template_type: string;
  responses: Record<string, any>;
  completed: boolean;
  created_at: string;
}