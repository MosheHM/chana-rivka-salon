import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html style={{ scrollBehavior: 'smooth' }}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;700&family=Heebo:wght@400;600;700;900&family=Montserrat:wght@400;500&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-brand-bg font-sans text-brand-text">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}