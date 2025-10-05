import styles from "./ResultView.module.css";
import ResultCard from "./ResultCard";

export default function ResultView({ response }) {
  console.log({ response });
  return (
    <div className={styles.review}>
      <div className={styles["score-container"]}>
        <div className={styles["overall-score-box"]}>
          {response.overallScore}%
        </div>
        <h2 className={styles.score}>Overall score</h2>
      </div>

      <div className={styles["detailed-score-container"]}>
        <div className={styles.wrapper}>
          <ResultCard title="content quality">
            <div className={styles.progressBarContainer}>
              <div
                style={{
                  ...style.progressBar,
                  width: `${response.contentQualityScore}%`,
                }}
              ></div>
            </div>
            <div className={styles.xpText}>{response.contentQualityScore}%</div>
          </ResultCard>
        </div>

        <div className={styles.wrapper}>
          <ResultCard title="keywords">
            <div className={styles.progressBarContainer}>
              <div
                style={{
                  ...style.progressBar,
                  width: `${response.keywordScore}%`,
                }}
              ></div>
            </div>
            <div className={styles.xpText}>{response.keywordScore}%</div>
          </ResultCard>
        </div>
      </div>

      <ResultCard title="Feedback">
        <div className={styles["feedback-box"]}>
          <p>{response.feedback}</p>
        </div>
      </ResultCard>
    </div>
  );
}

const style = {
  progressBar: {
    height: "100%",
    backgroundColor: "#73b5dd", // Light blue for the progress bar
  },
};
