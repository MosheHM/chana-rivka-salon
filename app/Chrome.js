import { SITE, path } from './site';
const WA = (c) => <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill={c} d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.8-1.1-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.1.1.6-.1 1.1z"/></svg>;
export function Footer() { return (
  <footer className="ftr"><div className="wrap"><img src={path('/brand/lockup-slogan-dark.svg')} alt={SITE.name + ' · בדיוק את'} /><br />© {SITE.name} · <a href={path('/guide/')}>מה חשוב לדעת</a> · <a href={path('/accessibility/')}>הצהרת נגישות</a></div></footer>); }
export function Floating() { return (<>
  <a className="wa-float" href={SITE.wa} aria-label="שליחת הודעה בוואטסאפ">{WA('#262422')}</a>
  <nav className="mbar" aria-label="ניווט מהיר">
    <a className="mb-btn" href={path('/guide/#q')} aria-label="חיפוש נושא"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="8.5" cy="8.5" r="6" /><line x1="13" y1="13" x2="18" y2="18" /></svg></a>
    <details className="mb-menu"><summary>תפריט</summary>
      <div className="mb-pop"><a href={path('/#services')}>הטיפולים</a><a href={path('/guide/')}>מה חשוב לדעת</a><a href={path('/#faq')}>שאלות</a><a href={path('/#contact')}>יצירת קשר</a></div>
    </details>
    <a className="mb-btn mb-wa" href={SITE.wa} aria-label="וואטסאפ">{WA('#262422')}</a>
  </nav>
</>); }
