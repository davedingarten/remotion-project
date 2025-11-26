import React from 'react';
import {AbsoluteFill} from 'remotion';
import styles from './Background.module.css';

export const Background: React.FC = () => {
	return (
		<AbsoluteFill className={styles.container}>
            <div className={styles.pattern} />
		</AbsoluteFill>
	);
};
