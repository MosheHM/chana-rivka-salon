
import React, { createContext, useState, useContext, useEffect, useLayoutEffect } from 'react';
import { translations } from '../translations';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('he'); // Default to Hebrew

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'he' : 'en'));
  };

  const t = (key: string): string => {
    const langTranslations = translations[language] || translations.he;
    // A simple way to get nested keys, e.g. "forms.name"
    const keys = key.split('.');
    let result: any = langTranslations;
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
            return key; // Return key if not found
        }
    }
    return result || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
