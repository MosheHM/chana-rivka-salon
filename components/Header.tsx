
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

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

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <li>
    <a
      href={href}
      onClick={handleLinkClick}
      className="text-sm tracking-widest uppercase pb-1 border-b-2 transition-colors duration-300 text-brand-text hover:text-brand-accent border-transparent hover:border-brand-accent"
    >
      {children}
    </a>
  </li>
);

const Header: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-brand-bg w-full fixed top-0 z-50 shadow-sm bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <Link href="#home" onClick={handleLinkClick} className="text-2xl font-serif font-semibold tracking-wider text-brand-dark">
              CHANA RIVKA
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <nav>
              <ul className="flex items-center space-x-6 lg:space-x-8">
                <NavLink href="#home">{t('navHome')}</NavLink>
                {language === 'he' && <li></li>}
                <NavLink href="#about">{t('navAbout')}</NavLink>
                <NavLink href="#services">{t('navServices')}</NavLink>
                <NavLink href="#work">{t('navWork')}</NavLink>
                <NavLink href="#contact">{t('navContact')}</NavLink>
              </ul>
            </nav>
             <button
                onClick={toggleLanguage}
                aria-label="Toggle Language"
                className="text-sm font-medium tracking-widest uppercase py-3 px-2 hover:text-brand-accent transition-colors duration-300"
            >
                {language === 'en' ? 'עב' : 'EN'}
            </button>
            <div>
              <a href="#contact" onClick={handleLinkClick} className="bg-brand-dark text-white text-sm font-medium tracking-widest uppercase py-3 px-6 hover:bg-opacity-80 transition-colors duration-300 whitespace-nowrap">
                {t('bookNow')}
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
                onClick={toggleLanguage}
                aria-label="Toggle Language"
                className="text-sm font-medium tracking-widest uppercase p-2 hover:text-brand-accent transition-colors duration-300"
            >
                {language === 'en' ? 'עב' : 'EN'}
            </button>
            <button className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
