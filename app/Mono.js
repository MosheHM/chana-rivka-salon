// מונוגרמת CR השזורה (מתוך brand/logo-v5), כקווים: מאפשרת אנימציית ציור
export default function Mono({ className = '', stroke = 'currentColor', sw = 1.5 }) {
  return (
    <svg className={'mono ' + className} viewBox="18 22 136 156" role="img" aria-label="סמל חנה רבקה: C ו־R שזורות" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="butt" strokeLinejoin="miter">
      <path pathLength="1" d="M118.98,132.01A52,52 0 1 1 118.98,67.99" style={{ '--i': 0 }} />
      <path pathLength="1" d="M96,30L96,145.38M96,152.18L96,170" style={{ '--i': 1 }} />
      <path pathLength="1" d="M96,36L116,36A30,30 0 0 1 116,96L96,96" style={{ '--i': 2 }} />
      <path pathLength="1" d="M112,96L146,166" style={{ '--i': 3 }} />
    </svg>
  );
}
