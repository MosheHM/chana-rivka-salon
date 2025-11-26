# Font Styles Guide

This document describes the font styles used in this project, so you can replicate them in another Next.js/Vercel project.

## Fonts Used

This project uses **4 fonts** from Google Fonts - 2 for each language (Hebrew and English):

### Hebrew (Right-to-Left)
| Font Family | Usage | Weights |
|-------------|-------|---------|
| **Heebo** | Serif/Display (headings, titles) | 400, 600, 700, 900 |
| **Assistant** | Sans-serif (body text) | 400, 500, 700 |

### English (Left-to-Right)
| Font Family | Usage | Weights |
|-------------|-------|---------|
| **Playfair Display** | Serif/Display (headings, titles) | 400, 700 |
| **Montserrat** | Sans-serif (body text) | 400, 500 |

## How to Set Up in Next.js

### 1. Add Google Fonts in `_document.tsx`

```tsx
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
```

### 2. Configure Tailwind CSS (`tailwind.config.js`)

```js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Heebo (Hebrew) falls back to Playfair Display (English), then generic serif
        'serif': ['"Heebo"', '"Playfair Display"', 'serif'],
        // Assistant (Hebrew) falls back to Montserrat (English), then generic sans-serif
        'sans': ['"Assistant"', '"Montserrat"', 'sans-serif'],
      },
      colors: {
        'brand-bg': '#F9F9F7',
        'brand-text': '#5D4037',
        'brand-dark': '#3E2723',
        'brand-accent': '#C4B7A6'
      }
    },
  },
  plugins: [],
}
```

## Font Size Usage

### Tailwind CSS Classes Used

| Element Type | Tailwind Classes | Approximate Size |
|--------------|------------------|------------------|
| **Hero Title (H1)** | `text-5xl md:text-7xl` | 48px / 72px |
| **Section Titles (H3)** | `text-4xl md:text-5xl` or `text-5xl md:text-6xl` | 36-48px / 48-60px |
| **Section Tags** | `text-sm` | 14px |
| **Subtitle/Body Large** | `text-lg md:text-xl` or `text-base md:text-lg` | 18px / 20px or 16px / 18px |
| **Navigation Links** | `text-sm` | 14px |
| **Mobile Navigation** | `text-lg` | 18px |
| **Logo** | `text-2xl` | 24px |
| **Buttons** | (default/base size) | 16px |
| **Small Text/Labels** | `text-sm` | 14px |
| **Extra Small Text** | `text-xs` | 12px |

### Tailwind Text Size Reference

| Class | Size | Line Height |
|-------|------|-------------|
| `text-xs` | 0.75rem (12px) | 1rem (16px) |
| `text-sm` | 0.875rem (14px) | 1.25rem (20px) |
| `text-base` | 1rem (16px) | 1.5rem (24px) |
| `text-lg` | 1.125rem (18px) | 1.75rem (28px) |
| `text-xl` | 1.25rem (20px) | 1.75rem (28px) |
| `text-2xl` | 1.5rem (24px) | 2rem (32px) |
| `text-3xl` | 1.875rem (30px) | 2.25rem (36px) |
| `text-4xl` | 2.25rem (36px) | 2.5rem (40px) |
| `text-5xl` | 3rem (48px) | 1 |
| `text-6xl` | 3.75rem (60px) | 1 |
| `text-7xl` | 4.5rem (72px) | 1 |

## Font Weight Classes Used

| Tailwind Class | Weight | Usage |
|----------------|--------|-------|
| `font-normal` | 400 | Regular body text |
| `font-medium` | 500 | Buttons, emphasis |
| `font-semibold` | 600 | Section tags, logo text |
| `font-bold` | 700 | Headings, titles |
| `font-black` | 900 | Available for Heebo (extra bold display) |

## Additional Typography Styles

### Letter Spacing
- `tracking-wider` - Used on headings
- `tracking-widest` - Used on buttons and navigation (uppercase text)

### Text Transform
- `uppercase` - Used on buttons, navigation links, and section tags

## Usage Examples

### Section Heading Pattern
```tsx
<h2 className="text-sm font-semibold tracking-widest text-brand-accent uppercase mb-3">
  Section Tag
</h2>
<h3 className="text-5xl md:text-6xl font-serif font-bold text-brand-dark mb-4">
  Section Title
</h3>
<p className="text-base md:text-lg text-gray-600">
  Section subtitle or description
</p>
```

### Button Pattern
```tsx
<button className="font-medium tracking-widest uppercase py-4 px-10 bg-brand-dark text-white">
  Button Text
</button>
```

### Navigation Link Pattern
```tsx
<a className="text-sm tracking-widest uppercase hover:text-brand-accent transition-colors">
  Nav Link
</a>
```

## Quick Copy: Google Fonts URL

```
https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;700&family=Heebo:wght@400;600;700;900&family=Montserrat:wght@400;500&family=Playfair+Display:wght@400;700&display=swap
```

## Alternative: Using next/font (Recommended for Next.js 13+)

If you're using Next.js 13+ with the App Router, you can use `next/font` for better performance:

```tsx
// app/layout.tsx
import { Heebo, Playfair_Display, Assistant, Montserrat } from 'next/font/google';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-heebo',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-assistant',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-montserrat',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${heebo.variable} ${playfair.variable} ${assistant.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

Then update your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'serif': ['var(--font-heebo)', 'var(--font-playfair)', 'serif'],
        'sans': ['var(--font-assistant)', 'var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
}
```
