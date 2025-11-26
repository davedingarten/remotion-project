import React from 'react';
import {spring, useCurrentFrame, useVideoConfig, Img, staticFile} from 'remotion';
import styles from './OfferBadge.module.css';

import { useComposition } from '../CompositionContext';

export const OfferBadge: React.FC<{
	className?: string;
    compositionId?: string;
}> = ({className, compositionId}) => {
    const { offerText, offerImage, orientation } = useComposition();
    const isPortrait = orientation === 'portrait';
    const imageSrc = offerImage;
    //console.log('OfferBadge Props:', { line1, line2, line3 });
    const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

    // Configuration: Start times in seconds
    const boxAppearanceDelay = 1; // Start after 1 second
    const imageAppearanceDelay = .5; // Image appears 1 second after box

    // Convert seconds to frames
    const boxStartFrame = boxAppearanceDelay * fps;
    const imageStartFrame = boxStartFrame + (imageAppearanceDelay * fps);

    const rawScaleBox = spring({
        frame: frame - boxStartFrame,
        fps,
        from: 0,
        to: 1,
        config: { stiffness: 100 }
    });
    // Clamp to 1 to prevent micro-jitters after animation
    const scaleBox = frame > boxStartFrame + (1 * fps) ? 1 : rawScaleBox;

    const scaleImage = spring({
        frame: frame - imageStartFrame,
        fps,
        from: 0,
        to: 1,
        config: { stiffness: 100 }
    });

    // Pulse Animation Logic
    const PULSE_START_DELAY = 1.5 * fps; // Start pulsing 1 second after appearance
    const PULSE_INTERVAL = 2 * fps; // Repeat every 2 seconds
    const PULSE_DURATION = 1 * fps; // Duration of the double pulse
    
    // Calculate time since image appeared
    const timeSinceAppearance = Math.max(0, frame - imageStartFrame);
    
    // Calculate time relative to the start of the pulsing phase
    const timeInPulsePhase = timeSinceAppearance - PULSE_START_DELAY;
    
    let pulseScale = 1;

    if (timeInPulsePhase >= 0) {
        const frameInPulse = timeInPulsePhase % PULSE_INTERVAL;

        if (frameInPulse < PULSE_DURATION) {
        // Create a double pulse: 0 -> 1 -> 0 -> 1 -> 0 (mapped to scale 1 -> 1.1 -> 1 -> 1.1 -> 1)
        
        // 0-25%: 1 -> 1.1
        // 25-50%: 1.1 -> 1
        // 50-75%: 1 -> 1.1
        // 75-100%: 1.1 -> 1
        
        const pulseProgress = (frameInPulse / PULSE_DURATION) * 2; // 0 to 2 (2 pulses)
        const singlePulse = Math.sin(pulseProgress * Math.PI); // 0 -> 1 -> 0
        
        // Ensure we only scale up
        const positivePulse = Math.abs(singlePulse);
        
        pulseScale = 1 + (positivePulse * 0.1);
        }
    }

    // Combine entrance scale with pulse scale
    // Once entrance is done (scaleImage is 1), pulse takes over
    const finalImageScale = scaleImage * pulseScale;

	return (
		<div 
            style={{transform: `translate3d(0px, 0px, 0.1px) perspective(100px) scale3d(${scaleBox}, ${scaleBox}, ${scaleBox})`}}
            className={`${styles.container} ${isPortrait ? styles.portrait : styles.landscape} ${compositionId ? styles[compositionId] : ''} ${className || ''}`}
        >
            {imageSrc && (
                <div 
                    className={styles.imageContainer}
                    style={{transform: `translate3d(0px, 0px, 0.1px) perspective(100px) scale3d(${finalImageScale}, ${finalImageScale}, ${finalImageScale})`}}
                >
                    <Img src={staticFile(imageSrc)} className={styles.image} />
                </div>
            )}
            <div 
                className={styles.textContainer}
                dangerouslySetInnerHTML={{ __html: offerText }}
            />
		</div>
	);
};
