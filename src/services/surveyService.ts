import { supabase } from '../lib/supabase';
import { CompleteSurveyData } from '../types/survey';

export class SurveyService {
  static async saveCompleteSurvey(data: CompleteSurveyData): Promise<void> {
    try {
      const { error } = await supabase
        .from('survey_responses')
        .insert({
          consent_agreed: data.consent.agreed,
          consent_signature: data.consent.signature,
          consent_date: data.consent.date,
          demographic_age: data.demographics.age,
          demographic_gender: data.demographics.gender,
          demographic_ethnicity: data.demographics.ethnicity,
          demographic_education: data.demographics.education,
          demographic_location: data.demographics.location,
          survey_responses: data.survey.responses,
          referral_source: data.referral?.source,
          referral_other: data.referral?.other,
          referral_newsletter: data.referral?.newsletter || false,
          referral_email: data.referral?.email
        });

      if (error) {
        console.error('Error saving survey data:', error);
        throw new Error('Failed to save survey data');
      }
    } catch (error) {
      console.error('Error in saveCompleteSurvey:', error);
      throw error;
    }
  }

  static async getAllResponses() {
    try {
      const { data, error } = await supabase
        .from('survey_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching responses:', error);
        throw new Error('Failed to fetch survey responses');
      }

      return data;
    } catch (error) {
      console.error('Error in getAllResponses:', error);
      throw error;
    }
  }
}