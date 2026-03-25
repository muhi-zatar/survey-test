import React, { useState, useEffect } from 'react';
import ConsentForm from './components/ConsentForm';
import DemographicForm from './components/DemographicForm';
import SurveyForm from './components/SurveyForm';
import ReferralForm from './components/ReferralForm';
import ThankYou from './components/ThankYou';
import { Respondent, SurveyResponse, ConsentData, DemographicData, ReferralData } from './types/survey';
import { surveyTemplates } from './data/surveyTemplates';
import { SurveyService } from './services/surveyService';

type AppState = 'consent' | 'demographics' | 'survey' | 'referral' | 'complete';

function App() {
  const [currentState, setCurrentState] = useState<AppState>(() => {
    const cached = localStorage.getItem('surveyState');
    return cached ? JSON.parse(cached) : 'consent';
  });

  const [consentData, setConsentData] = useState<ConsentData | null>(() => {
    const cached = localStorage.getItem('consentData');
    return cached ? JSON.parse(cached) : null;
  });

  const [respondent, setRespondent] = useState<Respondent | null>(() => {
    const cached = localStorage.getItem('respondentData');
    return cached ? JSON.parse(cached) : null;
  });

  const [surveyResponse, setSurveyResponse] = useState<SurveyResponse | null>(() => {
    const cached = localStorage.getItem('surveyResponse');
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    localStorage.setItem('surveyState', JSON.stringify(currentState));
  }, [currentState]);

  useEffect(() => {
    if (consentData) {
      localStorage.setItem('consentData', JSON.stringify(consentData));
    }
  }, [consentData]);

  useEffect(() => {
    if (respondent) {
      localStorage.setItem('respondentData', JSON.stringify(respondent));
    }
  }, [respondent]);

  useEffect(() => {
    if (surveyResponse) {
      localStorage.setItem('surveyResponse', JSON.stringify(surveyResponse));
    }
  }, [surveyResponse]);

  const handleConsentAccept = (consent: ConsentData) => {
    setConsentData(consent);
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

  const handleReferralComplete = async (referralData: ReferralData) => {
    await saveAllData(referralData);
    setCurrentState('complete');
  };

  const handleReferralSkip = async () => {
    await saveAllData();
    setCurrentState('complete');
  };

  const saveAllData = async (referralData?: ReferralData) => {
    if (!consentData || !respondent || !surveyResponse) {
      console.error('Missing required data to save');
      return;
    }

    const demographicData: DemographicData = {
      age: respondent.yearsExperience,
      gender: respondent.role,
      ethnicity: respondent.workplace,
      education: respondent.country,
      location: respondent.country
    };

    try {
      await SurveyService.saveCompleteSurvey({
        consent: consentData,
        demographics: demographicData,
        survey: surveyResponse,
        referral: referralData
      });
      console.log('Survey data saved successfully');
      clearAllData();
    } catch (error) {
      console.error('Failed to save survey data:', error);
    }
  };

  const clearAllData = () => {
    localStorage.removeItem('surveyState');
    localStorage.removeItem('consentData');
    localStorage.removeItem('respondentData');
    localStorage.removeItem('surveyResponse');
    setCurrentState('consent');
    setConsentData(null);
    setRespondent(null);
    setSurveyResponse(null);
  };

  const handleStartNew = () => {
    clearAllData();
  };

  const handleBackToDemographics = () => {
    setCurrentState('demographics');
  };

  const handleAbortSurvey = () => {
    if (window.confirm('Are you sure you want to abort the survey? All progress will be lost.')) {
      clearAllData();
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
          onBack={() => setCurrentState('survey')}
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