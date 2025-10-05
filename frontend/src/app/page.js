"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Header from "./components/Header";
import GameModeCard from "./components/gameModeCard";
import AchievementCard from "./components/AchievementCard";
import Footer from "./components/Footer";
import PersonalStats from "@/app/components/PersonalStats";
import Interview from "./components/interview/Interview";
import ResumeReviewLite from "./components/ResumeReviewLite";
import ResumeReview from "./components/ResumeReview";
import ResultView from "./components/ResultView";

export default function Home() {
  const [currentView, setCurrentView] = useState("home");
  const [questData, setQuestData] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [userStats, setUserStats] = useState({
    level: 1,
    badges: 1,
    streak: 2,
    xp: 0, // Progress percentage for the current level
  });

  const handleStartAdventure = () => {
    setIsStarted(true);
  };

  const handleStartQuest = (questType, data) => {
    setCurrentView(questType);
    setQuestData(data);
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setQuestData(null);
  };

  const getContextText = () => {
    if (!isStarted) return null;
    if (currentView === "interview") return "📝 Behavioral Interview Quest";
    if (currentView === "resume") return "📄 Resume Review Quest";
    return "🏠 Quest Selection";
  };

  const response = {
    overallScore: 92,
    keywordScore: 95,
    contentQualityScore: 90,
    feedback:
      "John Doe is an excellent match for this Full-Stack Software Engineer position. With 5+ years of experience in full-stack development (exceeding the 3+ year requirement), he demonstrates strong proficiency in the exact technologies required: JavaScript, React, and Node.js. His resume shows direct experience developing and maintaining web applications using these frameworks, as well as building REST APIs. The candidate has strong AWS cloud experience, having led migration projects to AWS environments and worked with specific AWS services (EC2, S3, Lambda). He possesses knowledge of SQL as required, and has extensive experience with Agile/Scrum methodologies in cross-functional team settings. Additionally, John meets both preferred qualifications with Python experience (including Django framework) and familiarity with Docker. His QA testing experience aligns with the code quality requirement. Overall, John Doe's technical skills, relevant experience, and background in building scalable web applications make him a very strong candidate for this position.",
  };

  return (
    <div className={styles.page}>
      <Header
        isFullscreen={!isStarted}
        onStartAdventure={handleStartAdventure}
        contextText={getContextText()}
      />

      {isStarted && (
        <main className={styles.main}>
          {/* <ResultView error={false} response={response} /> */}
          {currentView === "home" && (
            <>
              <PersonalStats userStats={userStats} />
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
                  onStartQuest={() =>
                    handleStartQuest("interview", {
                      title: "BEHAVIORAL INTERVIEW",
                      theme: "pink",
                      xp: 100,
                    })
                  }
                />

                <GameModeCard
                  icon="/assets/resume-icon.png"
                  theme="blue"
                  title="RESUME REVIEW"
                  description="Optimize your resume with AI-powered feedback and tips"
                  xp={50}
                  buttonText="START QUEST"
                  size="small"
                  onStartQuest={() =>
                    handleStartQuest("resume", {
                      title: "RESUME REVIEW",
                      theme: "blue",
                      xp: 50,
                    })
                  }
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
            </>
          )}

          {currentView === "interview" && (
            <div className={styles.questView}>
              <Interview setCurrentView={setCurrentView} />
            </div>
          )}

          {currentView === "resume" && (
            <div className={styles.questView}>
              <h1 className={styles.questHeader}>{questData?.title}</h1>
              <div style={{ color: "#ffffff", fontSize: "1.5rem" }}>
                {/* <ResumeReviewLite setUserStats={setUserStats} /> */}
                <ResumeReview setUserStats={setUserStats} />
              </div>
              <button className={styles.backButton} onClick={handleBackToHome}>
                ← BACK TO HOME
              </button>
            </div>
          )}
        </main>
      )}

      {isStarted && <Footer />}
    </div>
  );
}
