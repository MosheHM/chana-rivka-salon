# Quick Deploy Reference

Choose your deployment platform and follow the steps:

## 🚀 Vercel (Recommended - Easiest)

1. Push code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables (if needed):
   - `GEMINI_API_KEY`
   - `RESEND_API_KEY`
5. Click Deploy

**That's it!** Your site will be live in ~2 minutes.

## 🌐 Netlify

1. Push code to GitHub
2. Visit [app.netlify.com/start](https://app.netlify.com/start)
3. Connect repository
4. Deploy settings are auto-detected
5. Add environment variables in Site Settings
6. Deploy

## 🚂 Railway

1. Visit [railway.app](https://railway.app)
2. Click "Deploy from GitHub repo"
3. Select repository
4. Add environment variables
5. Deploy automatically starts

## 🐳 Docker

```bash
# Build
docker build -t chana-rivka-salon .

# Run
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=your_key \
  -e RESEND_API_KEY=your_key \
  chana-rivka-salon

# Or use docker-compose
docker-compose up
```

## 📚 Full Documentation

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive guides, troubleshooting, and advanced configurations.
