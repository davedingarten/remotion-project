import { bundle } from '@remotion/bundler';
import { getCompositions, renderMedia } from '@remotion/renderer';
import { webpackOverride, VIDEO_CRF, VIDEO_FORMAT } from './shared-config';
import path from 'path';

const start = async () => {
    console.log('Bundling video...');
    
    // Use shared webpack config
    const bundled = await bundle({
        entryPoint: path.resolve('./src/index.ts'),
        webpackOverride: webpackOverride,
    });

    const compositions = await getCompositions(bundled);
    console.log(`Found ${compositions.length} compositions`);
    console.log(`------------------------------------------------`);
    console.log(`Global Settings:`);
    console.log(`  CRF: ${VIDEO_CRF} (Quality)`);
    console.log(`  Format: ${VIDEO_FORMAT}`);
    console.log(`------------------------------------------------`);

    for (const composition of compositions) {
        console.log(`Starting render: ${composition.id}`);
        
        await renderMedia({
            codec: 'h264',
            composition,
            serveUrl: bundled,
            outputLocation: `out/${composition.id}.mp4`,
            crf: VIDEO_CRF,
            imageFormat: VIDEO_FORMAT as 'jpeg' | 'png' | 'none',
            onProgress: ({ progress }) => {
                const percentage = Math.round(progress * 100);
                process.stdout.write(`\rRendering... ${percentage}%`);
            },
        });
        process.stdout.write('\n'); // New line after render
        console.log(`✅ Rendered: out/${composition.id}.mp4`);
        console.log(`------------------------------------------------`);
    }
};

start().then(() => {
    console.log('All renders finished!');
    process.exit(0);
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
