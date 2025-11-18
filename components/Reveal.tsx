
import React, { useEffect, useRef, useState } from 'react';

type AnimationVariant = 'slide-up' | 'slide-right' | 'slide-left' | 'fade' | 'scale';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  variant?: AnimationVariant;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 1000,
  threshold = 0.1,
  variant = 'slide-up'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, [threshold]);

  const getInitialTransform = () => {
    switch (variant) {
      case 'slide-up': return 'translateY(40px)';
      case 'slide-right': return 'translateX(-40px)';
      case 'slide-left': return 'translateX(40px)';
      case 'scale': return 'scale(0.95)';
      case 'fade': return 'none';
      default: return 'translateY(20px)';
    }
  };

  const transitionStyles: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)', // Elegant, modern ease-out
    willChange: 'opacity, transform',
  };

  return (
    <div ref={ref} className={className} style={transitionStyles}>
      {children}
    </div>
  );
};

export default Reveal;
