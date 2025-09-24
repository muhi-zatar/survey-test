export interface Respondent {
  id: string;
  workplace: string;
  role: string;
  country: string;
  yearsExperience: string;
  powerSystemsFields: string[];
  tasks: string[];
  email?: string;
  timestamp: Date;
}

export interface SurveyResponse {
  respondentId: string;
  templateType: string;
  responses: Record<string, any>;
  taskIntegrationLevels?: Record<string, { current: string; desired: string; comments: string }>;
  completed: boolean;
  timestamp: Date;
}

export interface SurveyTemplate {
  id: string;
  name: string;
  description: string;
  questions: SurveyQuestion[];
  condition: (respondent: Respondent) => boolean;
}

export interface SurveyQuestion {
  id: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'scale';
  question: string;
  options?: string[];
  required: boolean;
  scaleRange?: { min: number; max: number; labels?: { min: string; max: string } };
  scaleLabels?: Record<number, string>;
}