
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

const InstagramIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const FacebookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const TwitterIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);

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

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-8 md:space-y-0">
          <Link href="#home" onClick={handleLinkClick} className="text-2xl font-serif font-bold tracking-wider">
            CHANA RIVKA
          </Link>
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <li><a href="#home" onClick={handleLinkClick} className="text-sm uppercase tracking-widest hover:text-brand-accent transition-colors">{t('navHome')}</a></li>
              <li><a href="#about" onClick={handleLinkClick} className="text-sm uppercase tracking-widest hover:text-brand-accent transition-colors">{t('navAbout')}</a></li>
              <li><a href="#services" onClick={handleLinkClick} className="text-sm uppercase tracking-widest hover:text-brand-accent transition-colors">{t('navServices')}</a></li>
              <li><a href="#work" onClick={handleLinkClick} className="text-sm uppercase tracking-widest hover:text-brand-accent transition-colors">{t('navWork')}</a></li>
              <li><a href="#contact" onClick={handleLinkClick} className="text-sm uppercase tracking-widest hover:text-brand-accent transition-colors">{t('bookNow')}</a></li>
            </ul>
          </nav>
        </div>
        <hr className="border-gray-700 my-8" />
        <div className="flex flex-col-reverse md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          <p className="text-xs text-gray-400">{t('footerCopyright')}</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
