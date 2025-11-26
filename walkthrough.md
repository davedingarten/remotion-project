# Samsung Remotion Project Walkthrough

This project is a video generation app using Remotion, designed to output multiple formats (Landscape, Portrait, Square) from a single codebase.

## Project Structure

- **`src/Root.tsx`**: The entry point where all compositions are registered.
- **`src/MainComposition.tsx`**: The main responsive component that adapts layout based on dimensions.
- **`src/components/`**: Reusable components (Logo, Title, VideoContainer, etc.).

## Available Compositions

You can render the following compositions:

| ID | Dimensions | Aspect Ratio | Description |
| :--- | :--- | :--- | :--- |
| `Landscape` | 1920x1080 | 16:9 | Standard video format |
| `Portrait` | 1080x1920 | 9:16 | For TikTok / Reels / Shorts |
| `Square` | 1080x1080 | 1:1 | For Instagram Feed |
| `Story` | 1080x1920 | 9:16 | Same as Portrait (alias) |

## How to Run

1. **Install Dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start Preview Server**:
   ```bash
   npm run dev
   ```
   This will open the Remotion Player in your browser where you can see all compositions.

3. **Render a Video**:
   To render a specific composition (e.g., Landscape):
   ```bash
   npx remotion render Landscape out/landscape.mp4
   ```

## Customization

- **Assets**: Place your video files in `public/` and update `VideoContainer.tsx` to point to them.
- **Styling**: TailwindCSS is configured. You can edit classes in the components directly.
- **Data**: Currently hardcoded in `MainComposition.tsx`. You can replace this with props or a JSON data source.

## Verification

We have implemented a responsive design in `MainComposition.tsx` that switches layout based on `width > height`.
- **Landscape**: Side-by-side layout.
- **Portrait/Square**: Stacked layout.

Check the preview to see the layout adapt automatically!
