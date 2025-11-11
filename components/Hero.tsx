
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/id/1011/1920/1080')" }}>
      <div className="absolute inset-0 bg-brand-dark opacity-50"></div>
      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 tracking-wider">
          {t('heroTitle')}
        </h1>
        <p className="text-lg md:text-xl font-sans mb-8 max-w-2xl mx-auto">
          {t('heroSubtitle')}
        </p>
        <a href="#contact" className="bg-brand-accent text-brand-dark font-medium tracking-widest uppercase py-4 px-10 hover:bg-opacity-80 transition-colors duration-300">
          {t('heroButton')}
        </a>
      </div>
    </section>
  );
};

export default Hero;