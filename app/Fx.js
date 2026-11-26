'use client';
import { useEffect } from 'react';
import { loadFx } from './fxlib';

// שכבת התנועה של האתר: גלילה חלקה (Lenis), חשיפות וגלילה מונעת (GSAP ScrollTrigger),
// כפתורים מגנטיים, הטיית כרטיסים עם ברק, והסמן הכתום.
// עקרונות: בלי JS הכול גלוי; ב"הפחתת תנועה" שום דבר מכל זה לא נטען.
export default function Fx() {
  useEffect(() => {
    const root = document.documentElement;
    const offs = [];
    const on = (t, ev, fn, opt) => { t.addEventListener(ev, fn, opt); offs.push(() => t.removeEventListener(ev, fn, opt)); };

    // התפריט הצף במובייל: נסגר בלחיצה על קישור, בלחיצה בחוץ וב־Escape (לא תלוי בתנועה)
    const openMenu = () => document.querySelector('details.mb-menu[open]');
    on(document, 'click', (e) => {
      const m = openMenu();
      if (m && (!m.contains(e.target) || (e.target.closest && e.target.closest('.mb-pop a')))) m.removeAttribute('open');
    });
    on(document, 'keydown', (e) => {
      if (e.key !== 'Escape') return;
      const m = openMenu();
      if (m) { m.removeAttribute('open'); const s = m.querySelector('summary'); if (s) s.focus(); }
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('reduced'); root.classList.remove('js');
      return () => offs.forEach((f) => f());
    }

    let dead = false, cleanup = null;
    Promise.all([loadFx(), import('lenis')]).then(([{ gsap, ScrollTrigger }, L]) => {
      if (dead) return;
      cleanup = init(gsap, ScrollTrigger, L.default || L.Lenis);
    }).catch(() => { root.classList.remove('js'); });
    return () => { dead = true; offs.forEach((f) => f()); if (cleanup) cleanup(); };
  }, []);
  return null;
}

function init(gsap, ScrollTrigger, Lenis) {
  const root = document.documentElement, body = document.body;
  const mq = (q) => window.matchMedia(q).matches;
  const fine = mq('(hover: hover) and (pointer: fine)');
  // אם רשת איטית גרמה לכך שמנגנון הביטחון כבר חשף את התוכן, לא מסתירים אותו שוב
  const reveal = root.classList.contains('js');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const offs = [];
  const on = (t, ev, fn, opt) => { t.addEventListener(ev, fn, opt); offs.push(() => t.removeEventListener(ev, fn, opt)); };
  let alive = true;

  // מכאן ה־CSS כבר לא מסתיר דבר: GSAP קובע את מצבי הפתיחה באותה משימה, בלי הבהוב
  root.classList.add('fx');

  /* ---------- גלילה חלקה ---------- */
  let lenis = null;
  if (fine && Lenis) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    offs.push(() => { gsap.ticker.remove(tick); lenis.destroy(); });
  }
  const hdrH = () => { const h = $('.hdr'); return h ? h.offsetHeight : 0; };
  const goTo = (el, immediate) => {
    if (lenis) lenis.scrollTo(el, { offset: -hdrH() - 6, duration: 1.5, easing: (x) => 1 - Math.pow(1 - x, 4), immediate: !!immediate, force: true });
    else el.scrollIntoView();
  };
  // קישורי עוגן באותו עמוד: גלילה חלקה + העברת נקודת המיקוד (כמו בהתנהגות המקורית של הדפדפן)
  on(document, 'click', (e) => {
    if (!lenis || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.classList.contains('skip')) return;
    let u; try { u = new URL(a.href); } catch (err) { return; }
    if (u.origin !== location.origin || u.pathname !== location.pathname || u.hash.length < 2) return;
    let el = null; try { el = document.getElementById(decodeURIComponent(u.hash.slice(1))); } catch (err) { /* noop */ }
    if (!el) return;
    e.preventDefault();
    if (u.hash !== location.hash) history.pushState(null, '', u.hash);
    goTo(el);
    if (!el.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SUMMARY)$/.test(el.tagName)) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  });

  const ctx = gsap.context(() => {
    /* ---------- התקדמות גלילה (פס המחט בצד) ---------- */
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => { root.style.setProperty('--p', s.progress.toFixed(4)); body.classList.toggle('scrolled', s.scroll() > 40); },
    });

    /* ---------- חשיפות ---------- */
    if (reveal) {
      // כותרות: מילה אחר מילה
      $$('[data-s]').forEach((h) => {
        const w = $$('.wd>span', h);
        if (!w.length) return;
        gsap.set(w, { yPercent: 118 });
        ScrollTrigger.create({ trigger: h, start: 'top 92%', once: true, onEnter: () => gsap.to(w, { yPercent: 0, duration: 1.25, ease: 'expo.out', stagger: 0.09, clearProps: 'transform' }) });
      });
      // כרטיסים: עולים מעומק, בזה אחר זה
      const cards = $$('.gcard[data-r],.card[data-r]');
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 64, scale: 0.94 });
        ScrollTrigger.batch(cards, { start: 'top 94%', once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'expo.out', stagger: 0.09, overwrite: true, clearProps: 'opacity,transform' }) });
      }
      // שאר האלמנטים
      const rs = $$('[data-r]').filter((el) => !cards.includes(el));
      if (rs.length) {
        gsap.set(rs, { opacity: 0, y: 30 });
        ScrollTrigger.batch(rs, { start: 'top 92%', once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.1, overwrite: true, clearProps: 'opacity,transform' }) });
      }
      // ילדים מדורגים (שלבי התהליך)
      $$('[data-rs]').forEach((p) => {
        const kids = [...p.children];
        if (!kids.length) return;
        gsap.set(kids, { opacity: 0, y: 26 });
        ScrollTrigger.create({ trigger: p, start: 'top 86%', once: true, onEnter: () => { p.classList.add('in'); gsap.to(kids, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.14, clearProps: 'opacity,transform' }); } });
      });
    } else {
      $$('[data-rs]').forEach((p) => p.classList.add('in'));
    }

    /* ---------- הירו: יציאה רכה בגלילה ---------- */
    const hero = $('.hero');
    if (hero) {
      gsap.to('.hero-in', { y: -90, opacity: 0.08, ease: 'none', scrollTrigger: { trigger: hero, start: 0, end: 'bottom top', scrub: true } });
    }

    /* ---------- המשפט: רגע נעוץ שמתמלא עם הגלילה ---------- */
    const st = $('.statement');
    if (st) {
      const words = $$('.fill .w', st), line = $('.st-needle', st);
      const build = (trigger) => {
        if (!words.length) return;
        const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: trigger });
        tl.to(words, { color: '#262422', duration: 1, stagger: 0.6 }, 0);
        if (line) tl.fromTo(line, { '--n': 0 }, { '--n': 1, duration: tl.duration() }, 0);
      };
      const mm = gsap.matchMedia();
      mm.add('(min-width: 821px)', () => { build({ trigger: st, start: 'center center', end: '+=110%', pin: true, scrub: 0.6, anticipatePin: 1 }); });
      mm.add('(max-width: 820px)', () => { build({ trigger: st, start: 'top 78%', end: 'bottom 50%', scrub: 0.4 }); });
    }

    /* ---------- פרלקסה: אור אלכסוני, שכבות עומק, סרט המילים ---------- */
    $$('.light').forEach((l) => {
      gsap.fromTo(l, { y: -60 }, { y: 60, ease: 'none', scrollTrigger: { trigger: l.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('[data-par]').forEach((el) => {
      const f = parseFloat(el.dataset.par) || 0;
      gsap.fromTo(el, { y: 110 * f }, { y: -110 * f, ease: 'none', scrollTrigger: { trigger: el.closest('section,main') || el.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    $$('.band').forEach((b) => {
      gsap.fromTo(b, { '--sw': -45 }, { '--sw': 100, ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    if ($('.marq-t')) gsap.fromTo('.marq-t', { '--mx': 0 }, { '--mx': -220, ease: 'none', scrollTrigger: { trigger: '.marq', start: 'top bottom', end: 'bottom top', scrub: 0.4 } });
    // רשת הכרטיסים: כל כרטיס זז מעט אחרת לפי ה"עומק" שלו
    $$('.ggrid').forEach((g) => {
      const set = (s) => g.style.setProperty('--sp', ((s.progress - 0.5) * 2).toFixed(3));
      ScrollTrigger.create({ trigger: g, start: 'top bottom', end: 'bottom top', onUpdate: set, onRefresh: set });
    });
  });

  /* ---------- אינטראקציות עכבר (מכשירי מצביע בלבד) ---------- */
  if (fine) {
    root.classList.add('has-cursor');
    // הנקודה הכתומה
    const dot = $('.cursor');
    if (dot) {
      const xTo = gsap.quickTo(dot, 'x', { duration: 0.32, ease: 'power3.out' });
      const yTo = gsap.quickTo(dot, 'y', { duration: 0.32, ease: 'power3.out' });
      let first = true;
      on(window, 'pointermove', (e) => {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        if (first) { gsap.set(dot, { x: e.clientX, y: e.clientY }); first = false; }
        xTo(e.clientX); yTo(e.clientY); dot.style.opacity = 1;
      }, { passive: true });
      on(document, 'pointerover', (e) => { dot.classList.toggle('big', !!(e.target.closest && e.target.closest('a,button,summary,input'))); });
      on(root, 'pointerleave', () => { dot.style.opacity = 0; });
    }

    // הטיה תלת־ממדית + ברק שעוקב אחרי הסמן
    let tiltEl = null;
    const untilt = (el) => { el.classList.remove('tilting'); el.style.setProperty('--ang', '0deg'); };
    on(document, 'pointermove', (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      const el = e.target.closest ? e.target.closest('[data-tilt]') : null;
      if (el !== tiltEl) { if (tiltEl) untilt(tiltEl); tiltEl = el; if (el) el.classList.add('tilting'); }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      const max = parseFloat(el.dataset.tilt) || 8;
      el.style.setProperty('--ax', (0.5 - py).toFixed(3));
      el.style.setProperty('--ay', (px - 0.5).toFixed(3));
      el.style.setProperty('--ang', (Math.hypot(px - 0.5, py - 0.5) * 2 * max).toFixed(2) + 'deg');
      el.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
      el.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
    }, { passive: true });
    on(root, 'pointerleave', () => { if (tiltEl) { untilt(tiltEl); tiltEl = null; } });

    // כפתורים מגנטיים
    $$('.btn,.wa-float').forEach((el) => {
      const k = el.classList.contains('wa-float') ? 0.36 : 0.2;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' });
      const lim = (v, m) => Math.max(-m, Math.min(m, v));
      on(el, 'pointermove', (e) => {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2 - gsap.getProperty(el, 'x'), cy = r.top + r.height / 2 - gsap.getProperty(el, 'y');
        xTo(lim((e.clientX - cx) * k, 12)); yTo(lim((e.clientY - cy) * (k + 0.12), 9));
      }, { passive: true });
      on(el, 'pointerleave', () => { xTo(0); yTo(0); });
    });

    // הירו: שכבות שזזות מעט מול הסמן (עומק)
    const hero = $('.hero');
    if (hero) {
      let tx = 0, ty = 0, cx = 0, cy = 0;
      on(hero, 'pointermove', (e) => { const r = hero.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5; }, { passive: true });
      on(hero, 'pointerleave', () => { tx = 0; ty = 0; });
      const tick = () => {
        if (Math.abs(tx - cx) + Math.abs(ty - cy) < 0.0004) return;
        cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
        hero.style.setProperty('--hx', cx.toFixed(4)); hero.style.setProperty('--hy', cy.toFixed(4));
      };
      gsap.ticker.add(tick);
      offs.push(() => gsap.ticker.remove(tick));
    }
  }

  /* ---------- שמירה על מיקומים נכונים כשהפריסה משתנה ---------- */
  let tt = 0;
  const refresh = () => { if (alive) ScrollTrigger.refresh(); };
  on(document, 'toggle', () => { clearTimeout(tt); tt = setTimeout(refresh, 520); }, true);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  // הגעה עם עוגן בכתובת: אחרי שהרגע הנעוץ הוסיף גובה לעמוד, חוזרים ליעד
  if (location.hash.length > 1) {
    let el = null; try { el = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (err) { /* noop */ }
    if (el && el.id !== 'q') requestAnimationFrame(() => { if (!alive) return; ScrollTrigger.refresh(); goTo(el, true); });
  }

  return () => {
    alive = false;
    clearTimeout(tt);
    offs.forEach((f) => f());
    ctx.revert();
    root.classList.remove('fx', 'has-cursor');
  };
}
