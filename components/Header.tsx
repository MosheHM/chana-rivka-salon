
import React, { useState, useEffect } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleLinkClick(e);
    closeMenu();
  };

  const isRTL = language === 'he';

  return (
    <header className="bg-brand-bg w-full fixed top-0 z-50 shadow-sm bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 relative z-50">
          <div className="flex-shrink-0">
            <a href="#home" onClick={handleLinkClick} className="text-2xl font-serif font-semibold tracking-wider text-brand-dark">
              CHANA RIVKA
            </a>
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
            <button 
              className="p-2 focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 bottom-0 ${isRTL ? 'left-0' : 'right-0'} w-[75%] max-w-[300px] bg-brand-bg z-50 shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
          isMobileMenuOpen 
            ? 'translate-x-0' 
            : (isRTL ? '-translate-x-full' : 'translate-x-full')
        }`}
      >
        <div className="flex flex-col h-full p-6">
           {/* Header space inside sidebar for close button alignment */}
           <div className="flex justify-between items-center mb-10">
             <span className="text-xl font-serif font-bold text-brand-dark">CHANA RIVKA</span>
             <button onClick={closeMenu} className="p-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           </div>
           
           <nav className="flex flex-col space-y-6">
              <a href="#home" onClick={handleMobileLinkClick} className="text-lg font-medium uppercase tracking-widest text-brand-dark hover:text-brand-accent transition-colors">{t('navHome')}</a>
              <a href="#about" onClick={handleMobileLinkClick} className="text-lg font-medium uppercase tracking-widest text-brand-dark hover:text-brand-accent transition-colors">{t('navAbout')}</a>
              <a href="#services" onClick={handleMobileLinkClick} className="text-lg font-medium uppercase tracking-widest text-brand-dark hover:text-brand-accent transition-colors">{t('navServices')}</a>
              <a href="#work" onClick={handleMobileLinkClick} className="text-lg font-medium uppercase tracking-widest text-brand-dark hover:text-brand-accent transition-colors">{t('navWork')}</a>
              <a href="#contact" onClick={handleMobileLinkClick} className="text-lg font-medium uppercase tracking-widest text-brand-dark hover:text-brand-accent transition-colors">{t('navContact')}</a>
           </nav>

           <div className="mt-auto mb-8">
              <a href="#contact" onClick={handleMobileLinkClick} className="block w-full text-center bg-brand-dark text-white font-medium tracking-widest uppercase py-4 hover:bg-opacity-90 transition-colors">
                  {t('bookNow')}
              </a>
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
