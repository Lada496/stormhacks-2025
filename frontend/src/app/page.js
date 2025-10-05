"use client";

import {useEffect, useState} from "react";
import styles from "./page.module.css";
import Header from "./components/Header";
import GameModeCard from "./components/gameModeCard";
import AchievementCard from "./components/AchievementCard";
import Footer from "./components/Footer";
import PersonalStats from "@/app/components/PersonalStats";
import Interview from "./components/interview/Interview";
import ResumeReview from "./components/ResumeReview";

export default function Home() {
    const [currentView, setCurrentView] = useState("home");
    const [questData, setQuestData] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const [currentSection, setCurrentSection] = useState(0); // 0=stats, 1=quests, 2=achievements
    const [isScrolling, setIsScrolling] = useState(false);
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

    // Scroll to top when view changes
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [currentView]);

    // Handle wheel scroll for section switching (only on home view)
    useEffect(() => {
        if (currentView !== 'home' || !isStarted) return;

        const handleWheel = (e) => {
            e.preventDefault();

            if (isScrolling) return; // Prevent rapid scrolling

            const delta = e.deltaY;
            const totalSections = 3;

            if (delta > 0 && currentSection < totalSections - 1) {
                // Scroll down
                setIsScrolling(true);
                setCurrentSection(prev => prev + 1);
                setTimeout(() => setIsScrolling(false), 800);
            } else if (delta < 0 && currentSection > 0) {
                // Scroll up
                setIsScrolling(true);
                setCurrentSection(prev => prev - 1);
                setTimeout(() => setIsScrolling(false), 800);
            }
        };

        const handleKeyDown = (e) => {
            if (isScrolling) return;

            const totalSections = 3;

            if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentSection < totalSections - 1) {
                e.preventDefault();
                setIsScrolling(true);
                setCurrentSection(prev => prev + 1);
                setTimeout(() => setIsScrolling(false), 800);
            } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection > 0) {
                e.preventDefault();
                setIsScrolling(true);
                setCurrentSection(prev => prev - 1);
                setTimeout(() => setIsScrolling(false), 800);
            }
        };

        window.addEventListener('wheel', handleWheel, {passive: false});
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentView, currentSection, isScrolling, isStarted]);

    // Reset section when leaving home
    useEffect(() => {
        if (currentView !== 'home') {
            setCurrentSection(0);
        }
    }, [currentView]);

    // Add/remove no-scroll class based on view
    useEffect(() => {
        if (currentView === 'home' && isStarted) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [currentView, isStarted]);

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

            {isStarted && (
                <main className={styles.main}>
                    {/* <ResultView error={false} response={response} /> */}
                    {currentView === "home" && (
                        <div className={styles.sectionsContainer}>
                            {/* Section indicators */}
                            <div className={styles.sectionIndicators}>
                                <div
                                    className={`${styles.indicator} ${currentSection === 0 ? styles.active : ''}`}
                                    onClick={() => !isScrolling && setCurrentSection(0)}
                                    title="Stats"
                                />
                                <div
                                    className={`${styles.indicator} ${currentSection === 1 ? styles.active : ''}`}
                                    onClick={() => !isScrolling && setCurrentSection(1)}
                                    title="Quests"
                                />
                                <div
                                    className={`${styles.indicator} ${currentSection === 2 ? styles.active : ''}`}
                                    onClick={() => !isScrolling && setCurrentSection(2)}
                                    title="Achievements"
                                />
                            </div>

                            <div
                                className={styles.sectionsWrapper}
                                style={{
                                    transform: `translateY(-${currentSection * 100}vh)`,
                                }}
                            >
                                {/* Section 0: Stats */}
                                <div className={styles.section}>
                                    <PersonalStats userStats={userStats}/>
                                </div>

                                {/* Section 1: Quests */}
                                <div className={styles.section}>
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
                                </div>

                                {/* Section 2: Achievements */}
                                <div className={styles.section}>
                                    <div style={{paddingTop: 150}}>
                                        <h1 className={styles.questHeader}>ACHIEVEMENT HALL</h1>
                                    </div>
                                    <div className={styles.achievementsContainer}>
                                        <AchievementCard
                                            title="WEEK WARRIOR"
                                            description="Maintain a 7-day streak"
                                            unlockedDate="2024-03-01"
                                            achieved={true}
                                            size="small"
                                        />
                                        <AchievementCard
                                            title="FIRST STEPS"
                                            description="Complete your first resume review"
                                            unlockedDate="2024-01-15"
                                            achieved={true}
                                            size="small"
                                        />
                                        <AchievementCard
                                            title="INTERVIEW MASTER"
                                            description="Ace 10 behavioral interviews"
                                            achieved={false}
                                            progress={{current: 3, required: 10}}
                                            size="small"
                                        />
                                        <AchievementCard
                                            title="TECH EXPERT"
                                            description="Pass 5 technical interviews"
                                            achieved={false}
                                            progress="1/5"
                                            size="small"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentView === "interview" && (
                        <div className={styles.questView}>
                            <Interview setCurrentView={setCurrentView}/>
                        </div>
                    )}

                    {currentView === "resume" && (
                        <div className={styles.questView}>
                            <h1 className={styles.questHeader}>{questData?.title}</h1>
                            <div style={{color: "#ffffff", fontSize: "1.5rem"}}>
                                {/* <ResumeReviewLite setUserStats={setUserStats} /> */}
                                <ResumeReview setUserStats={setUserStats}/>
                            </div>
                            <button className={styles.backButton} onClick={handleBackToHome}>
                                ← BACK TO HOME
                            </button>
                        </div>
                    )}
                </main>
            )}

            {isStarted && <Footer/>}
        </div>
    );
}
