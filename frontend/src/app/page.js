"use client";

import styles from "./page.module.css";
import Header from "./components/Header";
import GameModeCard from "./components/gameModeCard";
import AchievementCard from "./components/AchievementCard";
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

        <h1 className={styles.questHeader}>ACHIEVEMENT HALL</h1>

        <div className={styles.achievementsContainer}>
          <AchievementCard
            title="INTERVIEW MASTER"
            description="Ace 10 behavioral interviews"
            unlockedDate="2024-02-20"
            size="small"
          />
          <AchievementCard
            title="WEEK WARRIOR"
            description="Maintain a 7-day streak"
            unlockedDate="2024-03-01"
            size="small"
          />
          <AchievementCard
            title="FIRST STEPS"
            description="Complete your first resume review"
            unlockedDate="2024-01-15"
            size="small"
          />
          <AchievementCard
            title="TECH EXPERT"
            description="Pass 5 technical interviews"
            unlockedDate="2024-03-10"
            size="small"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
