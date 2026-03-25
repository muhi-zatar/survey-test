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

export interface ConsentData {
  agreed: boolean;
  signature: string;
  date: string;
}

export interface DemographicData {
  age: string;
  gender: string;
  ethnicity: string;
  education: string;
  location: string;
}

export interface ReferralData {
  source: string;
  other?: string;
  newsletter: boolean;
  email?: string;
}

export interface CompleteSurveyData {
  consent: ConsentData;
  demographics: DemographicData;
  survey: SurveyResponse;
  referral?: ReferralData;
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