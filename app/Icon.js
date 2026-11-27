// אייקון קווי אחד לכל מונח, עם נקודה כתומה אחת (נקודת הטיפול)
const O = '#FF5A1F';
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round', pathLength: 1 };
// הנקודה הכתומה + טבעת דקה שמשמשת לפעימה חד־פעמית (מוסתרת כברירת מחדל)
const D = (x, y) => <><circle className="iring" cx={x} cy={y} r="3.6" fill="none" stroke={O} strokeWidth="0.6" /><circle className="idot" cx={x} cy={y} r="3.6" fill={O} /></>;
const I = {
  needle: <><line x1="50" y1="8" x2="50" y2="76" {...S} /><path d="M48.6 76 L50 90 L51.4 76" {...S} />{D(50, 94)}</>,
  follicle: <><path d="M50 8 V60" {...S} /><path d="M36 60 Q50 94 64 60 Z" {...S} />{D(50, 72)}</>,
  cycle: <><circle cx="50" cy="50" r="32" {...S} /><path d="M50 18 A32 32 0 0 1 82 50" {...S} strokeWidth="2.2" />{D(82, 50)}</>,
  body: <><rect x="26" y="20" width="48" height="60" rx="24" {...S} />{D(50, 50)}</>,
  light: <><line x1="30" y1="82" x2="30" y2="28" {...S} /><line x1="50" y1="82" x2="50" y2="18" {...S} /><line x1="70" y1="82" x2="70" y2="36" {...S} />{D(70, 30)}</>,
  feel: <><path d="M20 56 Q35 40 50 56 T80 56" {...S} />{D(50, 56)}</>,
  plan: <><rect x="22" y="26" width="56" height="50" rx="8" {...S} /><line x1="22" y1="40" x2="78" y2="40" {...S} />{D(62, 58)}</>,
  care: <><path d="M30 62 Q50 20 70 62 Q50 82 30 62 Z" {...S} />{D(50, 56)}</>,
  brow: <><path d="M20 58 Q50 30 80 50" {...S} />{D(80, 50)}</>,
};
export default function Icon({ name, size = 88 }) {
  return <svg className="ico" viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">{I[name]}</svg>;
}
