# Deployment Guide - Chana Rivka Hair Salon

This guide provides comprehensive instructions for deploying the Chana Rivka Hair Salon website to various platforms.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Deployment Platforms](#deployment-platforms)
   - [Vercel (Recommended)](#vercel-recommended)
   - [Netlify](#netlify)
   - [Railway](#railway)
   - [Docker](#docker)
4. [Post-Deployment](#post-deployment)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:
- Node.js 20+ installed locally
- A Git repository (GitHub, GitLab, or Bitbucket)
- Gemini API key (if using AI features)
- Resend API key (for contact form functionality)

## Environment Variables

The application requires the following environment variables:

```bash
# Required for AI features
GEMINI_API_KEY=your_gemini_api_key_here

# Required for contact form (if using Resend)
RESEND_API_KEY=your_resend_api_key_here
```

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your API keys.

## Deployment Platforms

### Vercel (Recommended)

Vercel is the recommended platform as it's built by the Next.js team and offers seamless deployment.

#### Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your repository
5. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
6. Add environment variables:
   - Click "Environment Variables"
   - Add `GEMINI_API_KEY` with your API key
   - Add `RESEND_API_KEY` with your Resend API key (if applicable)
7. Click "Deploy"

Your site will be live at `https://your-project-name.vercel.app`

#### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Set environment variables
vercel env add GEMINI_API_KEY
vercel env add RESEND_API_KEY
```

### Netlify

#### Deploy via Netlify Dashboard

1. Push your code to GitHub, GitLab, or Bitbucket
2. Visit [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect to your Git provider and select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: (leave empty)
6. Add environment variables:
   - Go to "Site settings" → "Environment variables"
   - Add `GEMINI_API_KEY`
   - Add `RESEND_API_KEY`
7. Click "Deploy site"

#### Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Set environment variables
netlify env:set GEMINI_API_KEY your_key_here
netlify env:set RESEND_API_KEY your_key_here

# Deploy to production
netlify deploy --prod
```

### Railway

Railway provides a simple deployment platform with a generous free tier.

#### Deploy to Railway

1. Visit [railway.app](https://railway.app) and sign in
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Next.js settings
5. Add environment variables:
   - Go to your project → "Variables"
   - Add `GEMINI_API_KEY`
   - Add `RESEND_API_KEY`
6. Your app will automatically deploy

Alternatively, use the Railway CLI:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Add environment variables
railway variables set GEMINI_API_KEY=your_key_here
railway variables set RESEND_API_KEY=your_key_here

# Deploy
railway up
```

### Docker

For containerized deployments on platforms like AWS, Google Cloud, or Azure.

#### Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

#### .dockerignore

Create a `.dockerignore` file:

```
node_modules
.next
.git
.gitignore
README.md
.env.local
.DS_Store
```

#### Build and Run

```bash
# Build the Docker image
docker build -t chana-rivka-salon .

# Run the container
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=your_key_here \
  -e RESEND_API_KEY=your_key_here \
  chana-rivka-salon
```

#### Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - RESEND_API_KEY=${RESEND_API_KEY}
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## Post-Deployment

After deploying, verify:

1. **Homepage loads correctly**: Visit your deployment URL
2. **Navigation works**: Test all menu items and section links
3. **Contact form submits**: Fill out and submit the contact form
4. **Responsive design**: Test on mobile, tablet, and desktop viewports
5. **Environment variables**: Ensure API features work properly

### Custom Domain

Most platforms support custom domains:

- **Vercel**: Project Settings → Domains
- **Netlify**: Site Settings → Domain Management
- **Railway**: Project Settings → Domains

Add your domain and follow the platform's DNS configuration instructions.

### SSL Certificate

All recommended platforms automatically provision SSL certificates via Let's Encrypt. Your site will be served over HTTPS by default.

## Troubleshooting

### Build Fails

**Error**: `Cannot find module 'autoprefixer'`
```bash
npm install --save-dev autoprefixer
```

**Error**: Next.js build errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

1. Verify variables are set in your deployment platform
2. For client-side variables, prefix with `NEXT_PUBLIC_`
3. Redeploy after adding/changing environment variables
4. Check the platform's logs for detailed error messages

### Contact Form Issues

1. Verify `RESEND_API_KEY` is set correctly
2. Check that the API route at `/api/contact` is accessible
3. Review server logs in your deployment platform
4. Ensure the Resend domain is verified (if using custom domain)

### Performance Issues

1. Enable Next.js Image Optimization (Vercel/Netlify handle automatically)
2. Configure CDN caching rules
3. Use the platform's analytics to identify bottlenecks
4. Consider enabling ISR (Incremental Static Regeneration) for dynamic content

### Getting Logs

**Vercel**: Project → Deployments → Select deployment → View logs
**Netlify**: Site → Deploys → Select deploy → Deploy log
**Railway**: Project → Deployments → Select deployment → Logs

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Railway Documentation](https://docs.railway.app)
- [Docker Documentation](https://docs.docker.com)

## Support

For issues specific to this application, please open an issue in the GitHub repository.
