import React from 'react';
import { CheckCircle, FileText, Users, Shield } from 'lucide-react';

interface ConsentFormProps {
  onAccept: () => void;
}

const ConsentForm: React.FC<ConsentFormProps> = ({ onAccept }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <FileText className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Research Participation Consent
        </h1>
        <div className="w-20 h-1 bg-yellow-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">
          AI Integration in Power Systems Survey
        </p>
        <p className="text-md text-gray-500">
          University of Colorado Boulder Research Initiative
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <Users className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Research Purpose
              </h3>
              <p className="text-blue-800">
                This survey is part of a research study conducted by the University of Colorado Boulder's 
                Department of Electrical, Computer & Energy Engineering. We are investigating the current 
                state and future potential of AI/ML integration in power systems operations.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Your Participation
              </h3>
              <ul className="text-green-800 space-y-2">
                <li>• Participation is completely voluntary</li>
                <li>• You may withdraw at any time without penalty</li>
                <li>• The survey takes approximately 10-15 minutes to complete</li>
                <li>• Your responses will contribute to advancing power systems research</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Privacy & Confidentiality
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li>• All responses are collected anonymously</li>
                <li>• No personally identifiable information is required</li>
                <li>• Email address is optional and only used for research updates</li>
                <li>• Data will be used solely for research purposes</li>
                <li>• Results may be published in academic journals and conferences</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            Contact Information
          </h3>
          <p className="text-yellow-800 mb-2">
            If you have questions about this research, please contact:
          </p>
          <div className="text-yellow-800 space-y-1">
            <p>• Muhy Zater: muhy.zater@colorado.edu</p>
            <p>• Maria Vabson: maria.vabson@colorado.edu</p>
            <p>• Anna Van Boven: anna.vanboven@colorado.edu</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Informed Consent Statement
        </h3>
        <p className="text-gray-700 mb-4">
          By clicking "I Agree to Participate" below, you acknowledge that:
        </p>
        <ul className="text-gray-700 space-y-1 mb-4 ml-4">
          <li>• You have read and understood the information about this research study</li>
          <li>• You understand that participation is voluntary</li>
          <li>• You understand that you may withdraw at any time</li>
          <li>• You consent to participate in this research</li>
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={onAccept}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl text-lg"
        >
          I Agree to Participate
        </button>
        <p className="text-sm text-gray-500 mt-4">
          By clicking this button, you provide your informed consent to participate in this research study.
        </p>
      </div>
    </div>
  );
};

export default ConsentForm;