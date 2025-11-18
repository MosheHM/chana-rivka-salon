
import React from 'react';
import { content } from '../constants';
import WorkCard from './WorkCard';
import { useLanguage } from '../contexts/LanguageContext';
import Reveal from './Reveal';

const OurWork: React.FC = () => {
  const { language, t } = useLanguage();
  const WORK_POSTS = content[language].WORK_POSTS;

  return (
    <section id="work" className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <Reveal variant="slide-up">
                    <h2 className="text-sm font-semibold tracking-widest text-brand-accent uppercase mb-3">{t('workTag')}</h2>
                    <h3 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark mb-4">
                        {t('workTitle')}
                    </h3>
                </Reveal>
                <Reveal variant="slide-up" delay={100}>
                    <p className="text-base md:text-lg text-gray-600">
                        {t('workSubtitle')}
                    </p>
                </Reveal>
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {WORK_POSTS.map((post, index) => (
                <Reveal key={post.id} delay={index * 50} variant="scale">
                    <WorkCard post={post} />
                </Reveal>
            ))}
        </div>
    </section>
  );
};

export default OurWork;
