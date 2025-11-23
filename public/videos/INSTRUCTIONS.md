# Video Setup Instructions

This guide will help you add MP4 videos to your website once they are uploaded to the repository.

## Directory Structure

```
public/
└── videos/
    ├── services/     # Videos for service cards (4 videos)
    │   ├── README.md
    │   ├── organic-smoothing.mp4      (suggested name)
    │   ├── curl-opening.mp4           (suggested name)
    │   ├── hair-repair.mp4            (suggested name)
    │   └── hair-coloring.mp4          (suggested name)
    └── about/        # Video for about section (1 video)
        ├── README.md
        └── salon-interior.mp4         (suggested name)
```

## Step-by-Step Setup

### For Services Section Videos

1. **Upload your 4 service videos** to `public/videos/services/`
   - Recommended naming: Match the service type (e.g., `organic-smoothing.mp4`)

2. **Edit `constants.ts`** and uncomment the `videoUrl` lines:

```typescript
// Before:
{
  id: 1,
  title: 'Organic Hair Smoothing',
  description: '...',
  price: 'Starting at 550₪',
  imageUrl: 'https://placehold.co/600x800/...',
  // videoUrl: '/videos/services/organic-smoothing.mp4', // Uncomment and add your MP4 file
}

// After:
{
  id: 1,
  title: 'Organic Hair Smoothing',
  description: '...',
  price: 'Starting at 550₪',
  imageUrl: 'https://placehold.co/600x800/...',
  videoUrl: '/videos/services/organic-smoothing.mp4',
}
```

3. Repeat for all 4 services (Organic Smoothing, Curl Opening, Hair Repair, Hair Coloring)

### For About Section Video

1. **Upload your about video** to `public/videos/about/`
   - Suggested name: `salon-interior.mp4`

2. **Edit `components/About.tsx`** and change the `videoUrl` variable:

```typescript
// Find this line (around line 11):
const videoUrl = null; // Change to: '/videos/about/salon-interior.mp4' to use video

// Change it to:
const videoUrl = '/videos/about/salon-interior.mp4';
```

## Uploading Videos via GitHub

### Option 1: Web Interface (Easiest)
1. Go to https://github.com/MosheHM/chana-rivka-salon
2. Navigate to `public/videos/services/` or `public/videos/about/`
3. Click "Add file" → "Upload files"
4. Drag and drop your MP4 files
5. Commit the changes

### Option 2: Git Command Line
```bash
# Navigate to repository
cd /path/to/chana-rivka-salon

# Add videos
git add public/videos/services/*.mp4
git add public/videos/about/*.mp4

# Commit
git commit -m "Add service and about videos"

# Push
git push
```

## Video Specifications

### Services Videos
- **Format:** MP4 (H.264 codec)
- **Aspect Ratio:** 3:4 (portrait, like 600x800)
- **Duration:** 2-5 seconds (short loops work best)
- **File Size:** Under 2MB per video
- **Resolution:** 600x800 or higher

### About Video
- **Format:** MP4 (H.264 codec)
- **Aspect Ratio:** 4:5 or similar (portrait/vertical)
- **Duration:** 2-5 seconds (short loops work best)
- **File Size:** Under 3MB
- **Resolution:** 800x1000 or higher

## Verification

After adding videos and updating the code:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start dev server to test:**
   ```bash
   npm run dev
   ```

3. **Visit http://localhost:3000** and check:
   - Services section should show videos playing automatically
   - About section should show video instead of image
   - Videos should loop continuously
   - Videos should have no sound (muted)

## Troubleshooting

### Videos not showing?
- Check file paths match exactly (case-sensitive)
- Ensure videos are in correct directories
- Verify file names in code match actual file names
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Videos not playing?
- Check video format is MP4 with H.264 codec
- Try reducing file size
- Check browser console for errors

### Still having issues?
- Make sure `videoUrl` lines are uncommented in the code
- Verify videos uploaded successfully to GitHub
- Try rebuilding the project (`npm run build`)
