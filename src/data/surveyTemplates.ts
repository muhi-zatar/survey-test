import { SurveyTemplate, Respondent } from '../types/survey';

export const surveyTemplates: SurveyTemplate[] = [
  {
    id: 'generation',
    name: 'Generation Systems Survey',
    description: 'Survey focused on AI/ML applications in Generation systems (including batteries and renewable energy)',
    condition: (respondent: Respondent) => 
      respondent.tasks.some(task => task.includes('Generation (batteries included)')),
    questions: [
      // Shared questions across all templates
      {
        id: 'ai-experience-level',
        type: 'scale',
        question: 'Describe your experience with AI',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'I never used AI', 
            max: 'AI researcher/developer' 
          }
        },
        scaleLabels: {
          0: 'I never used AI',
          1: 'I use it as a generic tool for non grid tasks, like ChatGPT, gemini, etc',
          2: 'I have an understanding of how AI works, but without hands on experience',
          3: 'I used AI and ML models off the shelf or packages',
          4: 'I use AI model in my work',
          5: 'AI researcher/developer'
        }
      },
      // Generation-specific questions
      {
        id: 'generation-forecasting-need',
        type: 'scale',
        question: 'Is there a genuine need for AI/new data driven techniques in Generation Forecasting (Solar/Wind/Load)?',
        required: true,
        scaleRange: { 
          min: 1, 
          max: 5, 
          labels: { 
            min: 'No need at all', 
            max: 'Critical need' 
          }
        },
        scaleLabels: {
          1: 'No need at all',
          2: 'Limited need',
          3: 'Moderate need',
          4: 'High need',
          5: 'Critical need'
        }
      },
      {
        id: 'generation-asset-management-need',
        type: 'scale',
        question: 'Is there a genuine need for AI/new data driven techniques in Generation Asset Management?',
        required: true,
        scaleRange: { 
          min: 1, 
          max: 5, 
          labels: { 
            min: 'No need at all', 
            max: 'Critical need' 
          }
        },
        scaleLabels: {
          1: 'No need at all',
          2: 'Limited need',
          3: 'Moderate need',
          4: 'High need',
          5: 'Critical need'
        }
      },
      {
        id: 'generation-energy-storage-need',
        type: 'scale',
        question: 'Is there a genuine need for AI/new data driven techniques in Energy Storage Control?',
        required: true,
        scaleRange: { 
          min: 1, 
          max: 5, 
          labels: { 
            min: 'No need at all', 
            max: 'Critical need' 
          }
        },
        scaleLabels: {
          1: 'No need at all',
          2: 'Limited need',
          3: 'Moderate need',
          4: 'High need',
          5: 'Critical need'
        }
      },
      {
        id: 'generation-ml-integration-practice',
        type: 'scale',
        question: 'What level of ML integration have you seen in practice in Generation operations?',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'No ML in this area', 
            max: 'Full ML integration' 
          }
        },
        scaleLabels: {
          0: 'No ML in this area',
          1: 'ML for basic forecasting and recommendations',
          2: 'ML for operational decision support',
          3: 'ML for automated scheduling with human oversight',
          4: 'ML for autonomous generation control',
          5: 'Full ML integration with predictive maintenance and optimization'
        }
      },
      {
        id: 'generation-ml-integration-development',
        type: 'scale',
        question: 'What level of ML integration have you seen being considered/in development in Generation operations?',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'No ML being considered', 
            max: 'Full ML integration in development' 
          }
        },
        scaleLabels: {
          0: 'No ML being considered',
          1: 'Exploring ML for forecasting improvements',
          2: 'Developing ML decision support systems',
          3: 'Testing automated ML scheduling systems',
          4: 'Piloting autonomous ML control systems',
          5: 'Full predictive and autonomous ML systems in development'
        }
      },
      // Shared open-ended questions
      {
        id: 'integration-barriers',
        type: 'textarea',
        question: 'If there are any barriers to further integrating ML into Generation operations, please add those here:',
        required: false
      },
      {
        id: 'ai-priority-areas',
        type: 'textarea',
        question: 'Where should we prioritize AI integration in power systems?',
        required: false
      },
      {
        id: 'best-opportunity',
        type: 'textarea',
        question: 'From your perspective, what do you believe is the best opportunity that ML and AI technologies can provide for the power sector?',
        required: false
      },
      {
        id: 'greatest-concern',
        type: 'textarea',
        question: 'What is your greatest concern regarding the adoption of ML in this safety-critical domain?',
        required: false
      },
      {
        id: 'business-case',
        type: 'textarea',
        question: 'What are the key elements of a compelling business case for adopting ML in grid operation that might resonate with leadership or management?',
        required: false
      }
    ]
  },
  {
    id: 'load-demand',
    name: 'Load & Demand Side Survey',
    description: 'Survey focused on AI/ML applications in Load and Demand Side management',
    condition: (respondent: Respondent) => 
      respondent.tasks.some(task => task.includes('Load (Demand side)')),
    questions: [
      // Shared questions across all templates
      {
        id: 'ai-experience-level',
        type: 'scale',
        question: 'Describe your experience with AI',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'I never used AI', 
            max: 'AI researcher/developer' 
          }
        },
        scaleLabels: {
          0: 'I never used AI',
          1: 'I use it as a generic tool for non grid tasks, like ChatGPT, gemini, etc',
          2: 'I have an understanding of how AI works, but without hands on experience',
          3: 'I used AI and ML models off the shelf or packages',
          4: 'I use AI model in my work',
          5: 'AI researcher/developer'
        }
      },
      // Load/Demand-specific questions - PLACEHOLDER
      {
        id: 'load-demand-forecasting-need',
        type: 'scale',
        question: 'Is there a genuine need for AI/new data driven techniques in Load Forecasting?',
        required: true,
        scaleRange: { 
          min: 1, 
          max: 5, 
          labels: { 
            min: 'No need at all', 
            max: 'Critical need' 
          }
        },
        scaleLabels: {
          1: 'No need at all',
          2: 'Limited need',
          3: 'Moderate need',
          4: 'High need',
          5: 'Critical need'
        }
      },
      {
        id: 'load-demand-response-need',
        type: 'scale',
        question: 'Is there a genuine need for AI/new data driven techniques in Demand Response?',
        required: true,
        scaleRange: { 
          min: 1, 
          max: 5, 
          labels: { 
            min: 'No need at all', 
            max: 'Critical need' 
          }
        },
        scaleLabels: {
          1: 'No need at all',
          2: 'Limited need',
          3: 'Moderate need',
          4: 'High need',
          5: 'Critical need'
        }
      },
      {
        id: 'load-demand-ml-integration-practice',
        type: 'scale',
        question: 'What level of ML integration have you seen in practice in Load/Demand operations?',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'No ML in this area', 
            max: 'Full ML integration' 
          }
        },
        scaleLabels: {
          0: 'No ML in this area',
          1: 'ML for basic load forecasting',
          2: 'ML for demand response recommendations',
          3: 'ML for automated demand management',
          4: 'ML for autonomous load control',
          5: 'Full ML integration with predictive demand optimization'
        }
      },
      {
        id: 'load-demand-ml-integration-development',
        type: 'scale',
        question: 'What level of ML integration have you seen being considered/in development in Load/Demand operations?',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'No ML being considered', 
            max: 'Full ML integration in development' 
          }
        },
        scaleLabels: {
          0: 'No ML being considered',
          1: 'Exploring ML for improved forecasting',
          2: 'Developing ML demand response systems',
          3: 'Testing automated ML demand management',
          4: 'Piloting autonomous ML load control',
          5: 'Full predictive ML demand optimization in development'
        }
      },
      // Shared open-ended questions
      {
        id: 'integration-barriers',
        type: 'textarea',
        question: 'If there are any barriers to further integrating ML into Load/Demand operations, please add those here:',
        required: false
      },
      {
        id: 'ai-priority-areas',
        type: 'textarea',
        question: 'Where should we prioritize AI integration in power systems?',
        required: false
      },
      {
        id: 'best-opportunity',
        type: 'textarea',
        question: 'From your perspective, what do you believe is the best opportunity that ML and AI technologies can provide for the power sector?',
        required: false
      },
      {
        id: 'greatest-concern',
        type: 'textarea',
        question: 'What is your greatest concern regarding the adoption of ML in this safety-critical domain?',
        required: false
      },
      {
        id: 'business-case',
        type: 'textarea',
        question: 'What are the key elements of a compelling business case for adopting ML in grid operation that might resonate with leadership or management?',
        required: false
      }
    ]
  },
  {
    id: 'markets',
    name: 'Markets Survey',
    description: 'Survey focused on AI/ML applications in Power Markets operations',
    condition: (respondent: Respondent) => 
      respondent.tasks.some(task => task.includes('Markets')),
    questions: [
      // Shared questions across all templates
      {
        id: 'ai-experience-level',
        type: 'scale',
        question: 'Describe your experience with AI',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'I never used AI', 
            max: 'AI researcher/developer' 
          }
        },
        scaleLabels: {
          0: 'I never used AI',
          1: 'I use it as a generic tool for non grid tasks, like ChatGPT, gemini, etc',
          2: 'I have an understanding of how AI works, but without hands on experience',
          3: 'I used AI and ML models off the shelf or packages',
          4: 'I use AI model in my work',
          5: 'AI researcher/developer'
        }
      },
      // Markets-specific questions - PLACEHOLDER
      {
        id: 'markets-bidding-need',
        type: 'scale',
        question: 'Is there a genuine need for AI/new data driven techniques in Market Bidding Strategy?',
        required: true,
        scaleRange: { 
          min: 1, 
          max: 5, 
          labels: { 
            min: 'No need at all', 
            max: 'Critical need' 
          }
        },
        scaleLabels: {
          1: 'No need at all',
          2: 'Limited need',
          3: 'Moderate need',
          4: 'High need',
          5: 'Critical need'
        }
      },
      {
        id: 'markets-congestion-need',
        type: 'scale',
        question: 'Is there a genuine need for AI/new data driven techniques in Line Congestion Management?',
        required: true,
        scaleRange: { 
          min: 1, 
          max: 5, 
          labels: { 
            min: 'No need at all', 
            max: 'Critical need' 
          }
        },
        scaleLabels: {
          1: 'No need at all',
          2: 'Limited need',
          3: 'Moderate need',
          4: 'High need',
          5: 'Critical need'
        }
      },
      {
        id: 'markets-ml-integration-practice',
        type: 'scale',
        question: 'What level of ML integration have you seen in practice in Markets operations?',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'No ML in this area', 
            max: 'Full ML integration' 
          }
        },
        scaleLabels: {
          0: 'No ML in this area',
          1: 'ML for basic market analysis and insights',
          2: 'ML for bidding recommendations',
          3: 'ML for automated bidding with oversight',
          4: 'ML for autonomous market participation',
          5: 'Full ML integration with predictive market optimization'
        }
      },
      {
        id: 'markets-ml-integration-development',
        type: 'scale',
        question: 'What level of ML integration have you seen being considered/in development in Markets operations?',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'No ML being considered', 
            max: 'Full ML integration in development' 
          }
        },
        scaleLabels: {
          0: 'No ML being considered',
          1: 'Exploring ML for market analysis',
          2: 'Developing ML bidding support systems',
          3: 'Testing automated ML bidding systems',
          4: 'Piloting autonomous ML market participation',
          5: 'Full predictive ML market optimization in development'
        }
      },
      // Shared open-ended questions
      {
        id: 'integration-barriers',
        type: 'textarea',
        question: 'If there are any barriers to further integrating ML into Markets operations, please add those here:',
        required: false
      },
      {
        id: 'ai-priority-areas',
        type: 'textarea',
        question: 'Where should we prioritize AI integration in power systems?',
        required: false
      },
      {
        id: 'best-opportunity',
        type: 'textarea',
        question: 'From your perspective, what do you believe is the best opportunity that ML and AI technologies can provide for the power sector?',
        required: false
      },
      {
        id: 'greatest-concern',
        type: 'textarea',
        question: 'What is your greatest concern regarding the adoption of ML in this safety-critical domain?',
        required: false
      },
      {
        id: 'business-case',
        type: 'textarea',
        question: 'What are the key elements of a compelling business case for adopting ML in grid operation that might resonate with leadership or management?',
        required: false
      }
    ]
  },
  {
    id: 'distribution',
    name: 'Distribution Systems Survey',
    description: 'Survey focused on AI/ML applications in Distribution systems operations',
    condition: (respondent: Respondent) => 
      respondent.tasks.some(task => task.includes('Distribution')),
    questions: [
      // Shared questions across all templates
      {
        id: 'ai-experience-level',
        type: 'scale',
        question: 'Describe your experience with AI',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'I never used AI', 
            max: 'AI researcher/developer' 
          }
        },
        scaleLabels: {
          0: 'I never used AI',
          1: 'I use it as a generic tool for non grid tasks, like ChatGPT, gemini, etc',
          2: 'I have an understanding of how AI works, but without hands on experience',
          3: 'I used AI and ML models off the shelf or packages',
          4: 'I use AI model in my work',
          5: 'AI researcher/developer'
        }
      },
      // Distribution-specific questions - PLACEHOLDER
      {
        id: 'distribution-fault-detection-need',
        type: 'scale',
        question: 'Is there a genuine need for AI/new data driven techniques in Fault Detection?',
        required: true,
        scaleRange: { 
          min: 1, 
          max: 5, 
          labels: { 
            min: 'No need at all', 
            max: 'Critical need' 
          }
        },
        scaleLabels: {
          1: 'No need at all',
          2: 'Limited need',
          3: 'Moderate need',
          4: 'High need',
          5: 'Critical need'
        }
      },
      {
        id: 'distribution-asset-management-need',
        type: 'scale',
        question: 'Is there a genuine need for AI/new data driven techniques in Distribution Asset Management?',
        required: true,
        scaleRange: { 
          min: 1, 
          max: 5, 
          labels: { 
            min: 'No need at all', 
            max: 'Critical need' 
          }
        },
        scaleLabels: {
          1: 'No need at all',
          2: 'Limited need',
          3: 'Moderate need',
          4: 'High need',
          5: 'Critical need'
        }
      },
      {
        id: 'distribution-ml-integration-practice',
        type: 'scale',
        question: 'What level of ML integration have you seen in practice in Distribution operations?',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'No ML in this area', 
            max: 'Full ML integration' 
          }
        },
        scaleLabels: {
          0: 'No ML in this area',
          1: 'ML for basic monitoring and alerts',
          2: 'ML for fault prediction and maintenance scheduling',
          3: 'ML for automated switching and restoration',
          4: 'ML for autonomous distribution control',
          5: 'Full ML integration with predictive grid optimization'
        }
      },
      {
        id: 'distribution-ml-integration-development',
        type: 'scale',
        question: 'What level of ML integration have you seen being considered/in development in Distribution operations?',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'No ML being considered', 
            max: 'Full ML integration in development' 
          }
        },
        scaleLabels: {
          0: 'No ML being considered',
          1: 'Exploring ML for improved monitoring',
          2: 'Developing ML predictive maintenance systems',
          3: 'Testing automated ML switching systems',
          4: 'Piloting autonomous ML distribution control',
          5: 'Full predictive ML grid optimization in development'
        }
      },
      // Shared open-ended questions
      {
        id: 'integration-barriers',
        type: 'textarea',
        question: 'If there are any barriers to further integrating ML into Distribution operations, please add those here:',
        required: false
      },
      {
        id: 'ai-priority-areas',
        type: 'textarea',
        question: 'Where should we prioritize AI integration in power systems?',
        required: false
      },
      {
        id: 'best-opportunity',
        type: 'textarea',
        question: 'From your perspective, what do you believe is the best opportunity that ML and AI technologies can provide for the power sector?',
        required: false
      },
      {
        id: 'greatest-concern',
        type: 'textarea',
        question: 'What is your greatest concern regarding the adoption of ML in this safety-critical domain?',
        required: false
      },
      {
        id: 'business-case',
        type: 'textarea',
        question: 'What are the key elements of a compelling business case for adopting ML in grid operation that might resonate with leadership or management?',
        required: false
      }
    ]
  },
  {
    id: 'transmission-opf',
    name: 'Transmission Operations - Optimal Power Flow',
    description: 'Survey focused on AI/ML applications in Optimal Power Flow for transmission operations',
    condition: (respondent: Respondent) => 
      respondent.tasks.some(task => task.includes('Transmission > Operation > Optimal Power flow')),
    questions: [
      // Shared questions
      {
        id: 'ai-experience-level',
        type: 'scale',
        question: 'Describe your experience with AI',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'I never used AI', 
            max: 'AI researcher/developer' 
          }
        },
        scaleLabels: {
          0: 'I never used AI',
          1: 'I use it as a generic tool for non grid tasks, like ChatGPT, gemini, etc',
          2: 'I have an understanding of how AI works, but without hands on experience',
          3: 'I used AI and ML models off the shelf or packages',
          4: 'I use AI model in my work',
          5: 'AI researcher/developer'
        }
      },
      {
        id: 'genuine-need',
        type: 'scale',
        question: 'Is there a genuine need for AI/new data driven techniques in Optimal Power Flow?',
        required: true,
        scaleRange: { 
          min: 1, 
          max: 5, 
          labels: { 
            min: 'No need at all', 
            max: 'Critical need' 
          }
        },
        scaleLabels: {
          1: 'No need at all',
          2: 'Limited need',
          3: 'Moderate need',
          4: 'High need',
          5: 'Critical need'
        }
      },
      {
        id: 'ml-integration-practice',
        type: 'scale',
        question: 'What level of ML integration have you seen in practice in Optimal Power Flow operations?',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'No ML in this task', 
            max: 'Full ML integration' 
          }
        },
        scaleLabels: {
          0: 'No ML in this task',
          1: 'See if system is feasible and will work',
          2: 'ML solves the optimal setpoints, which are used as a recommendation (i.e, starting point)',
          3: 'ML solves optimal setpoints, which are validated by existing software',
          4: 'ML solves optimal setpoints, which are dispatched to generators',
          5: 'ML solves optimal setpoints which are dispatched to generators. The model is aware of system constraints'
        }
      },
      {
        id: 'ml-integration-development',
        type: 'scale',
        question: 'What level of ML integration have you seen being considered/in development in Optimal Power Flow operations (not yet deployed)?',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'No ML being considered', 
            max: 'Full ML integration in development' 
          }
        },
        scaleLabels: {
          0: 'No ML being considered',
          1: 'Exploring feasibility studies',
          2: 'ML for recommendations/starting points in development',
          3: 'ML with validation systems in development',
          4: 'ML for direct dispatch in development',
          5: 'Full constraint-aware ML systems in development'
        }
      },
      // Shared open-ended questions
      {
        id: 'integration-barriers',
        type: 'textarea',
        question: 'If there are any barriers to further integrating ML into Optimal Power Flow operations, please add those here:',
        required: false
      },
      {
        id: 'ai-priority-areas',
        type: 'textarea',
        question: 'Where should we prioritize AI integration in power systems?',
        required: false
      },
      {
        id: 'best-opportunity',
        type: 'textarea',
        question: 'From your perspective, what do you believe is the best opportunity that ML and AI technologies can provide for the power sector?',
        required: false
      },
      {
        id: 'greatest-concern',
        type: 'textarea',
        question: 'What is your greatest concern regarding the adoption of ML in this safety-critical domain?',
        required: false
      },
      {
        id: 'business-case',
        type: 'textarea',
        question: 'What are the key elements of a compelling business case for adopting ML in grid operation that might resonate with leadership or management?',
        required: false
      }
    ]
  },
  {
    id: 'general-power-systems',
    name: 'General Power Systems',
    description: 'General survey for power systems professionals',
    condition: () => true, // Fallback template
    questions: [
      // Shared questions
      {
        id: 'ai-experience-level',
        type: 'scale',
        question: 'Describe your experience with AI',
        required: true,
        scaleRange: { 
          min: 0, 
          max: 5, 
          labels: { 
            min: 'I never used AI', 
            max: 'AI researcher/developer' 
          }
        },
        scaleLabels: {
          0: 'I never used AI',
          1: 'I use it as a generic tool for non grid tasks, like ChatGPT, gemini, etc',
          2: 'I have an understanding of how AI works, but without hands on experience',
          3: 'I used AI and ML models off the shelf or packages',
          4: 'I use AI model in my work',
          5: 'AI researcher/developer'
        }
      },
      {
        id: 'ai-general-awareness',
        type: 'scale',
        question: 'How familiar are you with AI applications in power systems?',
        required: true,
        scaleRange: { min: 1, max: 5, labels: { min: 'Not familiar', max: 'Very familiar' } }
      },
      {
        id: 'ai-priority-areas',
        type: 'checkbox',
        question: 'Which areas should prioritize AI integration in power systems?',
        options: ['Grid operations', 'Renewable integration', 'Asset management', 'Cybersecurity', 'Market operations', 'Customer services'],
        required: true
      },
      {
        id: 'implementation-timeline',
        type: 'radio',
        question: 'What timeline do you expect for widespread AI adoption in power systems?',
        options: ['Already happening', '2-5 years', '5-10 years', '10+ years', 'Unlikely to happen'],
        required: true
      },
      {
        id: 'general-concerns',
        type: 'textarea',
        question: 'What are your main concerns or expectations about AI in power systems?',
        required: true
      }
    ]
  }
];