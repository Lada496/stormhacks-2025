import styles from "./page.module.css";
import Header from "./components/Header"; // Adjust the path based on your folder structure
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>
            Get started by editing da code in <code>src/app/page.js</code>.
          </li>
          <li>Save da project and see your changes instantly.</li>
        </ol>

        <Header></Header>
        <Footer></Footer>
      </main>
    </div>
  );
}
