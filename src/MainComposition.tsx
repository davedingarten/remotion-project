import React from 'react';
import { AbsoluteFill, useVideoConfig, Sequence } from 'remotion';
import { Background } from './components/Background';
import { Logo } from './components/Logo';
import { Title } from './components/Title';
import { VideoContainer } from './components/VideoContainer';
import { OfferBadge } from './components/OfferBadge';
import { Disclaimer } from './components/Disclaimer';
import { Overlay } from './components/Overlay';
import styles from './MainComposition.module.css';
import { CompositionProps } from './CompositionSchema';
import { CompositionProvider } from './CompositionContext';

type MainCompositionProps = CompositionProps & {
    orientation: 'landscape' | 'portrait';
    customWidth?: number;
};

export const MainComposition: React.FC<MainCompositionProps> = (props) => {
    const { id, fps } = useVideoConfig();
    const isLandscape = props.orientation === 'landscape';

    // Timeline Configuration
    const VIDEO_DURATION = 5 * fps; // Play video for 5 seconds
    const OVERLAY_ENTRANCE = 1 * fps; // Time for overlay to slide in (must match Overlay component)

    return (
        <CompositionProvider data={props}>
            <AbsoluteFill className={`${styles.container} ${styles[id] || ''}`}>
                <Background />

                {/* LAYOUT CONTAINER */}
                <AbsoluteFill>
                    <div 
                        className={`${styles.mainContainer} ${isLandscape ? styles.landscape : styles.portrait}`}
                        style={props.customWidth ? { width: props.customWidth } : {}}
                    >

                        <div className={styles.videoWrapper}>
                            <Sequence from={0} durationInFrames={VIDEO_DURATION + OVERLAY_ENTRANCE}>
                                <VideoContainer className={styles[id]} />
                                <Title className={styles[id]} />
                            </Sequence>
                            <Sequence from={VIDEO_DURATION}>
                                <Overlay className={styles[id]} />
                            </Sequence>
                              <Logo className={styles[id]} />
                        </div>

                        <div className={styles.contentWrapper}>
                            <OfferBadge
                                compositionId={id}
                                className={styles[id]}
                            />
                            <Disclaimer className={styles[id]} />
                        </div>
                      
                    </div>
                </AbsoluteFill>
            </AbsoluteFill>
        </CompositionProvider>
    );
};
