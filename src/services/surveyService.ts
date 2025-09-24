import { supabase } from '../lib/supabase';
import { Respondent, SurveyResponse } from '../types/survey';

export class SurveyService {
  static async saveRespondent(respondent: Respondent): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('respondents')
        .insert({
          workplace: respondent.workplace,
          role: respondent.role,
          years_experience: respondent.yearsExperience,
          power_systems_fields: respondent.powerSystemsFields,
          tasks: respondent.tasks
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error saving respondent:', error);
        throw new Error('Failed to save respondent data');
      }

      return data.id;
    } catch (error) {
      console.error('Error in saveRespondent:', error);
      throw error;
    }
  }

  static async saveSurveyResponse(response: SurveyResponse, databaseRespondentId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('survey_responses')
        .insert({
          respondent_id: databaseRespondentId,
          template_type: response.templateType,
          responses: response.responses,
          completed: response.completed
        });

      if (error) {
        console.error('Error saving survey response:', error);
        throw new Error('Failed to save survey response');
      }
    } catch (error) {
      console.error('Error in saveSurveyResponse:', error);
      throw error;
    }
  }

  static async getAllResponses() {
    try {
      const { data, error } = await supabase
        .from('survey_responses')
        .select(`
          *,
          respondents (
            workplace,
            role,
            years_experience,
            power_systems_fields,
            tasks,
            created_at
          )
        `)
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

  static async getResponsesByTemplate(templateType: string) {
    try {
      const { data, error } = await supabase
        .from('survey_responses')
        .select(`
          *,
          respondents (
            workplace,
            role,
            years_experience,
            power_systems_fields,
            tasks,
            created_at
          )
        `)
        .eq('template_type', templateType)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching responses by template:', error);
        throw new Error('Failed to fetch survey responses');
      }

      return data;
    } catch (error) {
      console.error('Error in getResponsesByTemplate:', error);
      throw error;
    }
  }
}