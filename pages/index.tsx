
import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import OurWork from '../components/OurWork';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Chana Rivka Hair Salon</title>
        <meta name="description" content="A modern and elegant website for a bespoke hair salon, showcasing services and brand aesthetic." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24">
          <Hero />
          <About />
          <Services />
          <OurWork />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
