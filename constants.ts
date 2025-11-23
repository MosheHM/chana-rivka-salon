
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
        title: 'Organic Hair Smoothing',
        description: 'Natural ingredient-based smoothing for sleek, shiny, and healthy hair.',
        price: 'Starting at 550₪',
        imageUrl: 'https://placehold.co/600x800/F9F9F7/3E2723?text=Organic+Smoothing+Abstract',
        // videoUrl: '/videos/services/organic-smoothing.mp4', // Uncomment and add your MP4 file
      },
      {
        id: 2,
        title: 'Curl Opening',
        description: 'Reshape your curls for a softer, more manageable, and natural look.',
        price: 'Starting at 450₪',
        imageUrl: 'https://placehold.co/600x800/F9F9F7/3E2723?text=Curl+Opening+Abstract',
        // videoUrl: '/videos/services/curl-opening.mp4', // Uncomment and add your MP4 file
      },
      {
        id: 3,
        title: 'Hair Repair Treatment',
        description: 'Deep nourishing treatment to restore vitality and shine to damaged hair.',
        price: 'Starting at 300₪',
        imageUrl: 'https://placehold.co/600x800/F9F9F7/3E2723?text=Hair+Repair+Abstract',
        // videoUrl: '/videos/services/hair-repair.mp4', // Uncomment and add your MP4 file
      },
      {
        id: 4,
        title: 'Professional Hair Coloring',
        description: 'Expert color matching and application for stunning results.',
        price: 'Price upon consultation',
        imageUrl: 'https://placehold.co/600x800/F9F9F7/3E2723?text=Hair+Coloring+Abstract',
        // videoUrl: '/videos/services/hair-coloring.mp4', // Uncomment and add your MP4 file
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
          title: 'החלקת שיער אורגנית',
          description: 'החלקה המבוססת על רכיבים טבעיים לשיער חלק, מבריק ובריא.',
          price: 'החל מ-550₪',
          imageUrl: 'https://placehold.co/600x800/F9F9F7/3E2723?text=Organic+Smoothing+Abstract',
          // videoUrl: '/videos/services/organic-smoothing.mp4', // Uncomment and add your MP4 file
        },
        {
          id: 2,
          title: 'פתיחת תלתלים',
          description: 'עיצוב מחדש של התלתלים למראה טבעי, רך וקל לסידור.',
          price: 'החל מ-450₪',
          imageUrl: 'https://placehold.co/600x800/F9F9F7/3E2723?text=Curl+Opening+Abstract',
          // videoUrl: '/videos/services/curl-opening.mp4', // Uncomment and add your MP4 file
        },
        {
          id: 3,
          title: 'טיפול שיקום שיער',
          description: 'טיפול עמוק להזנה וחידוש סיב השערה, המחזיר לשיער את החיוניות.',
          price: 'החל מ-300₪',
          imageUrl: 'https://placehold.co/600x800/F9F9F7/3E2723?text=Hair+Repair+Abstract',
          // videoUrl: '/videos/services/hair-repair.mp4', // Uncomment and add your MP4 file
        },
        {
          id: 4,
          title: 'צביעת שיער מקצועית',
          description: 'צביעה מקצועית בגוונים מותאמים אישית לשמירה על בריאות השיער.',
          price: 'מחיר לפי ייעוץ',
          imageUrl: 'https://placehold.co/600x800/F9F9F7/3E2723?text=Hair+Coloring+Abstract',
          // videoUrl: '/videos/services/hair-coloring.mp4', // Uncomment and add your MP4 file
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
