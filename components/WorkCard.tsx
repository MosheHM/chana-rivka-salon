
import React from 'react';
import { WorkPost } from '../types';

interface WorkCardProps {
  post: WorkPost;
}

const HeartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);


const WorkCard: React.FC<WorkCardProps> = ({ post }) => {
  return (
    <div className="group relative block aspect-square w-full overflow-hidden">
      <img
        src={post.imageUrl}
        alt={post.caption}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-brand-dark bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"></div>
      <div className="absolute inset-0 flex items-center justify-center p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
                <HeartIcon />
                <span>{post.likes}</span>
            </div>
          <p className="font-sans text-sm">{post.caption}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;