import React, { useState } from 'react';
import { SurveyTemplate, SurveyQuestion, SurveyResponse, Respondent } from '../types/survey';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SurveyFormProps {
  template: SurveyTemplate;
  respondent: Respondent;
  onComplete: (response: SurveyResponse) => void;
  onBack: () => void;
  onAbort: () => void;
}

type SurveyPage = 'questions' | 'task-integration' | 'open-ended';

const SurveyForm: React.FC<SurveyFormProps> = ({ template, respondent, onComplete, onBack, onAbort }) => {
  const [currentPage, setCurrentPage] = useState<SurveyPage>('questions');
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [taskIntegrationLevels, setTaskIntegrationLevels] = useState<Record<string, { current: string; desired: string; comments: string }>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const scaleQuestions = template.questions.filter(q => q.type === 'scale');
  const openEndedQuestions = template.questions.filter(q => q.type === 'textarea');

  const aiIntegrationLevels = {
    0: 'No AI integration',
    1: 'Basic decision support and insights',
    2: 'Supervisory control',
    3: 'Automated control (human in the loop)',
    4: 'Fully autonomous',
    5: 'AI fully autonomous no human intervention'
  };

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    setErrors(prev => ({ ...prev, [questionId]: '' }));
  };

  const handleTaskIntegrationChange = (task: string, field: 'current' | 'desired' | 'comments', value: string) => {
    setTaskIntegrationLevels(prev => ({
      ...prev,
      [task]: {
        ...prev[task],
        [field]: value
      }
    }));
  };

  const validateScaleQuestions = () => {
    const newErrors: Record<string, string> = {};
    
    scaleQuestions.forEach(question => {
      if (question.required && !responses[question.id]) {
        newErrors[question.id] = 'This question is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentPage === 'questions') {
      setCurrentPage('task-integration');
    } else if (currentPage === 'task-integration') {
      setCurrentPage('open-ended');
    } else {
      // Complete survey
      const surveyResponse: SurveyResponse = {
        respondentId: respondent.id,
        templateType: template.id,
        responses,
        taskIntegrationLevels,
        completed: true,
        timestamp: new Date()
      };
      onComplete(surveyResponse);
    }
  };

  const handlePrevious = () => {
    if (currentPage === 'questions') {
      onBack();
    } else if (currentPage === 'task-integration') {
      setCurrentPage('questions');
    } else {
      setCurrentPage('task-integration');
    }
  };

  const renderScaleQuestionsTable = () => {
    return (
      <div className="space-y-6">
        {/* Scale legend for AI experience question */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">AI Experience Scale Reference:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="font-medium">0:</span>
              <span>I never used AI</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">1:</span>
              <span>I use it as a generic tool for non grid tasks, like ChatGPT, gemini, etc</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">2:</span>
              <span>I have an understanding of how AI works, but without hands on experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">3:</span>
              <span>I used AI and ML models off the shelf or packages</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">4:</span>
              <span>I use AI model in my work</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">5:</span>
              <span>AI researcher/developer</span>
            </div>
          </div>
        </div>

        {/* Scale legend for other questions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">Other Questions Scale Reference:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Need Scale:</span>
              <span>1 = No need at all, 5 = Critical need</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">ML Integration:</span>
              <span>0 = No ML, 5 = Full constraint-aware ML</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Question</th>
                {Array.from({ length: 6 }, (_, i) => (
                  <th key={i} className="border border-gray-300 px-2 py-3 text-center font-semibold min-w-[60px]">
                    {i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scaleQuestions.map((question) => (
                <tr key={question.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">
                    {question.question}
                  </td>
                  {Array.from({ length: 6 }, (_, i) => (
                    <td key={i} className="border border-gray-300 px-2 py-3 text-center">
                      <input
                        type="radio"
                        name={question.id}
                        value={i}
                        checked={responses[question.id] === i.toString()}
                        onChange={(e) => handleResponse(question.id, e.target.value)}
                        className="w-4 h-4 text-yellow-600 border-gray-300 focus:ring-yellow-500"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTaskIntegrationPage = () => {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Integration Levels for Your Tasks</h2>
          <p className="text-gray-600">
            For each task you selected, please indicate the current and desired level of AI integration.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Field</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Planning/Operations</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Task</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Current Level (0-5)</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Desired Level (0-5)</th>
              </tr>
            </thead>
            <tbody>
              {respondent.tasks.map((task) => {
                const parts = task.split(' > ');
                const field = parts[0] || '';
                const planningOps = parts[1] || '';
                const taskName = parts[2] || '';
                const taskData = taskIntegrationLevels[task] || { current: '', desired: '', comments: '' };

                return (
                  <tr key={task} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">{field}</td>
                    <td className="border border-gray-300 px-4 py-3">{planningOps}</td>
                    <td className="border border-gray-300 px-4 py-3">{taskName}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <select
                        value={taskData.current}
                        onChange={(e) => handleTaskIntegrationChange(task, 'current', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="">Select</option>
                        {Object.entries(aiIntegrationLevels).map(([num, label]) => (
                          <option key={num} value={num}>{num} - {label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <select
                        value={taskData.desired}
                        onChange={(e) => handleTaskIntegrationChange(task, 'desired', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <option value="">Select</option>
                        {Object.entries(aiIntegrationLevels).map(([num, label]) => (
                          <option key={num} value={num}>{num} - {label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Scale legend */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">AI Integration Levels:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {Object.entries(aiIntegrationLevels).map(([num, label]) => (
              <div key={num} className="flex items-center space-x-2">
                <span className="font-medium">{num}:</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderOpenEndedPage = () => {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Comments</h2>
          <p className="text-gray-600">
            All questions on this page are optional. Please provide any additional insights you'd like to share.
          </p>
        </div>

        {/* Task-specific comments */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Task-Specific Comments</h3>
          {respondent.tasks.map((task) => {
            const taskData = taskIntegrationLevels[task] || { current: '', desired: '', comments: '' };
            return (
              <div key={task} className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What other comments do you have regarding the challenges of/potential for AI integration for: <strong>{task}</strong>?
                </label>
                <textarea
                  value={taskData.comments}
                  onChange={(e) => handleTaskIntegrationChange(task, 'comments', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                  placeholder="Optional comments about this specific task..."
                />
              </div>
            );
          })}
        </div>

        {/* General open-ended questions */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">General Questions</h3>
          {openEndedQuestions.map((question) => (
            <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {question.question}
              </label>
              <textarea
                value={responses[question.id] || ''}
                onChange={(e) => handleResponse(question.id, e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                placeholder="Optional response..."
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'questions':
        return `${template.name} - Scale Questions`;
      case 'task-integration':
        return 'AI Integration Levels';
      case 'open-ended':
        return 'Additional Comments';
      default:
        return template.name;
    }
  };

  const getProgress = () => {
    switch (currentPage) {
      case 'questions':
        return 33;
      case 'task-integration':
        return 66;
      case 'open-ended':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Abort Survey Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={onAbort}
          className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition duration-200"
        >
          Abort Survey
        </button>
      </div>

      {/* Header */}
      <div className="bg-gray-50 px-8 py-6 rounded-t-lg border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
        </div>
        <p className="text-gray-600 mb-4">{template.description}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {currentPage === 'questions' && renderScaleQuestionsTable()}
        {currentPage === 'task-integration' && renderTaskIntegrationPage()}
        {currentPage === 'open-ended' && renderOpenEndedPage()}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            className="flex items-center space-x-2 px-6 py-2 text-gray-600 hover:text-gray-800 transition duration-200"
          >
            <ArrowLeft size={16} />
            <span>
              {currentPage === 'questions' 
                ? 'Back to Demographics' 
                : 'Previous'}
            </span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            <span>
              {currentPage === 'open-ended' 
                ? 'Complete Survey' 
                : 'Next'}
            </span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;