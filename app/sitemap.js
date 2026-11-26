export const dynamic = 'force-static';
import { TERMS } from './terms';
export default function sitemap() { return [
  { url: 'https://chanarivkabeauty.co.il/guide/', priority: 0.8 },
  ...TERMS.map((t) => ({ url: `https://chanarivkabeauty.co.il/guide/${t.slug}/`, priority: 0.6 })),
  { url: 'https://chanarivkabeauty.co.il/', priority: 1 },
  { url: 'https://chanarivkabeauty.co.il/accessibility/', priority: 0.3 }]; }
