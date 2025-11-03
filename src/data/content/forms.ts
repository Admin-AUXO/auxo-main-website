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
    title: "Let's get to know you",
    subtitle: 'Tell us about yourself and your company',
    fields: [
      { id: 'name', label: 'Full Name *', placeholder: 'John Smith', required: true, type: 'text' },
      { id: 'email', label: 'Work Email *', placeholder: 'john@company.com', required: true, type: 'email' },
      { id: 'company', label: 'Company Name *', placeholder: 'Acme Corporation', required: true, type: 'text' },
      { id: 'phone', label: 'Phone Number (Optional)', placeholder: '+971 50 123 4567', required: false, type: 'tel' },
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

