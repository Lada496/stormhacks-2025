'use client';

import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ progress = 0 }) {
  return (
    <div className={styles.container}>
      <div className={styles.loadingCard}>
        {/* Animated Robot Carrying Blocks */}
        <div className={styles.robotContainer}>
          {/* Left pile of blocks */}
          <div className={styles.blockPile}>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
          </div>

          {/* Moving robot */}
          <div className={styles.robotWrapper}>
            <div className={styles.robot}>
              <div className={styles.robotHead}>
                <div className={styles.robotEye}></div>
                <div className={styles.robotEye}></div>
              </div>
              <div className={styles.robotBody}>
                <div className={styles.robotPanel}></div>
              </div>
            </div>
            {/* Block being carried */}
            <div className={styles.carriedBlock}></div>
          </div>

          {/* Right pile of blocks */}
          <div className={styles.completedPile}>
            <div className={styles.block}></div>
            <div className={styles.block}></div>
          </div>
        </div>

        <h2 className={styles.title}>ANALYZING YOUR RESUME</h2>
        <p className={styles.subtitle}>Please wait while our AI processes your submission...</p>

        {/* Single Dynamic Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressRow}>
            <div className={styles.progressBarContainer}>
              <div
                className={`${styles.progressBar} ${styles.active}`}
                style={{
                  width: `${progress}%`,
                  backgroundColor: '#3DF2A4'
                }}
              >
                <div className={styles.progressShine}></div>
              </div>
              <div className={styles.progressText}>{Math.floor(progress)}%</div>
            </div>
          </div>
        </div>

        {/* Fun Loading Messages */}
        <div className={styles.loadingMessages}>
          <div className={styles.loadingDots}>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
