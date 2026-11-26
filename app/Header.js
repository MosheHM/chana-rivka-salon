import { SITE } from './site';
export default function Header() { return (
  <header className="hdr"><div className="wrap hdr-in">
    <a href="/" className="brand" aria-label={SITE.name}><img src="/brand/icon.svg" alt="" height="46" /><b>חנה רבקה</b></a>
    <nav aria-label="ניווט ראשי"><a href="/#services">הטיפולים</a><a href="/guide/">מה חשוב לדעת</a><a href="/#faq">שאלות</a><a href="/#contact">יצירת קשר</a></nav>
  </div></header>); }
