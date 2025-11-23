
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Reveal from './Reveal';

const About: React.FC = () => {
  const { t } = useLanguage();
  const [videoError, setVideoError] = React.useState(false);

  // Set to null to use image, or provide video URL to use video
  const videoUrl = null; // Change to: '/videos/about/salon-interior.mp4' to use video

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <Reveal variant="scale" duration={1200}>
            <div className="overflow-hidden">
              {videoUrl && !videoError ? (
                <video 
                  src={videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  onError={handleVideoError}
                  className="w-full h-auto object-cover"
                  title="Salon Interior"
                />
              ) : (
                <img 
                  src="https://picsum.photos/seed/salon/800/1000" 
                  alt="Salon Interior"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              )}
            </div>
          </Reveal>
          <div>
            <Reveal variant="slide-up" delay={200}>
              <h2 className="text-sm font-semibold tracking-widest text-brand-accent uppercase mb-3">{t('aboutTag')}</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">
                {t('aboutTitle')}
              </h3>
            </Reveal>
            <Reveal variant="slide-up" delay={300}>
              <p className="text-gray-600 mb-4 text-lg">
                {t('aboutP1')}
              </p>
            </Reveal>
            <Reveal variant="slide-up" delay={400}>
              <p className="text-gray-600 whitespace-pre-line">
                {t('aboutP2')}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
