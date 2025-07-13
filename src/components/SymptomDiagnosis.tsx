
import { useState, useEffect, useCallback } from 'react';
import { Send, Loader, FileText, AlertCircle, Brain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export const SymptomDiagnosis = () => {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRealTimeAnalyzing, setIsRealTimeAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [realTimeSuggestions, setRealTimeSuggestions] = useState('');
  const { t } = useLanguage();
  const { toast } = useToast();

  // Debounced real-time analysis
  const performRealTimeAnalysis = useCallback(
    async (symptomText: string) => {
      if (!symptomText.trim() || symptomText.length < 10) {
        setRealTimeSuggestions('');
        return;
      }

      setIsRealTimeAnalyzing(true);
      
      // Simulate real-time AI analysis
      setTimeout(() => {
        const suggestions = generateRealTimeSuggestions(symptomText);
        setRealTimeSuggestions(suggestions);
        setIsRealTimeAnalyzing(false);
      }, 800);
    },
    []
  );

  // Debounce effect for real-time analysis
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performRealTimeAnalysis(symptoms);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [symptoms, performRealTimeAnalysis]);

  const generateRealTimeSuggestions = (symptomText: string): string => {
    const symptoms = symptomText.toLowerCase();
    
    if (symptoms.includes('headache') || symptoms.includes('head pain')) {
      return `**Quick Insights:**
• Possible tension headache detected
• Consider hydration and rest
• Monitor for additional symptoms`;
    }
    
    if (symptoms.includes('fever') || symptoms.includes('temperature')) {
      return `**Quick Insights:**
• Fever symptoms detected
• Stay hydrated and rest
• Monitor temperature regularly`;
    }
    
    if (symptoms.includes('cough') || symptoms.includes('throat')) {
      return `**Quick Insights:**
• Respiratory symptoms detected
• Consider throat lozenges
• Monitor for breathing difficulties`;
    }
    
    if (symptoms.includes('stomach') || symptoms.includes('nausea')) {
      return `**Quick Insights:**
• Digestive symptoms detected
• Stay hydrated with clear fluids
• Consider bland foods`;
    }
    
    return `**Quick Insights:**
• Analyzing your symptoms...
• Consider rest and hydration
• Monitor symptom progression`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsLoading(true);
    
    try {
      // Simulate comprehensive AI diagnosis
      setTimeout(() => {
        const mockDiagnosis = `**Comprehensive AI Diagnosis Report**

**Symptoms Analysis:**
"${symptoms}"

**AI Assessment:**
• Primary concern: Based on symptom pattern analysis
• Severity level: Moderate attention recommended
• Confidence score: 85%

**Possible Conditions:**
• Common viral infection (high probability - 70%)
• Seasonal allergies (moderate probability - 20%)
• Stress-related symptoms (low probability - 10%)

**Immediate Recommendations:**
• Rest and adequate hydration (8-10 glasses water daily)
• Over-the-counter pain relief if needed
• Monitor symptoms for 24-48 hours
• Seek medical attention if symptoms worsen

**Prescription Suggestions:**
• Acetaminophen 500mg every 6 hours for pain/fever
• Throat lozenges for sore throat relief
• Nasal decongestant if congestion present
• Vitamin C supplement to support immune system

**Follow-up Actions:**
• Schedule medical consultation if no improvement in 3 days
• Emergency care if difficulty breathing or high fever (>101.5°F)
• Keep symptom diary for medical reference

⚠️ **Medical Disclaimer:** This AI analysis is for informational purposes only. Always consult with qualified healthcare professionals for proper medical diagnosis and treatment.`;

        setDiagnosis(mockDiagnosis);
        setIsLoading(false);
        toast({
          title: "Analysis Complete",
          description: "Your comprehensive diagnosis report is ready.",
        });
      }, 2500);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze symptoms. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50" id="symptoms">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('symptoms.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('symptoms.subtitle')}
          </p>
          <div className="mt-4 flex items-center justify-center text-sm text-blue-600">
            <Brain className="h-4 w-4 mr-2" />
            <span>Real-time AI analysis as you type</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in border border-blue-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="symptoms" className="block text-lg font-semibold text-gray-900 mb-4">
                  {t('symptoms.label')}
                </label>
                <div className="relative">
                  <textarea
                    id="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder={t('symptoms.placeholder')}
                    className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none text-gray-700"
                    required
                  />
                  {isRealTimeAnalyzing && (
                    <div className="absolute top-2 right-2">
                      <Loader className="h-4 w-4 animate-spin text-blue-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Real-time suggestions */}
              {realTimeSuggestions && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 animate-fade-in">
                  <div className="flex items-center mb-2">
                    <Brain className="h-4 w-4 text-blue-600 mr-2" />
                    <h4 className="text-sm font-semibold text-gray-900">Real-time AI Insights</h4>
                  </div>
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {realTimeSuggestions}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !symptoms.trim()}
                className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover-scale"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    {t('symptoms.analyzing')}
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    {t('symptoms.getDiagnosis')}
                  </span>
                )}
              </button>
            </form>

            {diagnosis && (
              <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-2 border-green-200 animate-fade-in">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">{t('symptoms.reportTitle')}</h3>
                </div>
                
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {diagnosis}
                </div>
                
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-800 text-sm">
                    {t('symptoms.disclaimer')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
