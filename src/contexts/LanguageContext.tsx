
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.symptoms': 'Symptoms',
    'nav.image': 'Image Diagnosis',
    'nav.brand': 'AI Diagnosis',

    // Hero Section
    'hero.title': 'AI Diagnosis',
    'hero.subtitle': 'Get instant medical insights powered by advanced AI. Upload symptoms or images for quick, accurate diagnosis recommendations.',
    'hero.startDiagnosis': 'Start Diagnosis',
    'hero.learnMore': 'Learn More',

    // About Section
    'about.title': 'Why Choose AI Diagnosis?',
    'about.subtitle': 'Experience the future of healthcare with our cutting-edge AI technology that provides reliable, fast, and accessible medical insights.',
    'about.aiPowered': 'AI-Powered Analysis',
    'about.aiPoweredDesc': 'Advanced machine learning algorithms analyze your symptoms and images for accurate diagnosis suggestions.',
    'about.privacyFirst': 'Privacy First',
    'about.privacyFirstDesc': 'Your medical data is encrypted and never stored. We prioritize your privacy and confidentiality.',
    'about.instantResults': 'Instant Results',
    'about.instantResultsDesc': 'Get preliminary diagnosis within seconds, helping you make informed healthcare decisions quickly.',
    'about.expertBacked': 'Expert Backed',
    'about.expertBackedDesc': 'Our AI is trained on medical data reviewed by healthcare professionals and medical experts.',

    // Symptom Diagnosis
    'symptoms.title': 'Describe Your Symptoms',
    'symptoms.subtitle': 'Tell us about what you\'re experiencing, and our AI will provide insights and recommendations.',
    'symptoms.label': 'What symptoms are you experiencing?',
    'symptoms.placeholder': 'Describe your symptoms in detail... (e.g., headache, fever, cough, fatigue)',
    'symptoms.analyzing': 'Analyzing...',
    'symptoms.getDiagnosis': 'Get AI Diagnosis',
    'symptoms.reportTitle': 'AI Diagnosis Report',
    'symptoms.disclaimer': 'This AI analysis is for informational purposes only and should not replace professional medical advice, diagnosis, or treatment.',

    // Image Diagnosis
    'image.title': 'Upload Medical Image',
    'image.subtitle': 'Upload a photo of your concern and get AI-powered visual analysis and recommendations.',
    'image.uploadTitle': 'Upload Medical Image',
    'image.uploadDesc': 'Drag and drop your image here, or click to browse',
    'image.chooseImage': 'Choose Image',
    'image.analyzingImage': 'Analyzing Image...',
    'image.analyzeImage': 'Analyze Image',
    'image.reportTitle': 'AI Image Analysis Report',
    'image.disclaimer': 'Medical Disclaimer: This AI image analysis is for educational purposes only. Always consult qualified medical professionals for proper diagnosis and treatment. Do not use this tool for emergency medical situations.',

    // Footer
    'footer.description': 'Revolutionizing healthcare with AI-powered diagnosis. Get instant medical insights and recommendations from the comfort of your home.',
    'footer.madeWithCare': 'Made with care for better healthcare',
    'footer.features': 'Features',
    'footer.symptomAnalysis': 'Symptom Analysis',
    'footer.imageDiagnosis': 'Image Diagnosis',
    'footer.aiPrescriptions': 'AI Prescriptions',
    'footer.important': 'Important',
    'footer.preliminaryAnalysis': 'This AI tool provides preliminary analysis only.',
    'footer.consultProfessionals': 'Always consult healthcare professionals for medical decisions.',
    'footer.notForEmergency': 'Not for emergency situations.',
    'footer.copyright': '© 2024 AI Diagnosis. All rights reserved.',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.contact': 'Contact',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.symptoms': 'लक्षण',
    'nav.image': 'इमेज डायग्नोसिस',
    'nav.brand': 'AI डायग्नोसिस',

    // Hero Section
    'hero.title': 'AI डायग्नोसिस',
    'hero.subtitle': 'उन्नत AI द्वारा संचालित तत्काल चिकित्सा अंतर्दृष्टि प्राप्त करें। त्वरित, सटीक निदान सिफारिशों के लिए लक्षण या छवियां अपलोड करें।',
    'hero.startDiagnosis': 'निदान शुरू करें',
    'hero.learnMore': 'और जानें',

    // About Section
    'about.title': 'AI डायग्नोसिस क्यों चुनें?',
    'about.subtitle': 'हमारी अत्याधुनिक AI तकनीक के साथ स्वास्थ्य सेवा के भविष्य का अनुभव करें जो विश्वसनीय, तेज़ और सुलभ चिकित्सा अंतर्दृष्टि प्रदान करती है।',
    'about.aiPowered': 'AI-संचालित विश्लेषण',
    'about.aiPoweredDesc': 'उन्नत मशीन लर्निंग एल्गोरिदम सटीक निदान सुझावों के लिए आपके लक्षणों और छवियों का विश्लेषण करते हैं।',
    'about.privacyFirst': 'गोपनीयता प्राथमिकता',
    'about.privacyFirstDesc': 'आपका चिकित्सा डेटा एन्क्रिप्टेड है और कभी संग्रहीत नहीं होता। हम आपकी गोपनीयता और गुप्तता को प्राथमिकता देते हैं।',
    'about.instantResults': 'तत्काल परिणाम',
    'about.instantResultsDesc': 'सेकंडों में प्रारंभिक निदान प्राप्त करें, जो आपको तेज़ी से सूचित स्वास्थ्य निर्णय लेने में मदद करता है।',
    'about.expertBacked': 'विशेषज्ञ समर्थित',
    'about.expertBackedDesc': 'हमारा AI स्वास्थ्य पेशेवरों और चिकित्सा विशेषज्ञों द्वारा समीक्षित चिकित्सा डेटा पर प्रशिक्षित है।',

    // Symptom Diagnosis
    'symptoms.title': 'अपने लक्षणों का वर्णन करें',
    'symptoms.subtitle': 'हमें अपने अनुभव के बारे में बताएं, और हमारा AI अंतर्दृष्टि और सिफारिशें प्रदान करेगा।',
    'symptoms.label': 'आप किन लक्षणों का अनुभव कर रहे हैं?',
    'symptoms.placeholder': 'अपने लक्षणों का विस्तार से वर्णन करें... (जैसे, सिरदर्द, बुखार, खांसी, थकान)',
    'symptoms.analyzing': 'विश्लेषण कर रहे हैं...',
    'symptoms.getDiagnosis': 'AI निदान प्राप्त करें',
    'symptoms.reportTitle': 'AI निदान रिपोर्ट',
    'symptoms.disclaimer': 'यह AI विश्लेषण केवल सूचनात्मक उद्देश्यों के लिए है और पेशेवर चिकित्सा सलाह, निदान या उपचार का स्थान नहीं लेना चाहिए।',

    // Image Diagnosis
    'image.title': 'मेडिकल इमेज अपलोड करें',
    'image.subtitle': 'अपनी चिंता की एक तस्वीर अपलोड करें और AI-संचालित दृश्य विश्लेषण और सिफारिशें प्राप्त करें।',
    'image.uploadTitle': 'मेडिकल इमेज अपलोड करें',
    'image.uploadDesc': 'अपनी छवि को यहाँ खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें',
    'image.chooseImage': 'छवि चुनें',
    'image.analyzingImage': 'छवि का विश्लेषण कर रहे हैं...',
    'image.analyzeImage': 'छवि का विश्लेषण करें',
    'image.reportTitle': 'AI छवि विश्लेषण रिपोर्ट',
    'image.disclaimer': 'चिकित्सा अस्वीकरण: यह AI छवि विश्लेषण केवल शैक्षिक उद्देश्यों के लिए है। उचित निदान और उपचार के लिए हमेशा योग्य चिकित्सा पेशेवरों से सलाह लें। आपातकालीन चिकित्सा स्थिति के लिए इस उपकरण का उपयोग न करें।',

    // Footer
    'footer.description': 'AI-संचालित निदान के साथ स्वास्थ्य सेवा में क्रांति। अपने घर के आराम से तत्काल चिकित्सा अंतर्दृष्टि और सिफारिशें प्राप्त करें।',
    'footer.madeWithCare': 'बेहतर स्वास्थ्य सेवा के लिए देखभाल के साथ बनाया गया',
    'footer.features': 'विशेषताएं',
    'footer.symptomAnalysis': 'लक्षण विश्लेषण',
    'footer.imageDiagnosis': 'छवि निदान',
    'footer.aiPrescriptions': 'AI प्रिस्क्रिप्शन',
    'footer.important': 'महत्वपूर्ण',
    'footer.preliminaryAnalysis': 'यह AI उपकरण केवल प्रारंभिक विश्लेषण प्रदान करता है।',
    'footer.consultProfessionals': 'चिकित्सा निर्णयों के लिए हमेशा स्वास्थ्य पेशेवरों से सलाह लें।',
    'footer.notForEmergency': 'आपातकालीन स्थितियों के लिए नहीं।',
    'footer.copyright': '© 2024 AI डायग्नोसिस। सभी अधिकार सुरक्षित।',
    'footer.privacyPolicy': 'गोपनीयता नीति',
    'footer.termsOfService': 'सेवा की शर्तें',
    'footer.contact': 'संपर्क',
  },
};
