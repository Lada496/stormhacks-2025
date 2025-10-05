'use client';

import styles from './ResumeParser.module.css';

/**
 * ResumeParser - Development helper component
 * Displays parsed resume text for debugging/testing purposes
 * Only shown in development mode
 */
export default function ResumeParser({ parsedText }) {
    if (!parsedText) return null;

    return (
        <div className={styles.container}>
            <div className={styles.resultSection}>
                <h3 className={styles.resultTitle}>PARSED TEXT (DEV ONLY)</h3>
                <div className={styles.textPreview}>
                    {parsedText}
                </div>
            </div>
        </div>
    );
}
