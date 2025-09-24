import React, { useState } from 'react';
import { Send, UserPlus, CheckCircle } from 'lucide-react';

interface ReferralFormProps {
  onComplete: () => void;
  onSkip: () => void;
}

const ReferralForm: React.FC<ReferralFormProps> = ({ onComplete, onSkip }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const defaultMessage = `Hi there!

I just completed a research survey about AI integration in power systems from the University of Colorado Boulder, and I thought you might be interested in participating as well.

The survey takes about 10-15 minutes and contributes to important research on the future of AI in power systems operations. Your expertise would be valuable to this research initiative.

You can access the survey here: ${window.location.origin}

Best regards!`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create mailto link with pre-filled content
      const subject = encodeURIComponent('AI in Power Systems Survey - Research Participation Invitation');
      const body = encodeURIComponent(message || defaultMessage);
      const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
      
      // Open email client
      window.open(mailtoLink, '_blank');
      
      setIsSubmitted(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (error) {
      console.error('Error creating referral:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Thank You for Sharing!
        </h2>
        <p className="text-gray-600 mb-6">
          Your email client should have opened with a pre-filled message. 
          Thank you for helping us reach more power systems professionals!
        </p>
        <div className="text-sm text-gray-500">
          Redirecting to final thank you page...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <UserPlus className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Help Us Reach More Professionals
        </h2>
        <div className="w-20 h-1 bg-yellow-600 mx-auto mb-4"></div>
        <p className="text-gray-600">
          Do you know someone else in the power systems field who might be interested in participating in this research?
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
        <p className="text-blue-800 text-sm">
          <strong>Optional:</strong> Share this survey with a colleague or peer who works in power systems. 
          We'll open your email client with a pre-written message that you can customize and send.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Colleague's Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="colleague@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Their Name (optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Colleague's name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Message (optional - we've provided a default message)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            placeholder={defaultMessage}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave blank to use our default invitation message
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center space-x-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            <Send size={16} />
            <span>{isSubmitting ? 'Opening Email...' : 'Send Invitation'}</span>
          </button>
          
          <button
            type="button"
            onClick={onSkip}
            className="flex items-center justify-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Skip This Step</span>
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          This will open your default email application with a pre-filled message. 
          You can edit the message before sending.
        </p>
      </div>
    </div>
  );
};

export default ReferralForm;