# Samsung Remotion Video Generator

A programmatic video generator for Samsung marketing assets using [Remotion](https://www.remotion.dev/) + React. Produces video advertisements in multiple aspect ratios from a single codebase.

## Quick Start

```bash
# Install dependencies
npm install
npm run editor:install   # Install editor & server dependencies

# Start the editor (recommended)
npm run editor

# Or just preview in Remotion Studio
npm run dev
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Open Remotion Studio (preview all compositions) |
| `npm run editor` | Full editor environment with live preview |
| `npm run render` | Render Landscape to `out/Landscape.mp4` |
| `npm run render:all` | Render all compositions |
| `npm run build` | Bundle for production |

## Project Structure

```
samsung-remotion/
├── src/                    # Remotion video source
│   ├── data.json           # ⭐ Content data (text, images)
│   ├── compositions.json   # Video format definitions
│   ├── components/         # Video components
│   └── fonts/              # Samsung brand fonts
├── editor/                 # Content editor UI (Vite + React)
├── server/                 # API server (Express)
├── public/                 # Static assets (images, videos)
├── out/                    # Rendered output videos
└── build/                  # Remotion bundle output
```

## Editor

The editor provides a UI for editing video content with live preview.

```bash
npm run editor
```

This starts three services:
- **Editor UI** at http://localhost:3000/ (opens automatically)
- **API Server** at http://localhost:3001
- **Remotion Studio** at http://localhost:3002

Edit content in the form panel and see changes reflected in real-time.

## Video Compositions

| ID | Dimensions | Aspect Ratio | Use Case |
|:---|:-----------|:-------------|:---------|
| `Landscape` | 1920×1080 | 16:9 | Standard video, YouTube |
| `Portrait` | 1080×1920 | 9:16 | TikTok, Reels, Shorts |
| `Landscape4K` | 3840×2160 | 16:9 | 4K displays |
| `Portrait4K` | 2160×3840 | 9:16 | 4K vertical |

## Content Data

All content is driven by `src/data.json`:

```json
{
  "title": "Galaxy Tab S14 Series",
  "subtitle": "Galaxy AI",
  "offerText": "Get the<br/><strong>Galaxy Buds3 Pro*</strong>",
  "disclaimer": "* Terms apply...",
  "videoSrcLandscape": "video/video_landscape.mp4",
  "videoSrcPortrait": "video/video_portrait.mp4",
  "logoSrc": "Samsung_Orig_Wordmark_BLACK_RGB.svg",
  "offerImage": "buds3pro.png"
}
```

**Note:** `offerText` supports HTML for formatting (`<strong>`, `<br/>`).

## Rendering

### Single Composition
```bash
npm run render                    # Landscape
npm run render:portrait           # Portrait
npm run render:4k                 # Landscape 4K
```

### All Compositions
```bash
npm run render:all
```

Output files are saved to the `out/` directory.

## Development

### Adding New Content Fields

1. Add field to `src/data.json`
2. Add field to `src/CompositionSchema.ts`
3. Access via `useComposition()` hook in components
4. Update `editor/src/components/FormPanel.tsx`

### Adding New Compositions

1. Add entry to `src/compositions.json`
2. Add composition-specific CSS if needed (`.NewId { ... }`)
3. Run `npm run render:all`

## Tech Stack

- **Framework:** Remotion 4.0 + React 19
- **Styling:** CSS Modules
- **Editor:** Vite + React
- **API:** Express
- **Validation:** Zod schemas

## Documentation

- [AI_CONTEXT.md](./AI_CONTEXT.md) - Detailed technical context for AI assistants

## License

UNLICENSED - Samsung proprietary
