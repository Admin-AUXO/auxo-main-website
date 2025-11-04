export interface FormStep {
  title: string;
  subtitle: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  label: string;
  placeholder?: string;
  required: boolean;
  type: string;
  options?: string[];
}

export const multiStepFormContent = {
  step1: {
    title: "Let's start a conversation",
    subtitle: 'Tell us about yourself and your company',
    fields: [
      { id: 'name', label: 'Full Name *', placeholder: 'John Smith', required: true, type: 'text' },
      { id: 'email', label: 'Work Email *', placeholder: 'john@company.com', required: true, type: 'email' },
      { id: 'company', label: 'Company Name *', placeholder: 'Acme Corporation', required: true, type: 'text' },
      { id: 'phone', label: 'Phone Number (Optional)', placeholder: '+971 50 123 4567', required: false, type: 'tel' },
      { id: 'whyReachingOut', label: 'Why are you reaching out? (Optional)', placeholder: '', required: false, type: 'select', options: ['I have an immediate need', 'Planning for next quarter', 'Just exploring options', 'Want to learn more'] },
      { id: 'preferredContact', label: 'How would you prefer we reach out? (Optional)', placeholder: '', required: false, type: 'select', options: ['Email', 'Phone call', 'Video call', 'No preference'] },
      { id: 'urgencyLevel', label: 'When do you need to make a decision? (Optional)', placeholder: '', required: false, type: 'select', options: ['This week', 'This month', 'Next quarter', 'Just exploring'] },
    ],
  },
  step2: {
    title: 'About your organization',
    subtitle: 'Help us understand your company better',
  },
  step3: {
    title: 'Your analytics challenges',
    subtitle: 'Tell us what you\'re looking to achieve',
  },
  step4: {
    title: 'Almost there!',
    subtitle: 'Review your information and submit',
  },
  validation: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
    genericError: 'Please check your input and try again',
  },
  navigation: {
    back: '← Back',
    next: 'Next Step →',
    submit: 'Submit Request',
    submitting: 'Submitting...',
  },
};

