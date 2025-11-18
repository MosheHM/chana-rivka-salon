<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Chana Rivka Hair Salon

A modern and elegant website for a bespoke hair salon, showcasing services and brand aesthetic.

View your app in AI Studio: https://ai.studio/apps/drive/1XYnjlDxNLr4Jniyb1OQ-yDlog756m6Ce

## Run Locally

**Prerequisites:** Node.js 20+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` and add your `GEMINI_API_KEY`

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Deploy

**Quick Start**: See [QUICK-DEPLOY.md](QUICK-DEPLOY.md) for fast deployment steps

**Full Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive instructions

Quick deploy to Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MosheHM/chana-rivka-salon)

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Email**: Resend (for contact form)
