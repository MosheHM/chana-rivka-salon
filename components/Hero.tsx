
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Reveal from './Reveal';

interface Strand {
  id: number;
  d: string;
  color: string;
  width: number;
  opacity: number;
  animation: string;
  duration: string;
  delay: string;
}

const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        const headerOffset = 96; // h-24 = 6rem = 96px
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [strands, setStrands] = useState<Strand[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const count = 30;
    // Soft, elegant palette for light background
    // Mix of warm browns, beiges, and soft taupes
    const colors = [
      '#C4B7A6', // Brand Accent
      '#8D6E63', // Warm Brown
      '#A1887F', // Light Brown
      '#D7CCC8', // Pale Brown
      '#6D4C41', // Darker Brown for depth
      '#BCAAA4'  // Taupe
    ];
    const newStrands: Strand[] = [];

    for (let i = 0; i < count; i++) {
      const startX = Math.random() * 120 - 10; 
      const endX = startX + (Math.random() * 40 - 20);
      const control1X = startX + (Math.random() * 50 - 25);
      const control2X = endX + (Math.random() * 50 - 25);
      
      // Smooth cubic bezier curves
      const d = `M ${startX} -10 C ${control1X} 40, ${control2X} 70, ${endX} 110`;

      newStrands.push({
        id: i,
        d,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: Math.random() * 3 + 0.5, // Slightly thinner for a lighter, wispy feel
        opacity: Math.random() * 0.6 + 0.2,
        animation: i % 2 === 0 ? 'gentle-sway' : 'gentle-sway-reverse',
        duration: `${Math.random() * 15 + 15}s`, // Slow, calming motion
        delay: `${Math.random() * -30}s`,
      });
    }
    setStrands(newStrands);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-brand-dark overflow-hidden bg-brand-bg">
      {/* Abstract Animated Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        {mounted && (
          <svg 
            className="w-full h-full" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="hair-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.6" result="blur" />
              </filter>
              <linearGradient id="lightWash" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F0EBE3" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="vignette" cx="50%" cy="50%" r="75%" fx="50%" fy="50%">
                  <stop offset="50%" stopColor="#F9F9F7" stopOpacity="0" />
                  <stop offset="100%" stopColor="#F9F9F7" stopOpacity="1" />
              </radialGradient>
            </defs>
            
            {/* Base Background - Clean Light */}
            <rect x="0" y="0" width="100" height="100" fill="#F9F9F7" />
            
            {/* Subtle gradient wash */}
            <rect x="0" y="0" width="100" height="100" fill="url(#lightWash)" />

            {/* Animated Strands */}
            {strands.map((strand) => (
              <path
                key={strand.id}
                d={strand.d}
                fill="none"
                stroke={strand.color}
                strokeWidth={strand.width}
                strokeOpacity={strand.opacity}
                strokeLinecap="round"
                filter="url(#hair-blur)"
                style={{
                  animation: `${strand.animation} ${strand.duration} ease-in-out infinite alternate`,
                  animationDelay: strand.delay,
                  transformOrigin: '50% 0%',
                  vectorEffect: 'non-scaling-stroke'
                }}
              />
            ))}
            
            {/* Vignette - Fading to brand background color at edges */}
            <rect x="0" y="0" width="100" height="100" fill="url(#vignette)" />
          </svg>
        )}
      </div>
      
      {/* Text Content Overlay - ensuring contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60 z-0"></div>

      <div className="relative z-10 px-4">
        <Reveal variant="slide-up" duration={1200}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 tracking-wider text-brand-dark">
            {t('heroTitle')}
          </h1>
        </Reveal>
        <Reveal variant="slide-up" delay={200} duration={1200}>
          <p className="text-lg md:text-xl font-sans mb-8 max-w-2xl mx-auto text-gray-700 font-medium">
            {t('heroSubtitle')}
          </p>
        </Reveal>
        <Reveal variant="fade" delay={400} duration={1200}>
          <a 
            href="#contact" 
            onClick={handleLinkClick}
            className="inline-block bg-brand-dark text-white font-medium tracking-widest uppercase py-4 px-10 hover:bg-brand-accent hover:text-brand-dark transition-all duration-500 ease-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 rounded-sm border border-transparent"
          >
            {t('heroButton')}
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
