"use client";

import styles from "./page.module.css";
import Header from "./components/Header";
import GameModeCard from "./components/gameModeCard";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.questHeader}>CHOOSE YOUR QUEST</h1>

        <div className={styles.cardsContainer}>
          <GameModeCard
            icon="/assets/interview-icon.png"
            theme="pink"
            title="BEHAVIORAL INTERVIEW"
            description="Practice common interview questions and improve your answers"
            xp={100}
            buttonText="START QUEST"
            size="small"
            onStartQuest={() => console.log("Starting quest!")}
          />

          <GameModeCard
            icon="/assets/resume-icon.png"
            theme="blue"
            title="RESUME REVIEW"
            description="Optimize your resume with AI-powered feedback and tips"
            xp={50}
            buttonText="START QUEST"
            size="small"
            onStartQuest={() => console.log("Starting resume review!")}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
