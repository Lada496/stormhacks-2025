import { useState, useRef } from 'react';

/**
 * Custom hook for managing chunky loading progress animation
 * Progress moves quickly at start, slows in middle, crawls at end (75-95%)
 * Caps at 95% until completion, then jumps to 100%
 */
export function useLoadingProgress() {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const startProgress = () => {
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95; // Cap at 95% until API returns

        // Variable chunky increments based on progress
        let increment;
        if (prev < 40) {
          // Start: Fast chunks (2-6% jumps)
          increment = Math.random() * 4 + 2;
        } else if (prev < 75) {
          // Middle: Slower, more deliberate (0.5-2% jumps)
          increment = Math.random() * 1.5 + 0.5;
        } else {
          // Last 20%: Crawling (0.1-0.5% tiny increments)
          increment = Math.random() * 0.4 + 0.1;
        }

        return Math.min(prev + increment, 95);
      });
    }, 300); // Update every 300ms for chunkier feel
  };

  const completeProgress = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setProgress(100);
    // Small delay to show 100% before hiding
    await new Promise(resolve => setTimeout(resolve, 300));
  };

  const resetProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setProgress(0);
  };

  return {
    progress,
    startProgress,
    completeProgress,
    resetProgress
  };
}
