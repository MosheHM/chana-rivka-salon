# Service Videos Directory

This directory stores MP4 video files for the services section.

## Usage

1. Place your MP4 files in this directory
2. Update the `videoUrl` field in `constants.ts` to reference the video file path
3. The videos will be displayed like GIFs (autoplay, loop, muted, no controls)

## Example

If you place a file named `organic-smoothing.mp4` in this directory, you can reference it in constants.ts as:

```typescript
videoUrl: '/videos/services/organic-smoothing.mp4'
```

## Recommended Video Specifications

- Format: MP4 (H.264 codec)
- Aspect Ratio: 3:4 (portrait)
- Resolution: 600x800 or higher
- Duration: 2-5 seconds (short loops work best)
- File Size: Keep under 2MB for optimal loading performance
