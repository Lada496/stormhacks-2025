"use client";

import {useState} from "react";
import styles from "./page.module.css";
import Header from "./components/Header";
import GameModeCard from "./components/gameModeCard";
import AchievementCard from "./components/AchievementCard";
import Footer from "./components/Footer";

export default function Home() {
    const [currentView, setCurrentView] = useState("home"); // home, interview, resume
    const [questData, setQuestData] = useState(null);
    const [isStarted, setIsStarted] = useState(false);

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

    return (
        <div className={styles.page}>
            <Header
                isFullscreen={!isStarted}
                onStartAdventure={handleStartAdventure}
                contextText={getContextText()}
            />

            {isStarted && <main className={styles.main}>
                {currentView === "home" && (
                    <>
                        <PersonalStats/>
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
                                onStartQuest={() => handleStartQuest("interview", {
                                    title: "BEHAVIORAL INTERVIEW",
                                    theme: "pink",
                                    xp: 100
                                })}
                            />

                            <GameModeCard
                                icon="/assets/resume-icon.png"
                                theme="blue"
                                title="RESUME REVIEW"
                                description="Optimize your resume with AI-powered feedback and tips"
                                xp={50}
                                buttonText="START QUEST"
                                size="small"
                                onStartQuest={() => handleStartQuest("resume", {
                                    title: "RESUME REVIEW",
                                    theme: "blue",
                                    xp: 50
                                })}
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
                        <h1 className={styles.questHeader}>{questData?.title}</h1>
                        <p style={{color: "#ffffff", fontSize: "1.5rem"}}>
                            Interview quest content will go here...
                        </p>
                        <button
                            className={styles.backButton}
                            onClick={handleBackToHome}
                        >
                            ← BACK TO HOME
                        </button>
                    </div>
                )}

                {currentView === "resume" && (
                    <div className={styles.questView}>
                        <h1 className={styles.questHeader}>{questData?.title}</h1>
                        <p style={{color: "#ffffff", fontSize: "1.5rem"}}>
                            Resume review quest content will go here...
                        </p>
                        <button
                            className={styles.backButton}
                            onClick={handleBackToHome}
                        >
                            ← BACK TO HOME
                        </button>
                    </div>
                )}
            </main>}

            {isStarted && <Footer/>}
        </div>
    );
}
