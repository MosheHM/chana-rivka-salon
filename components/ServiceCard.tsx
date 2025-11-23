
import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [videoError, setVideoError] = React.useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div className="flex flex-col group">
      <div className="overflow-hidden mb-6">
        {service.videoUrl && !videoError ? (
          <video 
            src={service.videoUrl} 
            autoPlay 
            loop 
            muted 
            playsInline
            onError={handleVideoError}
            className="w-full h-auto object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-500 ease-in-out"
            title={service.title}
          />
        ) : (
          <img 
            src={service.imageUrl} 
            alt={service.title} 
            className="w-full h-auto object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-500 ease-in-out" 
            loading="lazy"
          />
        )}
      </div>
      <div className="text-left">
        <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <p className="text-sm font-semibold tracking-widest text-brand-dark">{service.price.toUpperCase()}</p>
      </div>
    </div>
  );
};

export default ServiceCard;