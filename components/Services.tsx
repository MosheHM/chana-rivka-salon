
import React from 'react';
import ServiceCard from './ServiceCard';
import { content } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { language, t } = useLanguage();
  const SERVICES = content[language].SERVICES;

  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-brand-accent uppercase mb-3">{t('servicesTag')}</h2>
          <h3 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark mb-4">
            {t('servicesTitle')}
          </h3>
          <p className="text-base md:text-lg text-gray-600">
            {t('servicesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-x-10 md:gap-y-20">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;