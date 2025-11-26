import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';
import styles from './VideoContainer.module.css';
import { useComposition } from '../CompositionContext';

export const VideoContainer: React.FC<{
	className?: string;
}> = ({className}) => {
    const { orientation, videoSrcLandscape, videoSrcPortrait } = useComposition();
    const isPortrait = orientation === 'portrait';
    const videoSrc = isPortrait ? videoSrcPortrait : videoSrcLandscape;

	return (
		<div className={`${styles.container} ${isPortrait ? styles.portrait : styles.landscape} ${className || ''}`}>
            {videoSrc ? (
                <OffthreadVideo 
                    src={staticFile(videoSrc)} 
                    className={styles.video}
                />
            ) : (
			    <div className={styles.placeholder}>
                    <span className={styles.placeholderText}>NO VIDEO SOURCE</span>
                </div>
            )}
		</div>
	);
};
