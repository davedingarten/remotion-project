import React from 'react';
import styles from './Disclaimer.module.css';
import { useComposition } from '../CompositionContext';

export const Disclaimer: React.FC<{
	className?: string;
}> = ({className}) => {
    const { disclaimer, orientation } = useComposition();
    const isPortrait = orientation === 'portrait';

	return (
		<div className={`${styles.container} ${isPortrait ? styles.portrait : ''} ${className || ''}`}>
			<p className={styles.text}>{disclaimer}</p>
		</div>
	);
};
