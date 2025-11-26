# Samsung Remotion Project Context

## 1. Project Overview
This is a **Remotion** video generation project for Samsung marketing assets. It generates video variations (Landscape, Portrait, Square, Story) from a single React codebase.

## 2. Tech Stack & Architecture
*   **Framework**: [Remotion](https://www.remotion.dev/) + React
*   **Styling**: **CSS Modules** (Tailwind was removed).
    *   Each component has its own `.module.css`.
    *   Global styles in `index.css` (fonts).
*   **Configuration**: Centralized in `shared-config.ts`
    *   Webpack overrides for CSS Modules
    *   Quality settings (CRF, video format)
    *   Shared between CLI config and Node.JS render script
*   **Data Source**: `src/data.json` is the **Single Source of Truth**.
    *   *Note:* Some text fields (e.g., `offerText`) support **HTML** for rich formatting.
*   **Assets**:
    *   Logos are SVG files rendered via `<Img />` for vector sharpness.
*   **Export**:
    *   Settings: CRF 18 (high quality), JPEG format
    *   CLI: `npm run render` (single composition)
    *   Batch: `npm run render:all` (dynamic script with progress logging)

## 3. Key Components
*   **`Root.tsx`**: Entry point. Defines compositions from `compositions.json`.
*   **`MainComposition.tsx`**: The orchestrator.
    *   Handles layout logic (70/30 split for Landscape, Stacked for Portrait).
    *   Passes `compositionId` and `orientation` to children.
*   **`OfferBadge`**:
    *   Renders `offerText` as HTML to allow bolding (`<strong>`) and line breaks (`<br/>`).
    *   Spring animation with pulse effect on image.
*   **`Logo`**:
    *   Renders SVG file from `data.json` using `Img` component.

## 4. Rendering Workflows
*   **Development**: `npm run dev` - Opens Remotion Studio
*   **Single Render**: `npm run render` - Renders Landscape composition
*   **Batch Render**: `npm run render:all` - Dynamically finds and renders all compositions
    *   Uses `render-all.ts` (TypeScript)
    *   Shows progress percentage and quality settings
    *   Automatically applies shared configuration

## 5. Current Status (As of Nov 2025)
*   ✅ **Responsive Layouts**: Works for 16:9, 9:16, 1:1.
*   ✅ **Dynamic Data**: Text and paths loaded from JSON.
*   ✅ **Rich Text**: Offer text supports HTML formatting.
*   ✅ **High Quality Export**: Optimized for sharpness (CRF 18) and stability.
*   ✅ **Centralized Config**: Single source of truth for webpack and quality settings.
*   ✅ **Dynamic Rendering**: Auto-discovers compositions with progress tracking.

---

## 6. AI Context Prompt (Copy-Paste this for future sessions)

**Use this prompt to onboard a new AI agent:**

> **Project Context: Samsung Remotion Video Generator**
> 
> **Goal:** Maintain and expand a Remotion (React) video project generating marketing assets in multiple aspect ratios.
> 
> **Architecture Rules:**
> 1.  **Styling:** Use **CSS Modules** only (`.module.css`). DO NOT use Tailwind.
> 2.  **Configuration:** All webpack and quality settings live in `shared-config.ts`.
> 3.  **Data:** All text/paths must come from `src/data.json`.
>     *   `offerText` supports HTML (e.g., `<strong>`, `<br/>`).
> 4.  **Layouts:** `MainComposition.tsx` handles all layouts. Use `useVideoConfig()` to detect orientation.
> 5.  **Composition Specifics:** To style a component differently for "Square" vs "Portrait":
>     *   The component receives `compositionId` as a prop.
>     *   In the CSS module, use a class matching the ID (e.g., `.Square { ... }`).
> 6.  **Rendering:** Use `npm run render:all` to generate all assets dynamically.
> 
> **Current State:**
> The project is fully functional with centralized configuration and dynamic batch rendering.
