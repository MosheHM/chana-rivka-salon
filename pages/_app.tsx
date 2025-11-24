
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;