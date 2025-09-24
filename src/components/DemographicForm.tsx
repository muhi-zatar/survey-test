import React, { useState } from 'react';
import { Respondent } from '../types/survey';

interface DemographicFormProps {
  onComplete: (respondent: Respondent) => void;
}

const institutions = [
  'Vertically Integrated Utility',
  'Academic Institution',
  'National or Private Research Laboratory',
  'Technology/Software Vendor',
  'Regulatory Agency or Government Body',
  'Consulting agency'
];

const jobPositions = [
  'Managerial',
  'Professor',
  'Researcher',
  'Software',
  'Grid operator',
  'Consultant',
  'Traders',
  'Lineman'
];

const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
  'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
  'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
  'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
  'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
  'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
  'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
  'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia',
  'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
  'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
  'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
  'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
  'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

const powerSystemsFields = {
  'Generation (batteries included)': {
    'Planning': [
      'Weather forecasting (fire, tsunami, too cold)',
      'Environmental impact assessment',
      'Site selection',
      'Market bidding strategy development',
      'Power quality monitoring',
      'Load forecasting',
      'Solar forecasting',
      'Wind forecasting',
      'Independent producer decision-making',
      'Asset management',
      'Capacity expansion',
      'Energy storage control (grid-level)',
      'Hydrostorage control',
      'LI battery control',
      'CAES',
      'Flywheels',
      'IBR control decisions'
    ],
    'Operation': [
      'Weather forecasting (fire, tsunami, too cold)',
      'Load forecasting',
      'Solar forecasting',
      'Wind forecasting',
      'Independent producer decision-making',
      'Energy storage control (grid-level)',
      'IBR control decisions'
    ]
  },
  'Load (Demand side)': {
    'Planning': [
      'Environmental impact assessment',
      'Weather forecasting (fire, tsunami, too cold)',
      'Site selection',
      'Asset management',
      'Load forecasting',
      'EV charging location',
      'Demand response',
      'Battery control (residential)',
      'Wireless charging for EVs'
    ],
    'Operation': [
      'Weather forecasting (fire, tsunami, too cold)',
      'Demand response',
      'Home-energy management systems',
      'Battery control (residential)'
    ]
  },
  'Markets': {
    'Planning': [
      'Market bidding strategy development',
      'Load forecasting',
      'Reserve market planning',
      'Capacity Markets',
      'Capacity expansion',
      'Line congestion (trading)',
      'Energy storage control (grid-level)',
      'Power system modeling',
      'Black-start planning'
    ],
    'Operation': [
      'Reserve market bidding/management',
      'Line congestion (trading)',
      'Energy storage control (grid-level)',
      'Power system modeling'
    ]
  },
  'Transmission': {
    'Planning': [
      'Environmental impact assessment',
      'Weather forecasting (fire, tsunami, too cold)',
      'Site selection',
      'Asset management',
      'Capacity expansion',
      'Power system modeling',
      'Static Security assessment',
      'Cyber-security assessment',
      'Dynamic security assessment'
    ],
    'Operation': [
      'Weather forecasting (fire, tsunami, too cold)',
      'Power quality monitoring',
      'Contingency analysis',
      'State-estimation',
      'Unit commitment',
      'Fault detection',
      'Fault prediction',
      'Fault recovery',
      'Power system modeling',
      'Static Security assessment',
      'Cyber-security assessment',
      'Optimal Power flow',
      'Power flow'
    ]
  },
  'Distribution': {
    'Planning': [
      'Environmental impact assessment',
      'Weather forecasting (fire, tsunami, too cold)',
      'Site selection',
      'Asset management',
      'EV charging location',
      'Distribution planning',
      'Battery control (residential)'
    ],
    'Operation': [
      'Weather forecasting (fire, tsunami, too cold)',
      'Power quality monitoring',
      'State-estimation',
      'Fault detection',
      'Fault prediction',
      'Fault recovery',
      'Maintenance',
      'Battery control (residential)'
    ]
  }
};

const DemographicForm: React.FC<DemographicFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    institution: '',
    customInstitution: '',
    jobPosition: '',
    customJobPosition: '',
    country: '',
    customCountry: '',
    yearsExperience: '',
    selectedTasks: [] as string[],
    email: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expandedFields, setExpandedFields] = useState<Record<string, boolean>>({});
  const [expandedSubFields, setExpandedSubFields] = useState<Record<string, boolean>>({});
  const [showAbortConfirm, setShowAbortConfirm] = useState(false);

  const handleAbortSurvey = () => {
    if (window.confirm('Are you sure you want to abort the survey? All progress will be lost.')) {
      window.location.reload();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrors: Record<string, string> = {};
    
    if (!formData.institution && !formData.customInstitution) {
      newErrors.institution = 'Institution is required';
    }
    
    if (!formData.jobPosition && !formData.customJobPosition) {
      newErrors.jobPosition = 'Job position is required';
    }
    
    if (!formData.country && !formData.customCountry) {
      newErrors.country = 'Country is required';
    }
    
    if (!formData.yearsExperience) {
      newErrors.yearsExperience = 'Years of experience is required';
    }
    
    if (formData.selectedTasks.length === 0) {
      newErrors.selectedTasks = 'Please select at least one task from the power systems fields';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const respondent: Respondent = {
      id: Date.now().toString(),
      workplace: formData.institution || formData.customInstitution || 'Not specified',
      role: formData.jobPosition || formData.customJobPosition || 'Not specified',
      country: formData.country || formData.customCountry || 'Not specified',
      yearsExperience: formData.yearsExperience || 'Not specified',
      powerSystemsFields: [], // Legacy field, keeping for compatibility
      tasks: formData.selectedTasks,
      email: formData.email,
      timestamp: new Date()
    };

    onComplete(respondent);
  };

  const toggleField = (field: string) => {
    setExpandedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const toggleSubField = (field: string, subField: string) => {
    const key = `${field}-${subField}`;
    setExpandedSubFields(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTaskChange = (task: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedTasks: checked
        ? [...prev.selectedTasks, task]
        : prev.selectedTasks.filter(t => t !== task)
    }));
    setErrors(prev => ({ ...prev, selectedTasks: '' }));
  };

  const isTaskSelected = (task: string) => {
    return formData.selectedTasks.includes(task);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Abort Survey Button */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={handleAbortSurvey}
          className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition duration-200"
        >
          Abort Survey
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Integration in Power Systems Survey
        </h1>
        <div className="w-20 h-1 bg-yellow-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">
          University of Colorado Boulder Research Initiative
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution *
              </label>
              <select
                value={formData.institution}
                onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.institution ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select institution type</option>
                {institutions.map((institution) => (
                  <option key={institution} value={institution}>
                    {institution}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              {formData.institution === 'Other' && (
                <input
                  type="text"
                  value={formData.customInstitution}
                  onChange={(e) => setFormData(prev => ({ ...prev, customInstitution: e.target.value }))}
                  placeholder="Please specify your institution type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mt-2"
                />
              )}
              {errors.institution && (
                <p className="text-red-500 text-sm mt-1">{errors.institution}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Position *
              </label>
              <select
                value={formData.jobPosition}
                onChange={(e) => setFormData(prev => ({ ...prev, jobPosition: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.jobPosition ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select job position</option>
                {jobPositions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              {formData.jobPosition === 'Other' && (
                <input
                  type="text"
                  value={formData.customJobPosition}
                  onChange={(e) => setFormData(prev => ({ ...prev, customJobPosition: e.target.value }))}
                  placeholder="Please specify your job position"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mt-2"
                />
              )}
              {errors.jobPosition && (
                <p className="text-red-500 text-sm mt-1">{errors.jobPosition}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              {formData.country === 'Other' && (
                <input
                  type="text"
                  value={formData.customCountry}
                  onChange={(e) => setFormData(prev => ({ ...prev, customCountry: e.target.value }))}
                  placeholder="Please specify your country"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 mt-2"
                />
              )}
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of experience in power systems *
              </label>
              <select
                value={formData.yearsExperience}
                onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.yearsExperience ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select experience level</option>
                <option value="0">0 years (No experience)</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="11-20">11-20 years</option>
                <option value="20+">20+ years</option>
              </select>
              {errors.yearsExperience && (
                <p className="text-red-500 text-sm mt-1">{errors.yearsExperience}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: Provide your email if you'd like to receive updates about this research
              </p>
            </div>
          </div>
        </div>

        {/* Power Systems Fields */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Power Systems Tasks & Responsibilities *
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Select all tasks that apply to your work (multiple selections allowed) - At least one selection required
          </p>
          
          <div className="space-y-4">
            {Object.entries(powerSystemsFields).map(([field, subFields]) => (
              <div key={field} className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => toggleField(field)}
                  className="w-full px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 rounded-t-lg font-medium text-gray-900 flex items-center justify-between"
                >
                  <span>{field}</span>
                  <span className="text-gray-500">
                    {expandedFields[field] ? '−' : '+'}
                  </span>
                </button>
                
                {expandedFields[field] && (
                  <div className="p-4 space-y-3">
                    {Object.entries(subFields).map(([subField, tasks]) => (
                      <div key={subField} className="border border-gray-100 rounded">
                        <button
                          type="button"
                          onClick={() => toggleSubField(field, subField)}
                          className="w-full px-3 py-2 text-left bg-gray-50 hover:bg-gray-100 rounded-t font-medium text-gray-800 flex items-center justify-between"
                        >
                          <span>{subField}</span>
                          <span className="text-gray-400">
                            {expandedSubFields[`${field}-${subField}`] ? '−' : '+'}
                          </span>
                        </button>
                        
                        {expandedSubFields[`${field}-${subField}`] && (
                          <div className="p-3 bg-white">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {tasks.map((task) => {
                                const fullTaskName = `${field} > ${subField} > ${task}`;
                                return (
                                  <label key={task} className="flex items-start space-x-2 cursor-pointer text-sm">
                                    <input
                                      type="checkbox"
                                      checked={isTaskSelected(fullTaskName)}
                                      onChange={(e) => handleTaskChange(fullTaskName, e.target.checked)}
                                      className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 mt-0.5 flex-shrink-0"
                                    />
                                    <span className="text-gray-700 leading-tight">{task}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {errors.selectedTasks && (
            <p className="text-red-500 text-sm mt-2">{errors.selectedTasks}</p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            Continue to Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default DemographicForm;