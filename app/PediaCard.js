import Icon from './Icon';
import { num, N } from './terms';
// כרטיס זכוכית: המעטפת (a) נושאת חשיפה/FLIP/ריחוף, הפנים (gcard-in) נושא הטיה וברק
export default function PediaCard({ t, i, reveal = false }) {
  return (
    <a className="gcard" href={`/guide/${t.slug}/`} data-cat={t.cat} data-slug={t.slug} data-tilt="9" {...(reveal ? { 'data-r': '' } : {})}>
      <span className="gcard-in">
        <span className="glare" aria-hidden="true" />
        <span className="gnum">{num(i)} / {String(N).padStart(2, '0')}</span>
        <Icon name={t.icon} />
        <span className="gcat">{t.cat}</span>
        <h3>{t.title}</h3>
        <p>{t.short}</p>
      </span>
    </a>
  );
}
