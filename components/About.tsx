
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="overflow-hidden">
            <img 
              src="https://picsum.photos/seed/salon/800/1000" 
              alt="Salon Interior"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-widest text-brand-accent uppercase mb-3">{t('aboutTag')}</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">
              {t('aboutTitle')}
            </h3>
            <p className="text-gray-600 mb-4 text-lg">
              {t('aboutP1')}
            </p>
            <p className="text-gray-600">
              {t('aboutP2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;