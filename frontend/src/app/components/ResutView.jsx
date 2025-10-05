import styles from "./ResultView.module.css";
export default function ResultView({ score, feedback }) {
  return (
    <div className={styles.review}>
      <h2 className={styles.score}>Score: {score}</h2>
      <div className={styles.card}>
        <h3 className={styles["feedback-title"]}>Feedback</h3>
        <div className={styles["feedback-box"]}>
          <p>{feedback}</p>
        </div>
      </div>
    </div>
  );
}
