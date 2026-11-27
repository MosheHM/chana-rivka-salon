import Header from '../Header';
import Fx from '../Fx';
import Scene from '../Scene';
import Words from '../Words';
import { Footer, Floating } from '../Chrome';
import PediaIndex from './PediaIndex';
export const metadata = { title: 'מה חשוב לדעת על אפילציה במחט | חנה רבקה', description: 'מילון קצר ונגיש על אפילציה במחט חשמלית: השיטה, זקיק, מחזור צמיחה, אזורים, סוגי שיער, מיתוסים ומה עושים אחרי הטיפול.', alternates: { canonical: '/guide/' } };
export default function Pedia() { return (<>
  <Header /><Fx /><div className="grain" aria-hidden="true" /><div className="cursor" aria-hidden="true" />
  <main id="main" className="pedia">
    <div className="light" aria-hidden="true" />
    <Scene variant="guide" />
    <div className="depth" aria-hidden="true"><i data-par="0.5" /><i data-par="-0.4" /><b data-par="0.8" /></div>
    <div className="wrap phead">
      <p className="eyebrow rv">מילון קצר לאפילציה במחט</p>
      <h1 aria-label="מה חשוב לדעת"><span className="hw"><Words t="מה חשוב לדעת" from={1} /></span><span className="odot" aria-hidden="true" /></h1>
      <p className="lead rv" style={{ '--rd': 5 }}>כל מה שרצית לדעת על הסרת שיער במחט חשמלית, מונח אחר מונח.</p>
    </div>
    <div className="wrap"><PediaIndex /></div>
  </main>
  <Footer /><Floating />
</>); }
