import React from 'react';
import { CheckCircle, Download, RotateCcw } from 'lucide-react';
import { SurveyResponse, Respondent } from '../types/survey';

interface ThankYouProps {
  response: SurveyResponse;
  respondent: Respondent;
}

const ThankYou: React.FC<ThankYouProps> = ({ response, respondent, onStartNew }) => {
  const exportData = () => {
    const data = {
      respondent,
      response,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-response-${response.respondentId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thank You!
        </h1>
        <div className="w-20 h-1 bg-yellow-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">
          Your survey response has been successfully submitted.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Survey Summary
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-left">
          <div>
            <p className="text-sm text-gray-600">Response ID:</p>
            <p className="font-medium">{response.respondentId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Survey Type:</p>
            <p className="font-medium">{response.templateType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Completed:</p>
            <p className="font-medium">{response.timestamp.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Organization:</p>
            <p className="font-medium">{respondent.workplace}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Country:</p>
            <p className="font-medium">{respondent.country}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Your Response
        </h3>
        <p className="text-blue-800">
          Your responses will contribute to our research on AI integration in power systems and help advance the field. 
          Thank you for participating in this important research initiative from the University of Colorado Boulder.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={exportData}
          className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
        >
          <Download size={16} />
          <span>Download Response</span>
        </button>
        
        <button
          onClick={onStartNew}
          className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
        >
          <RotateCcw size={16} />
          <span>Submit Another Response</span>
        </button>
      </div>

      <div className="mt-8 text-sm text-gray-500">
      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        <p className="mt-1">For questions about this research, please contact the research team: muhy.zater@colorado.edu, maria.vabson@colorado.edu, anna.vanboven@colorado.edu</p>
      </div>
    </div>
    </div>
  );
};

export default ThankYou;