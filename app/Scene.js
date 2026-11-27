'use client';
import { useEffect, useRef } from 'react';
// שכבת עומק דקורטיבית. ברירת המחדל היא ציור CSS סטטי (עובד גם בלי JS / בלי WebGL);
// כש־three.js נטען בהצלחה, הקנבס מתחלף פנימה בעדינות.
// הפחתת תנועה: פריים סטטי אחד בלבד (ובמסכים קטנים – נשאר ציור ה־CSS).
export default function Scene({ variant = 'hero' }) {
  const box = useRef(null), cv = useRef(null);
  useEffect(() => {
    const el = box.current, canvas = cv.current;
    if (!el || !canvas) return;
    const mq = (q) => window.matchMedia(q).matches;
    const reduced = mq('(prefers-reduced-motion: reduce)');
    const small = mq('(max-width: 820px)') || mq('(pointer: coarse)');
    const c = navigator.connection;
    const lowEnd = (c && c.saveData) || (navigator.deviceMemory && navigator.deviceMemory <= 2);
    if (lowEnd || (reduced && small)) return;
    let api = null, dead = false, idle = 0, timer = 0;
    const go = () => {
      import('./scene-gl').then((m) => {
        if (dead) return;
        api = m.mount(el, canvas, { variant, simple: small, still: reduced });
        if (api) el.classList.add('on');
      }).catch(() => {});
    };
    if ('requestIdleCallback' in window) idle = window.requestIdleCallback(go, { timeout: 1200 });
    else timer = window.setTimeout(go, 250);
    return () => {
      dead = true;
      if (idle) window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
      if (api) api.dispose();
      el.classList.remove('on');
    };
  }, [variant]);
  return (
    <div ref={box} className={'scene scene-' + variant} aria-hidden="true">
      <div className="scene-css"><i /><i /><i /><i /><em /><b /></div>
      <canvas ref={cv} aria-hidden="true" />
    </div>
  );
}
