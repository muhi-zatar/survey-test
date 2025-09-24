import React, { useState } from 'react';
import ConsentForm from './components/ConsentForm';
import DemographicForm from './components/DemographicForm';
import SurveyForm from './components/SurveyForm';
import ReferralForm from './components/ReferralForm';
import ThankYou from './components/ThankYou';
import { Respondent, SurveyResponse } from './types/survey';
import { surveyTemplates } from './data/surveyTemplates';

type AppState = 'consent' | 'demographics' | 'survey' | 'referral' | 'complete';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('consent');
  const [respondent, setRespondent] = useState<Respondent | null>(null);
  const [surveyResponse, setSurveyResponse] = useState<SurveyResponse | null>(null);

  const handleConsentAccept = () => {
    setCurrentState('demographics');
  };

  const handleDemographicsComplete = (newRespondent: Respondent) => {
    setRespondent(newRespondent);
    setCurrentState('survey');
  };

  const handleSurveyComplete = (response: SurveyResponse) => {
    setSurveyResponse(response);
    setCurrentState('referral');
  };

  const handleReferralComplete = () => {
    setCurrentState('complete');
  };

  const handleReferralSkip = () => {
    setCurrentState('complete');
  };

  const handleStartNew = () => {
    setCurrentState('consent');
    setRespondent(null);
    setSurveyResponse(null);
  };

  const handleBackToDemographics = () => {
    setCurrentState('demographics');
  };

  const handleAbortSurvey = () => {
    if (window.confirm('Are you sure you want to abort the survey? All progress will be lost.')) {
      setCurrentState('consent');
      setRespondent(null);
      setSurveyResponse(null);
    }
  };

  const getSelectedSurveyTemplate = () => {
    if (!respondent) return surveyTemplates[surveyTemplates.length - 1]; // fallback template
    
    // Find the first template that matches the respondent's profile
    for (const template of surveyTemplates) {
      if (template.condition(respondent)) {
        return template;
      }
    }
    
    // Fallback to general template
    return surveyTemplates[surveyTemplates.length - 1];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      {currentState === 'consent' && (
        <ConsentForm onAccept={handleConsentAccept} />
      )}
      
      {currentState === 'demographics' && (
        <DemographicForm onComplete={handleDemographicsComplete} />
      )}
      
      {currentState === 'survey' && respondent && (
        <SurveyForm
          template={getSelectedSurveyTemplate()}
          respondent={respondent}
          onComplete={handleSurveyComplete}
          onBack={handleBackToDemographics}
          onAbort={handleAbortSurvey}
        />
      )}
      
      {currentState === 'referral' && (
        <ReferralForm
          onComplete={handleReferralComplete}
          onSkip={handleReferralSkip}
        />
      )}
      
      {currentState === 'complete' && surveyResponse && respondent && (
        <ThankYou
          response={surveyResponse}
          respondent={respondent}
          onStartNew={handleStartNew}
        />
      )}
    </div>
  );
}

export default App;