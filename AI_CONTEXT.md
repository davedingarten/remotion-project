# Samsung Remotion Project - AI Context Document

> **Last Updated:** January 2026  
> **Purpose:** Comprehensive context for AI assistants working on this project

---

## 1. Project Summary

This is a **Remotion-based programmatic video generator** for Samsung marketing assets. It produces video advertisements in multiple aspect ratios (16:9, 9:16, 4K variants) from a single React codebase, with content driven by a JSON data source.

### Tech Stack
- **Framework:** Remotion 4.0.377 + React 19
- **Styling:** CSS Modules (`.module.css` files)
- **Validation:** Zod schemas
- **Build:** Webpack with custom overrides
- **Editor:** Vite + React frontend with Express API backend

---

## 2. Project Structure

```
samsung-remotion/
├── src/                          # Remotion video source
│   ├── index.ts                  # Entry point
│   ├── Root.tsx                  # Composition registration
│   ├── MainComposition.tsx       # Main layout orchestrator
│   ├── CompositionSchema.ts      # Zod schema for props
│   ├── CompositionContext.tsx    # React Context for data
│   ├── data.json                 # ⭐ SINGLE SOURCE OF TRUTH
│   ├── compositions.json         # Video format definitions
│   ├── index.css                 # Global styles (fonts)
│   ├── fonts/                    # Samsung brand fonts
│   └── components/               # Video components
│       ├── Background.tsx/.module.css
│       ├── Logo.tsx/.module.css
│       ├── Title.tsx/.module.css
│       ├── VideoContainer.tsx/.module.css
│       ├── OfferBadge.tsx/.module.css
│       ├── Overlay.tsx/.module.css
│       └── Disclaimer.tsx/.module.css
│
├── editor/                       # Content editor UI
│   └── src/
│       ├── App.tsx               # Main editor app
│       ├── components/
│       │   ├── FormPanel.tsx     # Data editing form
│       │   └── PreviewPanel.tsx  # Live video preview
│       ├── hooks/
│       │   └── useCompositionData.ts
│       └── api/
│           └── dataApi.ts        # API client
│
├── server/                       # Express API server
│   └── src/
│       └── index.ts              # Endpoints for data & rendering
│
├── public/                       # Static assets
│   ├── *.png, *.svg              # Logos and images
│   └── video/                    # Source video files
│       ├── video_landscape.mp4
│       └── video_portrait.mp4
│
├── out/                          # Rendered output videos
├── build/                        # Remotion bundle output
│
├── shared-config.ts              # ⭐ Webpack & quality settings
├── render-all.ts                 # Batch render script
├── remotion.config.ts            # Remotion CLI config
└── package.json
```

---

## 3. Data Architecture

### 3.1 Content Data (`src/data.json`)

```json
{
    "title": "Galaxy Tab S14 Series 21",
    "subtitle": "Galaxy AI",
    "subtitleIcon": "icon_ai.png",
    "offerText": "Ontvang nu tijdelijk de<br/><strong>Galaxy Buds3 Pro*</strong><br/>(adviesprijs €319)",
    "disclaimer": "* Actieperiode: ...",
    "videoSrcLandscape": "video/video_landscape.mp4",
    "videoSrcPortrait": "video/video_portrait.mp4",
    "logoSrc": "Samsung_Orig_Wordmark_BLACK_RGB.svg",
    "offerImage": "buds3pro.png",
    "overlaySrc": "overlay.png"
}
```

**Important Notes:**
- `offerText` supports **HTML** for formatting (`<strong>`, `<br/>`)
- All asset paths are relative to `public/`
- This file is read/written by the API server

### 3.2 Composition Definitions (`src/compositions.json`)

```json
[
    { "id": "Landscape", "width": 1920, "height": 1080, "fps": 30, "durationInFrames": 300, "orientation": "landscape" },
    { "id": "Portrait", "width": 1080, "height": 1920, "fps": 30, "durationInFrames": 300, "orientation": "portrait" },
    { "id": "Landscape4K", "width": 3840, "height": 2160, "fps": 30, "durationInFrames": 300, "orientation": "landscape" },
    { "id": "Portrait4K", "width": 2160, "height": 3840, "fps": 30, "durationInFrames": 300, "orientation": "portrait" },
    { "id": "LandscapeEmpty", "width": 3840, "height": 2160, "fps": 30, "durationInFrames": 300, "orientation": "portrait", "customWidth": 1280 }
]
```

### 3.3 Schema (`src/CompositionSchema.ts`)

All props are validated with Zod:
```typescript
export const CompositionSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
    logoSrc: z.string(),
    videoSrcLandscape: z.string(),
    videoSrcPortrait: z.string(),
    offerText: z.string(),
    offerImage: z.string(),
    disclaimer: z.string(),
    overlaySrc: z.string().optional(),
    subtitleIcon: z.string().optional(),
    customWidth: z.number().optional(),
});
```

---

## 4. Component Architecture

### 4.1 Data Flow

```
data.json
    ↓
Root.tsx (loads data, registers Compositions)
    ↓
MainComposition.tsx (wraps with CompositionProvider)
    ↓
CompositionContext (React Context)
    ↓
Child components (useComposition() hook)
```

### 4.2 MainComposition Layout Logic

```typescript
// Landscape: Side-by-side layout (70% video, 30% content)
// Portrait: Stacked layout (video on top, content below)

const isLandscape = props.orientation === 'landscape';

// Timeline:
const VIDEO_DURATION = 7 * fps;      // Video plays for 7 seconds
const OVERLAY_ENTRANCE = 1 * fps;    // Overlay slides in over 1 second
```

### 4.3 Component Responsibilities

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `Background` | Solid background layer | Simple fill |
| `Logo` | Samsung wordmark | SVG via `<Img />` for sharpness |
| `Title` | Main title + subtitle + icon | Positioned based on orientation |
| `VideoContainer` | Plays the source video | Chooses landscape/portrait source |
| `OfferBadge` | Promotional badge with product image | Spring animations, pulse effect, HTML text support |
| `Overlay` | End-card overlay | Slides in from right/bottom |
| `Disclaimer` | Legal text | Small footer text |

### 4.4 Animation Patterns

**Spring animations** (Remotion's `spring()` function):
```typescript
const scale = spring({
    frame: frame - startFrame,
    fps,
    from: 0,
    to: 1,
    config: { stiffness: 100 }
});
```

**OfferBadge has three animation phases:**
1. Box entrance (scale from 0 → 1)
2. Image entrance (delayed scale from 0 → 1)
3. Pulse effect (periodic scale to 1.1 and back)

---

## 5. Styling Conventions

### 5.1 CSS Modules

**DO:** Use CSS Modules for all component styling
```css
/* Component.module.css */
.container { ... }
.landscape { ... }
.portrait { ... }
.Landscape4K { ... }  /* Composition-specific override */
```

**DON'T:** Use Tailwind (it was removed from the project)

### 5.2 Composition-Specific Styles

Components receive `compositionId` and can apply specific styles:
```tsx
<div className={`${styles.container} ${styles[compositionId] || ''}`}>
```

In CSS:
```css
.container { /* default */ }
.Landscape { /* 1080p landscape specific */ }
.Portrait { /* portrait specific */ }
.Landscape4K { /* 4K specific */ }
```

### 5.3 Fonts

Samsung brand fonts loaded in `index.css`:
- SamsungOne-400C (body text)
- SamsungSharpSans-Bold/Medium/Regular (headlines)

---

## 6. Configuration

### 6.1 Shared Config (`shared-config.ts`)

```typescript
export const VIDEO_FPS = 30;
export const VIDEO_CRF = 18;           // Quality (lower = better)
export const VIDEO_FORMAT = 'jpeg';    // Frame format

export const webpackOverride = ...     // Enables CSS Modules
```

### 6.2 Remotion Config (`remotion.config.ts`)

Imports and applies `webpackOverride` from shared config.

---

## 7. Development Workflows

### 7.1 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Open Remotion Studio (preview all compositions) |
| `npm run editor` | Full editor environment (server + client + studio) |
| `npm run render` | Render Landscape to `out/Landscape.mp4` |
| `npm run render:all` | Render all compositions |
| `npm run build` | Bundle for production |

### 7.2 Editor Workflow

1. Run `npm run editor` (automatically clears ports and starts 3 services)
2. Editor UI opens automatically at `http://localhost:3000/` (Vite)
3. API Server runs on `http://localhost:3001`
4. Remotion Studio runs on `http://localhost:3002` (no auto-open)

### 7.3 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/data` | GET | Read data.json |
| `/api/data` | POST | Write data.json |
| `/api/compositions` | GET | Read compositions.json |
| `/api/render` | POST | Start render:all |
| `/api/render/single` | POST | Render single composition |
| `/api/render/status` | GET | Get render progress |

---

## 8. Rendering

### 8.1 Quality Settings

- **CRF:** 18 (high quality, reasonable file size)
- **Codec:** H.264
- **Frame format:** JPEG

### 8.2 Batch Rendering (`render-all.ts`)

Uses `@remotion/renderer` programmatically:
1. Bundles the project with webpack
2. Discovers all compositions
3. Renders each with progress logging
4. Outputs to `out/{compositionId}.mp4`

---

## 9. Key Patterns to Follow

### DO:
- ✅ All text/content comes from `data.json`
- ✅ Use CSS Modules for styling (`.module.css`)
- ✅ Use `useComposition()` hook to access data in components
- ✅ Support both orientations in components
- ✅ Use Remotion's `<Img />` for images, `staticFile()` for paths
- ✅ Use `spring()` for animations
- ✅ Add composition-specific CSS classes when needed

### DON'T:
- ❌ Use Tailwind CSS
- ❌ Hardcode text in components
- ❌ Use raw `<img>` tags (breaks in Remotion)
- ❌ Forget to handle both landscape and portrait layouts

---

## 10. Common Tasks

### Adding a New Field to Data

1. Add field to `src/data.json`
2. Add field to `CompositionSchema.ts`
3. Access via `useComposition()` in components
4. Update editor's `FormPanel.tsx` to include the field

### Adding a New Composition

1. Add entry to `src/compositions.json`
2. Add composition-specific CSS if needed (`.NewCompositionId { ... }`)
3. Run `npm run render:all` to generate

### Modifying Animations

Animation timing is controlled in each component:
- Start delays (seconds → frames conversion)
- Spring configurations (`stiffness`, `damping`, `mass`)
- Sequence timing in `MainComposition.tsx`

---

## 11. Troubleshooting

| Issue | Solution |
|-------|----------|
| CSS not applying | Check CSS Modules syntax, verify webpack override |
| Images not loading | Use `staticFile()` wrapper, check `public/` path |
| Animation jitter | Clamp spring values after completion |
| Editor not connecting | Ensure server is running on port 3001 |
| Port conflicts | `npm run editor` auto-clears ports; manual: `lsof -ti:3000,3001,3002 \| xargs kill -9` |
| Render fails | Check console for missing assets or type errors |

---

## 12. Future Considerations

- The project supports HTML in `offerText` for rich formatting
- `customWidth` prop allows constraining content width independently
- Orientation is passed explicitly, not derived from dimensions
- The editor supports real-time preview via Remotion Player

---

*This document should provide comprehensive context for any AI assistant working on this project.*
