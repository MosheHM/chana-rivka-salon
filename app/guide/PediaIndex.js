'use client';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PediaCard from '../PediaCard';
import { TERMS, CATS } from '../terms';
import { loadFx } from '../fxlib';

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const match = (t, cat, q) => (cat === 'הכל' || t.cat === cat) && (!q || (t.title + t.short + t.body).includes(q));

export default function PediaIndex() {
  const [cat, setCat] = useState('הכל');       // הכפתור הלחוץ (מיידי)
  const [shown, setShown] = useState('הכל');   // הסינון שמוצג בפועל (אחרי יציאת הכרטיסים)
  const [q, setQ] = useState('');
  const grid = useRef(null);
  const fx = useRef(null);       // { gsap, ScrollTrigger } כשהתנועה פעילה
  const before = useRef(null);   // מיקומי הכרטיסים לפני השינוי (FLIP: First)
  const timer = useRef(0);
  const refreshT = useRef(0);

  const cardsEls = () => (grid.current ? [...grid.current.querySelectorAll('.gcard')] : []);
  const snap = () => {
    if (!fx.current) return;
    const m = new Map();
    cardsEls().forEach((el) => { const r = el.getBoundingClientRect(); m.set(el.dataset.slug, { x: r.left, y: r.top }); });
    before.current = m;
  };

  useEffect(() => {
    if (location.hash === '#q') document.getElementById('q')?.focus();
    const root = document.documentElement, g = grid.current;
    let dead = false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { g.classList.add('ready'); return; }
    loadFx().then((lib) => {
      if (dead) return;
      const hidden = root.classList.contains('js');
      g.classList.add('ready');
      fx.current = lib;
      // כניסה ראשונה: הכרטיסים עולים מעומק בזה אחר זה
      if (hidden) lib.gsap.fromTo(cardsEls(), { opacity: 0, y: 70, scale: 0.93 }, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'expo.out', stagger: 0.07, delay: 0.15, clearProps: 'opacity,transform' });
    }).catch(() => g.classList.add('ready'));
    return () => { dead = true; clearTimeout(timer.current); clearTimeout(refreshT.current); };
  }, []);

  // FLIP: Last + Invert + Play, מיד אחרי שה־DOM התעדכן ולפני הצביעה
  useIso(() => {
    const lib = fx.current, prev = before.current;
    before.current = null;
    if (!lib || !prev) return;
    const { gsap, ScrollTrigger } = lib;
    let n = 0;
    cardsEls().forEach((el) => {
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: 'opacity,transform' });
      const a = prev.get(el.dataset.slug), r = el.getBoundingClientRect();
      if (a) {
        const dx = a.x - r.left, dy = a.y - r.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) gsap.fromTo(el, { x: dx, y: dy }, { x: 0, y: 0, duration: 0.85, ease: 'expo.out', clearProps: 'transform' });
      } else {
        gsap.fromTo(el, { opacity: 0, y: 26, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'expo.out', delay: 0.12 + n++ * 0.05, clearProps: 'opacity,transform' });
      }
    });
    // גובה העמוד השתנה: מעדכנים את נקודות הגלילה, בהשהיה קצרה כדי לא להפריע להקלדה
    clearTimeout(refreshT.current);
    refreshT.current = setTimeout(() => ScrollTrigger.refresh(), 320);
  }, [shown, q]);

  const pick = (c) => {
    if (c === cat) return;
    setCat(c);
    clearTimeout(timer.current);
    const lib = fx.current;
    if (!lib) { setShown(c); return; }
    if (c === shown) {
      // חזרה מהירה לסינון שעדיין מוצג: מחזירים כרטיסים שהתחילו לצאת
      lib.gsap.to(cardsEls(), { opacity: 1, scale: 1, duration: 0.3, overwrite: true, clearProps: 'opacity,transform' });
      return;
    }
    // קודם יוצאים הכרטיסים שלא שייכים לסינון החדש, ואז השאר מחליקים למקומם
    const leaving = cardsEls().filter((el) => { const t = TERMS.find((x) => x.slug === el.dataset.slug); return t && !match(t, c, q); });
    const apply = () => { snap(); setShown(c); };
    if (!leaving.length) { apply(); return; }
    lib.gsap.to(leaving, { opacity: 0, scale: 0.92, duration: 0.24, ease: 'power2.in', overwrite: true });
    timer.current = setTimeout(apply, 240);
  };
  const type = (e) => { snap(); setQ(e.target.value); };

  const list = TERMS.map((t, i) => ({ t, i })).filter(({ t }) => match(t, shown, q));
  return (<>
    <div className="pfilters">
      <div className="chips" role="group" aria-label="סינון לפי נושא">
        {['הכל', ...CATS].map((c) => (<button key={c} type="button" className={'chip' + (c === cat ? ' on' : '')} aria-pressed={c === cat} onClick={() => pick(c)}>{c}</button>))}
      </div>
      <label className="psearch"><span className="sr">חיפוש מונח</span><input id="q" type="search" placeholder="חיפוש מונח…" value={q} onChange={type} /></label>
    </div>
    <div className="ggrid" data-live="" ref={grid}>
      {list.map(({ t, i }) => (<PediaCard key={t.slug} t={t} i={i} />))}
      {!list.length && <p className="pempty">לא נמצאו מונחים. נסי מילה אחרת.</p>}
    </div>
  </>);
}
