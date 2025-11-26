import React from 'react';
import {Img, staticFile, AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from 'remotion';
import styles from './Overlay.module.css';

import { useComposition } from '../CompositionContext';

export const Overlay: React.FC<{
    className?: string;
}> = ({className}) => {
    const { overlaySrc, subtitleIcon, orientation, title, subtitle } = useComposition();
    const isPortrait = orientation === 'portrait';
    const frame = useCurrentFrame();
    const {fps} = useVideoConfig();

    // Animation Config
    const entranceDuration = .75 * fps; // 1 second slide in
    const stayDuration = 5 * fps;     // 5 seconds stay
    const exitDuration = .75 * fps;     // 1 second slide out

    const translateX = interpolate(
        frame,
        [0, entranceDuration, entranceDuration + stayDuration, entranceDuration + stayDuration + exitDuration],
        [100, 0, 0, -100],
        {
            easing: Easing.inOut(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // Text Animations
    const textEntranceStart = entranceDuration ; // Start halfway through overlay entrance
    const textEntranceDuration = 0.3 * fps;

    const titleTranslateY = interpolate(
        frame,
        [textEntranceStart, textEntranceStart + textEntranceDuration],
        [100, 0],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const subtitleTranslateY = interpolate(
        frame,
        [textEntranceStart + 10, textEntranceStart + textEntranceDuration + 10], // 10 frames delay
        [100, 0],
        {
            easing: Easing.out(Easing.ease),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    return (
        <AbsoluteFill 
            className={`${styles.container} ${isPortrait ? styles.portrait : styles.landscape} ${className || ''}`}
            style={{
                transform: `translateX(${translateX}%)`
            }}
        >
            {overlaySrc && (
                <Img src={staticFile(overlaySrc)} className={styles.backgroundImage} />
            )}
            
            <div className={styles.content}>
                <div className={styles.mask}>
                    <h1 className={styles.title} style={{transform: `translateY(${titleTranslateY}%)`}}>
                        {title}
                    </h1>
                </div>
                <div className={styles.mask}>
                    <div className={styles.subtitleRow} style={{transform: `translateY(${subtitleTranslateY}%)`}}>
                        <span className={styles.subtitle}>{subtitle}</span>
                        {subtitleIcon && (
                            <Img src={staticFile(subtitleIcon)} className={styles.icon} />
                        )}
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
