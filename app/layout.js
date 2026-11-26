import './globals.css';
import './v10.css';
import { SITE } from './site';
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: 'אפילציה במחט בבני ברק | חנה רבקה – קליניקה לנשים בלבד',
  description: 'הסרת שיער לצמיתות בשיטת המחט החשמלית, ועיצוב גבות. קליניקה לנשים בלבד, בילו 14 בני ברק. לתיאום תור בוואטסאפ 054-8499287.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'he_IL', url: '/', siteName: SITE.nameEn,
    title: 'אפילציה במחט בבני ברק | חנה רבקה', description: 'קליניקה לנשים בלבד. הסרת שיער במחט חשמלית, ועיצוב גבות. בילו 14, בני ברק.',
    images: [{ url: '/og.png', width: 1200, height: 630 }] },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }], apple: '/apple-touch-icon.png' },
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#FBF8F2' };
const ld = { '@context': 'https://schema.org', '@type': 'BeautySalon', name: SITE.name, alternateName: SITE.nameEn,
  url: SITE.url, telephone: SITE.phoneIntl, image: SITE.url + '/og.png',
  address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.city, addressCountry: 'IL' },
  areaServed: ['בני ברק', 'רמת גן', 'גבעת שמואל'],
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'טיפולים', itemListElement: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'הסרת שיער במחט חשמלית (אפילציה)' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'עיצוב גבות' } }] } };
// רץ לפני הצביעה הראשונה: מסמן שיש JS (מותר להסתיר־ואז־לחשוף) או שהוגדרה הפחתת תנועה.
// מנגנון ביטחון: אם שכבת התנועה לא נטענה תוך 4.5 שניות, הסימון מוסר והכול נחשף.
const boot = "(function(){var c=document.documentElement.classList;try{if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){c.add('reduced');return}c.add('js');setTimeout(function(){if(!c.contains('fx'))c.remove('js')},4500)}catch(e){c.remove('js')}})()";
export default function RootLayout({ children }) {
  return (<html lang="he" dir="rtl" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: boot }} /></head><body>
    <a href="#main" className="skip">דילוג לתוכן</a>
    {children}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  </body></html>);
}
