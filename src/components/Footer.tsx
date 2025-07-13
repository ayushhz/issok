
import { Stethoscope, Heart, Shield, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Stethoscope className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">{t('nav.brand')}</span>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              {t('footer.description')}
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="h-4 w-4 text-red-400" />
              <span>{t('footer.madeWithCare')}</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('footer.features')}</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                {t('footer.symptomAnalysis')}
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                {t('footer.imageDiagnosis')}
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                {t('footer.aiPrescriptions')}
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                {t('about.privacyFirst')}
              </li>
            </ul>
          </div>

          {/* Important Notice */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-yellow-400" />
              {t('footer.important')}
            </h3>
            <div className="text-gray-300 text-sm space-y-3">
              <p>{t('footer.preliminaryAnalysis')}</p>
              <p>{t('footer.consultProfessionals')}</p>
              <p>{t('footer.notForEmergency')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('footer.copyright')}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">{t('footer.privacyPolicy')}</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">{t('footer.termsOfService')}</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">{t('footer.contact')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
