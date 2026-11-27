import Header from '../../Header';
import Fx from '../../Fx';
import Icon from '../../Icon';
import Words from '../../Words';
import { Footer, Floating } from '../../Chrome';
import { TERMS, num, N } from '../../terms';
import { SITE, path } from '../../site';
export function generateStaticParams() { return TERMS.map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params; const t = TERMS.find((x) => x.slug === slug);
  return { title: `${t.title} | מה חשוב לדעת | חנה רבקה`, description: t.short, alternates: { canonical: `/guide/${t.slug}/` } };
}
export default async function Term({ params }) {
  const { slug } = await params; const i = TERMS.findIndex((x) => x.slug === slug); const t = TERMS[i];
  const prev = TERMS[(i - 1 + N) % N], next = TERMS[(i + 1) % N];
  return (<>
    <Header /><Fx /><div className="grain" aria-hidden="true" /><div className="cursor" aria-hidden="true" />
    <main id="main" className="pedia term">
      <div className="light" aria-hidden="true" />
      <div className="depth" aria-hidden="true"><i data-par="0.5" /><i data-par="-0.4" /><b data-par="0.8" /></div>
      <div className="wrap term-in">
        <a className="back rv" href={path('/guide/')}>→ חזרה לכל הנושאים</a>
        <div className="term-grid">
          <div className="term-main">
            <div className="ico-stage"><div className="term-ico" data-tilt="12"><span className="ico-rings" aria-hidden="true" /><span className="ico-glass" aria-hidden="true" /><Icon name={t.icon} size={180} /><span className="glare" aria-hidden="true" /></div></div>
            <span className="gcat rv" style={{ '--rd': 2 }}>{t.cat}</span>
            <h1 aria-label={t.title}><Words t={t.title} from={2} /></h1>
            <p className="term-body rv" style={{ '--rd': 5 }}>{t.body}</p>
            {t.list && <ul className="term-list rv" style={{ '--rd': 6 }}>{t.list.map((x) => <li key={x}>{x}</li>)}</ul>}
            {t.note && <p className="term-note rv" style={{ '--rd': 7 }}>{t.note}</p>}
          </div>
          <aside className="dcard" aria-label="כרטיס נתונים" data-tilt="3">
            <span className="glare" aria-hidden="true" />
            <div className="dc-head"><span>מונח</span><b>מס׳ {num(i)}</b></div>
            <dl>
              <div><dt>מתוך</dt><dd>{N} מונחים</dd></div>
              <div><dt>נושא</dt><dd>{t.cat}</dd></div>
              {t.data.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
            </dl>
            <a className="btn" href={SITE.wa}>שאלה? כתבי לי בוואטסאפ</a>
          </aside>
        </div>
        <nav className="term-nav" aria-label="מונחים סמוכים"><a href={path(`/guide/${prev.slug}/`)}>→ {prev.title}</a><a href={path(`/guide/${next.slug}/`)}>{next.title} ←</a></nav>
      </div>
    </main>
    <Footer /><Floating />
  </>);
}
