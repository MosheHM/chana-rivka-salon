import { SITE, path } from './site';
export default function Header() { return (
  <header className="hdr"><div className="wrap hdr-in">
    <a href={path('/')} className="brand" aria-label={SITE.name}><img src={path('/brand/icon.svg')} alt="" height="46" /><b>חנה רבקה</b></a>
    <nav aria-label="ניווט ראשי"><a href={path('/#services')}>הטיפולים</a><a href={path('/guide/')}>מה חשוב לדעת</a><a href={path('/#faq')}>שאלות</a><a href={path('/#contact')}>יצירת קשר</a></nav>
  </div></header>); }
