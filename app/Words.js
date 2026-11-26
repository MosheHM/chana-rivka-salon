import { Fragment } from 'react';
// פיצול כותרת למילים לצורך חשיפה מילה־מילה. הטקסט עצמו לא משתנה:
// הכותרת מקבלת aria-label מלא, והמילים המפוצלות מוסתרות מקוראי מסך.
export default function Words({ t, from = 0 }) {
  const ws = t.split(' ');
  return ws.map((w, i) => (
    <Fragment key={i}><span className="wd" style={{ '--d': from + i }} aria-hidden="true"><span>{w}</span></span>{i < ws.length - 1 ? ' ' : ''}</Fragment>
  ));
}
