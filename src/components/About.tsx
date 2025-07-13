
import { Brain, Shield, Zap, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const About = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t('about.aiPowered'),
      description: t('about.aiPoweredDesc')
    },
    {
      icon: Shield,
      title: t('about.privacyFirst'),
      description: t('about.privacyFirstDesc')
    },
    {
      icon: Zap,
      title: t('about.instantResults'),
      description: t('about.instantResultsDesc')
    },
    {
      icon: Users,
      title: t('about.expertBacked'),
      description: t('about.expertBackedDesc')
    }
  ];

  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-blue-100 hover:border-blue-200 animate-fade-in hover-scale"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
