
import { Service, WorkPost } from './types';

interface LocalizedContent {
  SERVICES: Service[];
  WORK_POSTS: WorkPost[];
}

export const content: { [key: string]: LocalizedContent } = {
  en: {
    SERVICES: [
      {
        id: 1,
        title: 'Signature Haircut & Style',
        description: 'A tailored cut and professional styling to perfectly suit your features and lifestyle.',
        price: 'Starting at $150',
        imageUrl: 'https://picsum.photos/id/1027/600/800',
      },
      {
        id: 2,
        title: 'Custom Hair Coloring',
        description: 'From balayage to full color, our experts create stunning, personalized results.',
        price: 'Starting at $250',
        imageUrl: 'https://picsum.photos/id/1062/600/800',
      },
      {
        id: 3,
        title: 'Luxury Hair Extensions',
        description: 'Add volume and length with premium, seamlessly blended hair extensions.',
        price: 'Price upon consultation',
        imageUrl: 'https://picsum.photos/seed/hairextensions/600/800',
      },
      {
        id: 4,
        title: 'Revitalizing Treatments',
        description: "Nourish and restore your hair's health with our keratin and deep conditioning treatments.",
        price: 'Starting at $200',
        imageUrl: 'https://picsum.photos/id/65/600/800',
      },
      {
        id: 5,
        title: 'Special Occasion Styling',
        description: 'Elegant updos and flawless styling for your most memorable events.',
        price: 'Starting at $120',
        imageUrl: 'https://picsum.photos/id/1074/600/800',
      },
      {
        id: 6,
        title: 'Bridal Hair Services',
        description: 'Bespoke bridal hair design to ensure you look breathtaking on your special day.',
        price: 'Price upon consultation',
        imageUrl: 'https://picsum.photos/id/306/600/800',
      },
    ],
    WORK_POSTS: [
        { id: 1, imageUrl: 'https://picsum.photos/seed/work1/600/600', caption: 'Golden hour balayage ✨', likes: 231 },
        { id: 2, imageUrl: 'https://picsum.photos/seed/work2/600/600', caption: 'Sharp bobs and fresh starts.', likes: 189 },
        { id: 3, imageUrl: 'https://picsum.photos/seed/work3/600/600', caption: 'Wedding day dreams coming true.', likes: 302 },
        { id: 4, imageUrl: 'https://picsum.photos/seed/work4/600/600', caption: 'Lived-in color perfection.', likes: 254 },
        { id: 5, imageUrl: 'https://picsum.photos/seed/work5/600/600', caption: 'Voluminous and vibrant.', likes: 198 },
        { id: 6, imageUrl: 'https://picsum.photos/seed/work6/600/600', caption: 'Cool tones for a chic look.', likes: 215 },
    ]
  },
  he: {
    SERVICES: [
        {
          id: 1,
          title: 'תספורת וסטיילינג ייחודיים',
          description: 'גזירה מותאמת אישית וסטיילינג מקצועי שיתאימו באופן מושלם לתווי הפנים ואורח החיים שלך.',
          price: 'החל מ-450₪',
          imageUrl: 'https://picsum.photos/id/1027/600/800',
        },
        {
          id: 2,
          title: 'צבע שיער מותאם אישית',
          description: 'מבליאז\' ועד צבע מלא, המומחים שלנו יוצרים תוצאות מדהימות ומותאמות אישית.',
          price: 'החל מ-700₪',
          imageUrl: 'https://picsum.photos/id/1062/600/800',
        },
        {
          id: 3,
          title: 'תוספות שיער יוקרתיות',
          description: 'הוסיפי נפח ואורך עם תוספות שיער פרימיום המשולבות באופן מושלם.',
          price: 'מחיר לפי ייעוץ',
          imageUrl: 'https://picsum.photos/seed/hairextensions/600/800',
        },
        {
          id: 4,
          title: 'טיפולים מחיים',
          description: 'הזיני ושקמי את בריאות שיערך עם טיפולי הקרטין וההזנה העמוקה שלנו.',
          price: 'החל מ-550₪',
          imageUrl: 'https://picsum.photos/id/65/600/800',
        },
        {
          id: 5,
          title: 'עיצוב לאירועים מיוחדים',
          description: 'תסרוקות ערב אלגנטיות וסטיילינג מושלם לאירועים הבלתי נשכחים שלך.',
          price: 'החל מ-350₪',
          imageUrl: 'https://picsum.photos/id/1074/600/800',
        },
        {
          id: 6,
          title: 'שירותי שיער לכלות',
          description: 'עיצוב שיער כלה מותאם אישית כדי להבטיח שתראי עוצרת נשימה ביום המיוחד שלך.',
          price: 'מחיר לפי ייעוץ',
          imageUrl: 'https://picsum.photos/id/306/600/800',
        },
    ],
    WORK_POSTS: [
        { id: 1, imageUrl: 'https://picsum.photos/seed/work1/600/600', caption: 'בליאז׳ של שעת הזהב ✨', likes: 231 },
        { id: 2, imageUrl: 'https://picsum.photos/seed/work2/600/600', caption: 'קארה חד והתחלות חדשות.', likes: 189 },
        { id: 3, imageUrl: 'https://picsum.photos/seed/work3/600/600', caption: 'חלומות יום החתונה מתגשמים.', likes: 302 },
        { id: 4, imageUrl: 'https://picsum.photos/seed/work4/600/600', caption: 'שלמות של צבע חי.', likes: 254 },
        { id: 5, imageUrl: 'https://picsum.photos/seed/work5/600/600', caption: 'מלא נפח ותוסס.', likes: 198 },
        { id: 6, imageUrl: 'https://picsum.photos/seed/work6/600/600', caption: 'גוונים קרירים למראה שיקי.', likes: 215 },
    ]
  }
};