import styles from "./ResultCard.module.css";
export default function ResultCard({ children, title }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </div>
  );
}
