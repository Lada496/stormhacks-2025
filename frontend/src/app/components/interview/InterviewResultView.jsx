import styles from "./InterviewResultView.module.css";
import ResultCard from "../ResultCard";

export default function InterviewResultView({ interviewScore, feedback }) {
  const formatFeedback = (feedbackText) => {
    if (!feedbackText) return [];
    
    // Split by bullet points or newlines and clean up
    return feedbackText
      .split(/[•\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };

  const feedbackItems = formatFeedback(feedback);

  return (
    <div className={styles.review}>
      <div className={styles["score-container"]}>
        <div className={styles["overall-score-box"]}>
          {interviewScore}%
        </div>
        <h2 className={styles.score}>Interview Score</h2>
      </div>

      <div className={styles["detailed-score-container"]}>
        <div className={styles.wrapper}>
          <ResultCard title="performance rating">
            <div className={styles.progressBarContainer}>
              <div
                style={{
                  ...style.progressBar,
                  width: `${interviewScore}%`,
                }}
              ></div>
            </div>
            <div className={styles.xpText}>{interviewScore}%</div>
          </ResultCard>
        </div>

        <div className={styles.wrapper}>
          <ResultCard title="interview grade">
            <div className={styles.gradeContainer}>
              <div className={styles.gradeLetter}>
                {getGradeLetter(interviewScore)}
              </div>
            </div>
          </ResultCard>
        </div>
      </div>

      <ResultCard title="Interview Feedback">
        <div className={styles["feedback-box"]}>
          {feedbackItems.length > 0 ? (
            <ul className={styles.feedbackList}>
              {feedbackItems.map((item, index) => (
                <li key={index} className={styles.feedbackItem}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noFeedback}>No specific feedback provided.</p>
          )}
        </div>
      </ResultCard>
    </div>
  );
}

const getGradeLetter = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

const style = {
  progressBar: {
    height: "100%",
    backgroundColor: "#9333ea", // Purple for interview progress bar
  },
};