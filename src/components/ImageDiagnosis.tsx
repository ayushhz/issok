
import { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Loader, FileText, AlertCircle, X, Eye, Brain } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export const ImageDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRealTimeAnalyzing, setIsRealTimeAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');
  const [quickAnalysis, setQuickAnalysis] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  // Real-time image analysis when image is selected
  useEffect(() => {
    if (selectedImage && imagePreview) {
      performQuickAnalysis();
    }
  }, [selectedImage, imagePreview]);

  const performQuickAnalysis = async () => {
    setIsRealTimeAnalyzing(true);
    
    // Simulate real-time image analysis
    setTimeout(() => {
      const quickAnalysisResult = `**Quick AI Scan Results:**

🔍 **Visual Detection:**
• Image quality: Good for analysis
• Area of interest: Detected
• Clarity score: 85%

⚡ **Preliminary Findings:**
• Skin texture analysis: Normal variation
• Color pattern: Within typical range
• Size estimation: Measuring...

📊 **Confidence Level:** 78%
• Recommend full analysis for detailed report
• No immediate concerns detected
• Professional consultation advised for complete evaluation`;

      setQuickAnalysis(quickAnalysisResult);
      setIsRealTimeAnalyzing(false);
      
      toast({
        title: "Quick Scan Complete",
        description: "Initial analysis ready. Click analyze for detailed report.",
      });
    }, 2000);
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setDiagnosis('');
    setQuickAnalysis('');
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      handleImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      handleImageSelect(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    
    try {
      // Simulate comprehensive AI image analysis
      setTimeout(() => {
        const mockDiagnosis = `**Comprehensive AI Image Analysis Report**

**Image Information:**
• File: ${selectedImage.name}
• Size: ${(selectedImage.size / 1024).toFixed(1)} KB
• Analysis timestamp: ${new Date().toLocaleString()}

**Advanced AI Visual Analysis:**
• Deep learning model: MedVision Pro v3.2
• Analysis confidence: 92%
• Processing time: 2.3 seconds

**Detailed Findings:**
• **Skin Analysis:** Normal pigmentation patterns detected
• **Texture Assessment:** Smooth surface with typical variation
• **Color Mapping:** RGB values within healthy ranges
• **Size Measurements:** Approximately 5-7mm diameter
• **Shape Analysis:** Regular borders, no irregular patterns
• **Symmetry Check:** Bilateral symmetry maintained

**Clinical Observations:**
• **Morphology:** Consistent with benign characteristics
• **Vascularity:** Normal blood flow patterns
• **Inflammation:** No signs of acute inflammation
• **Scaling:** Minimal surface changes noted

**Risk Assessment:**
• **Malignancy Risk:** Low (15% probability)
• **Benign Probability:** High (85% probability)
• **Monitoring Recommendation:** Routine observation

**Recommended Actions:**
• **Immediate:** No urgent intervention required
• **Short-term:** Monitor for changes over 3-6 months
• **Long-term:** Annual dermatological screening
• **Photography:** Document for future comparison

**Professional Recommendations:**
• Dermatologist consultation within 2-3 months
• Biopsy consideration if changes occur
• Sun protection measures
• Self-examination monthly

**Treatment Suggestions:**
• Topical sunscreen SPF 30+ daily
• Moisturizing cream for skin health
• Antioxidant supplements (Vitamin C, E)
• Avoid excessive sun exposure

**Follow-up Protocol:**
• Clinical photography every 6 months
• Professional skin exam annually
• Immediate consultation if rapid changes
• Document any symptoms (itching, bleeding, pain)

⚠️ **Critical Disclaimer:** This AI analysis is for informational purposes only and cannot replace professional dermatological examination. Please consult a qualified dermatologist for accurate diagnosis, treatment recommendations, and proper medical care.`;

        setDiagnosis(mockDiagnosis);
        setIsLoading(false);
        
        toast({
          title: "Analysis Complete",
          description: "Comprehensive image analysis report is ready.",
        });
      }, 3500);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview('');
    setDiagnosis('');
    setQuickAnalysis('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="py-20 bg-white" id="image-diagnosis">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('image.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('image.subtitle')}
          </p>
          <div className="mt-4 flex items-center justify-center text-sm text-blue-600">
            <Eye className="h-4 w-4 mr-2" />
            <span>Instant AI scan upon upload</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in border border-blue-100">
            
            {!imagePreview ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-3 border-dashed border-blue-300 rounded-2xl p-12 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  <Camera className="h-16 w-16 text-blue-500 mx-auto mb-6 group-hover:text-blue-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('image.uploadTitle')}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {t('image.uploadDesc')}
                </p>
                
                <button
                  type="button"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover-scale"
                >
                  <Upload className="h-5 w-5 mr-2 inline" />
                  {t('image.chooseImage')}
                </button>
                
                <p className="text-xs text-gray-500 mt-4">
                  Max file size: 5MB • Formats: JPG, PNG, WebP
                </p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Medical image for analysis"
                    className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
                  />
                  
                  <button
                    onClick={clearImage}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transform hover:scale-110 transition-all duration-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  {isRealTimeAnalyzing && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl flex items-center justify-center">
                      <div className="bg-white rounded-full p-3 shadow-lg">
                        <Loader className="h-6 w-6 animate-spin text-blue-500" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Analysis Results */}
                {quickAnalysis && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 animate-fade-in">
                    <div className="flex items-center mb-2">
                      <Brain className="h-4 w-4 text-green-600 mr-2" />
                      <h4 className="text-sm font-semibold text-gray-900">Real-time AI Scan</h4>
                    </div>
                    <div className="text-sm text-gray-700 whitespace-pre-line">
                      {quickAnalysis}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none hover-scale"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      {t('image.analyzingImage')}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Camera className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                      {t('image.analyzeImage')}
                    </span>
                  )}
                </button>
              </div>
            )}

            {diagnosis && (
              <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-2 border-green-200 animate-fade-in">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">{t('image.reportTitle')}</h3>
                </div>
                
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {diagnosis}
                </div>
                
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-red-800 text-sm">
                    <strong>Medical Disclaimer:</strong> {t('image.disclaimer')}
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
