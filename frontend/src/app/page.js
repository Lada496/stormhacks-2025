import styles from "./page.module.css";
import Header from "./components/Header"; // Adjust the path based on your folder structure

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header></Header>
      </main>
    </div>
  );
}
