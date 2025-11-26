import React from 'react';
import {Img, staticFile} from 'remotion';
import styles from './Logo.module.css';
import { useComposition } from '../CompositionContext';

export const Logo: React.FC<{
	className?: string;
}> = ({className}) => {
    const { logoSrc, orientation } = useComposition();
    const isPortrait = orientation === 'portrait';

	return (
		<div className={`${styles.container} ${isPortrait ? styles.portrait : ''} ${className || ''}`}>
			<Img src={staticFile(logoSrc)} className={styles.image} />
		</div>
	);
};
