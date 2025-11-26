import React from 'react';
import styles from './Title.module.css';
import { useComposition } from '../CompositionContext';

export const Title: React.FC<{
	className?: string;
}> = ({className}) => {
    const { title, orientation } = useComposition();
    const isPortrait = orientation === 'portrait';

	return (
		<div className={`${styles.container} ${isPortrait ? styles.portrait : ''} ${className || ''}`}>
			<h1 className={styles.title}>{title}</h1>
		</div>
	);
};
