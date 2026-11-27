// טעינה עצלה אחת של GSAP + ScrollTrigger, משותפת לכל רכיבי הלקוח
let p;
export function loadFx() {
  if (!p) {
    p = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, s]) => {
      const gsap = g.gsap || g.default;
      const ScrollTrigger = s.ScrollTrigger || s.default;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    });
  }
  return p;
}
export const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
