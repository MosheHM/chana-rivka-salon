
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import OurWork from './components/OurWork';
import Contact from './components/Contact';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow pt-24"> {/* Add padding-top to account for fixed header */}
          <Hero />
          <About />
          <Services />
          <OurWork />
          <Contact />
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;