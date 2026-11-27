// ריק בפיתוח מקומי. ב-GitHub Pages: /chana-rivka-salon (בלי לוכסן סוגר).
export const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');

/** נתיב מהשורש, עם תת-הנתיב כשהאתר לא יושב על דומיין משלו. */
export function path(p = '/') {
  const hashAt = p.indexOf('#');
  const hash = hashAt >= 0 ? p.slice(hashAt) : '';
  const pathname = hashAt >= 0 ? p.slice(0, hashAt) : p;
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (!BASE) return `${normalized}${hash}`;
  if (normalized === '/') return `${BASE}/${hash}`;
  return `${BASE}${normalized}${hash}`;
}

// כל פרטי העסק במקום אחד – קל להחלפה
export const SITE = {
  name: 'חנה רבקה – אפילציה במחט, לנשים בלבד',
  nameEn: 'Chana Rivka',
  url: 'https://chanarivkabeauty.co.il',
  phone: '054-8499287',
  phoneIntl: '+972548499287',
  wa: 'https://wa.me/972548499287?text=' + encodeURIComponent('שלום חנה רבקה, אשמח לקבוע תור'),
  street: 'בילו 14', city: 'בני ברק',
  map: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('בילו 14 בני ברק'),
};
