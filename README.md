# חנה רבקה · Chana Rivka

אתר הקליניקה של חנה רבקה: הסרת שיער לצמיתות במחט חשמלית, ועיצוב גבות. לנשים בלבד, בילו 14, בני ברק.

Hebrew, right-to-left clinic site. Next.js App Router, exported as static HTML (`output: 'export'`). Copy and design live in `app/` and `public/`; do not restyle or rewrite them here.

The slogan is **בדיוק את.**

## מותג · Brand

| | |
|---|---|
| Cream / קרם | `#FBF8F2` |
| Charcoal / פחם | `#262422` |
| Orange fills / כתום (מילוי) | `#FF5A1F` |
| Orange text / כתום (טקסט) | `#A93D10` |
| Type / גופן | Heebo ExtraLight (`font-weight: 200`). Latin labels use Jost. |
| Slogan / סלוגן | בדיוק את. |

Orange fills stay `#FF5A1F`. Orange text stays `#A93D10` so it meets contrast on cream.

## הרצה · Run locally

Node.js 20 or newer.

```bash
npm ci
npm run dev
```

Dev server: [http://localhost:3000](http://localhost:3000).

## בנייה · Build and static export

```bash
npm ci
npm run build
```

`next build` writes the static site to `out/`. Trailing slashes are on, so each route is a directory with `index.html`.

| Route | Page |
|---|---|
| `/` | Home |
| `/guide/` | מה חשוב לדעת |
| `/guide/machat/` | מחט חשמלית |
| `/guide/zkik/` | זקיק |
| `/guide/machzor/` | מחזור צמיחה |
| `/guide/ezorim/` | כל האזורים |
| `/guide/kol-hasear/` | כל סוגי השיער |
| `/guide/koev/` | "זה נורא כואב" |
| `/guide/tochnit/` | כמה טיפולים? |
| `/guide/acharei/` | אחרי הטיפול |
| `/guide/gabot/` | עיצוב גבות |
| `/accessibility/` | הצהרת נגישות |

Also generated: `out/sitemap.xml`, `out/robots.txt`.

Preview the export:

```bash
npx --yes serve out
```

## מה יש בריפו · What this repo is

This repository is the source of the new site. Business details (name, phone, address, canonical URL) are in `app/site.js`. No custom domain is configured here.

A push to `main` (or this preview branch) runs `.github/workflows/pages.yml`, which builds the static export and deploys it to GitHub Pages:

https://moshehm.github.io/chana-rivka-salon/

That build sets `NEXT_PUBLIC_BASE_PATH=/chana-rivka-salon` so CSS, JS, fonts, images, and in-site links work under the project subpath. A local `npm run build` leaves the base path empty and still exports to the domain root.
