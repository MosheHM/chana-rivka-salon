import { SITE, path } from './site';
import Header from './Header';
import Mono from './Mono';
import Fx from './Fx';
import Scene from './Scene';
import Words from './Words';
import { Footer, Floating } from './Chrome';
import PediaCard from './PediaCard';
import { TERMS } from './terms';
const FEAT = ['machat', 'zkik', 'machzor', 'kol-hasear', 'ezorim', 'acharei'];
const H2 = ({ children }) => <h2 data-s="" aria-label={children}><Words t={children} /></h2>;
const split = (t, cls = 'wd') => t.split(' ').map((w, i) => <span key={i} className={cls} style={{ '--d': i }}><span>{w}</span></span>);
const fillWords = 'מחט אחת. זקיק אחד. בכל פעם. דיוק וסבלנות, בקליניקה שקטה לנשים בלבד.'.split(' ');
const marquee = ['שערה אחר שערה', 'מחט אחת', 'זקיק אחד', 'בכל פעם', 'לנשים בלבד', 'דיוק', 'צניעות', 'יחס אישי'];
const faqs = [
  ['מה זה אפילציה במחט חשמלית?', 'מחט דקה מאוד נכנסת לזקיק השיער, וזרם עדין פוגע בשורש השיער. הטיפול מתבצע שערה אחר שערה, ולכן הוא מדויק מאוד. זו השיטה שנחשבת להסרת שיער לצמיתות.'],
  ['האם זה באמת לצמיתות?', 'השיטה מכוונת להסרה לצמיתות של כל זקיק שטופל. כדי להגיע לתוצאה נדרשת סדרת טיפולים, כי השיער צומח במחזורים ולא כל הזקיקים פעילים באותו זמן. בפגישה הראשונה נסביר מה מצופה במקרה שלך.'],
  ['כמה טיפולים צריך?', 'זה אישי: תלוי באזור, בצפיפות השיער ובמצב ההורמונלי. בפגישת ההיכרות נתאים לך קצב ותוכנית.'],
  ['זה כואב?', 'יש תחושת עקצוץ או חום קצרה. היא שונה מאישה לאישה, ואפשר לעצור או להאט בכל רגע.'],
  ['מה כדאי לעשות אחרי הטיפול?', 'בימים הראשונים נהוג להמליץ לא לגעת ולא לגרד את האזור, להימנע משמש, מחום ומזיעה, ולא למרוח איפור או דאודורנט על האזור. יש לפעול תמיד לפי ההנחיות האישיות שתקבלי בקליניקה.'],
  ['האם הקליניקה לנשים בלבד?', 'כן. הקליניקה מיועדת לנשים בלבד, באווירה צנועה, שקטה ודיסקרטית.'],
];
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
export default function Home() { return (<>
  <Header />
  <Fx />
  <div className="grain" aria-hidden="true" />
  <div className="cursor" aria-hidden="true" />
  <div className="rail" aria-hidden="true"><i /><b /></div>
  <main id="main">
    <section className="hero"><div className="light" aria-hidden="true" /><Scene variant="hero" /><div className="hero-in">
      <Mono className="hero-mono draw" stroke="#262422" sw={1.1} />
      <div className="needle" aria-hidden="true"><i /><b /></div>
      <p className="eyebrow rv">חנה רבקה · אפילציה במחט חשמלית</p>
      <h1 aria-label="בדיוק את."><span className="ln">{split('בדיוק את')}<span className="odot" aria-hidden="true" /></span></h1>
      <p className="lead rv">הסרת שיער לצמיתות, שערה אחר שערה, בקליניקה שקטה לנשים בלבד ברחוב בילו 14 בבני ברק.</p>
      <div className="ctas rv"><a className="btn" href={SITE.wa}>לתיאום תור בוואטסאפ</a><a className="btn ghost" href={'tel:' + SITE.phoneIntl}>חייגי {SITE.phone}</a></div>
      <a className="cue" href="#statement" aria-label="המשך לתוכן"><span /></a>
    </div></section>

    <div className="marq" aria-hidden="true"><div className="marq-t">{[0, 1].map((k) => (<div key={k} className="marq-g">{marquee.map((m) => (<span key={m + k}>{m}<em>·</em></span>))}</div>))}</div></div>

    <section id="statement" className="statement"><div className="wrap">
      <p className="fill"><span className="sr">{fillWords.join(' ')}</span>{fillWords.map((w, i) => (<span key={i} className="w" aria-hidden="true">{w} </span>))}</p>
      <div className="st-needle" aria-hidden="true"><i /><b /></div>
    </div></section>

    <section id="services" className="wrap sec">
      <H2>הטיפולים</H2>
      <div className="cards">
        <article className="card main" data-r="" data-tilt="4"><div className="card-in">
          <span className="glare" aria-hidden="true" />
          <span className="tag">הטיפול המרכזי</span>
          <h3>אפילציה במחט חשמלית</h3>
          <p>מחט אחת, זקיק אחד, בכל פעם. טיפול מדויק להסרת שיער לצמיתות, שמתאים לכל סוגי השיער.</p>
          <p className="areas">כל האזורים, בפנים ובגוף.</p>
        </div></article>
        <article className="card" data-r="" data-tilt="5"><div className="card-in">
          <span className="glare" aria-hidden="true" />
          <h3>עיצוב גבות</h3>
          <p>עיצוב עדין של הגבות, בהתאם לתווי הפנים, למראה טבעי ומסודר.</p>
        </div></article>
        <article className="card soon" data-r="" data-tilt="5"><div className="card-in">
          <span className="glare" aria-hidden="true" />
          <span className="tag">בהמשך</span>
          <h3>טיפולי פנים וקוסמטיקה</h3>
          <p>אנחנו מתרחבות בהדרגה. פרטים יפורסמו כשיהיו מוכנים.</p>
        </div></article>
      </div>
    </section>

    <section id="guide" className="pedia-sec"><div className="light" aria-hidden="true" /><div className="depth" aria-hidden="true"><i data-par="0.9" /><i data-par="-0.7" /><b data-par="1.5" /></div><div className="wrap sec">
      <p className="eyebrow" data-r="">מילון קצר לאפילציה במחט</p>
      <H2>מה חשוב לדעת</H2>
      <div className="ggrid">{FEAT.map((sl) => { const i = TERMS.findIndex((t) => t.slug === sl); return <PediaCard key={sl} t={TERMS[i]} i={i} reveal />; })}</div>
      <a className="btn ghost-d" href={path('/guide/')}>לכל {TERMS.length} המונחים ←</a>
    </div></section>

    <section className="band"><div className="wrap sec">
      <H2>למה חנה רבקה</H2>
      <div className="why">
        <div data-r=""><h3>לנשים בלבד</h3><p>סביבה צנועה, שקטה ודיסקרטית.</p></div>
        <div data-r=""><h3>התמחות אחת</h3><p>אפילציה במחט היא העיקר, וזה מה שנעשה כאן כל יום.</p></div>
        <div data-r=""><h3>יחס אישי</h3><p>כל טיפול מותאם לך, בקצב שלך ובלי לחץ.</p></div>
      </div>
    </div></section>

    <section className="wrap sec">
      <H2>איך זה עובד</H2>
      <ol className="steps" data-rs=""><li><b>שולחת הודעה</b>בוואטסאפ או בטלפון</li><li><b>פגישת היכרות</b>בודקים יחד ומתאימים תוכנית</li><li><b>מגיעה לקליניקה</b>בילו 14, בני ברק</li><li><b>סדרת טיפולים</b>בקצב שמתאים לך</li></ol>
    </section>

    <section id="faq" className="wrap sec">
      <H2>שאלות נפוצות</H2>
      {faqs.map(([q, a]) => (<details key={q} data-r=""><summary>{q}</summary><p>{a}</p></details>))}
    </section>

    <section id="contact" className="band"><div className="wrap sec contact">
      <div>
        <H2>יצירת קשר</H2>
        <p><b>כתובת:</b> {SITE.street}, {SITE.city} · <a href={SITE.map} target="_blank" rel="noopener">פתיחה במפות</a></p>
        <p><b>טלפון / וואטסאפ:</b> <a href={'tel:' + SITE.phoneIntl}>{SITE.phone}</a></p>
        <p>קליניקה לנשים בלבד.</p>
        <a className="btn" href={SITE.wa}>שלחי הודעה בוואטסאפ</a>
      </div>
      <a className="map" data-r="" href={SITE.map} target="_blank" rel="noopener"><span className="map-rings" aria-hidden="true" />{SITE.street}, {SITE.city} · לניווט ←</a>
    </div></section>
  </main>
  <Footer />
  <Floating />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
</>); }
