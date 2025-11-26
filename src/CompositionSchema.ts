import {z} from 'zod';

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

export type CompositionProps = z.infer<typeof CompositionSchema>;
