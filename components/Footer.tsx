
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

const InstagramIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const FacebookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const WhatsAppIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
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
          <div className="flex flex-col items-center md:items-start">
            <Link href="#home" onClick={handleLinkClick} className="text-2xl font-serif font-semibold tracking-wider mb-4">
              CHANA RIVKA
            </Link>
            <div className="flex flex-col space-y-2 text-sm text-gray-400">
                <a href="mailto:crmakias123@gmail.com" className="hover:text-brand-accent transition-colors">crmakias123@gmail.com</a>
                <a href="https://wa.me/972548499287" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                    054-8499287
                </a>
            </div>
          </div>
          
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
            <a href="https://www.instagram.com/chana_rivka_hair_straightening/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon /></a>
            <a href="https://www.facebook.com/profile.php?id=61569252927368" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon /></a>
            <a href="https://wa.me/972548499287" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><WhatsAppIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
