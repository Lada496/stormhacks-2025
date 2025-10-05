import React, { useState } from "react";
import { TbReportSearch } from "react-icons/tb";

const PersonalStats = ({ userStats }) => {
  //   const [userStats, setUserStats] = React.useState({
  //     level: 1,
  //     badges: 1,
  //     streak: 2,
  //     xp: 100, // Progress percentage for the current level
  //   });

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Personal Stats</h2>
      <h3 style={styles.subHeader}>Welcome, User!</h3>
      <div style={styles.statContainer}>
        <div style={styles.statItem}>
          <img
            src="/assets/star_stat.png"
            alt="Star Stat"
            style={styles.starImage}
          />
          <div style={styles.indStats}>
            <span style={styles.label}>Level</span>
            <p style={styles.value}>{userStats.level}</p>
          </div>
        </div>
        <div style={styles.statItem}>
          <img
            src="/assets/achievement_stat.png"
            alt="Achievement Stat"
            style={styles.starImage}
          />
          <div style={styles.indStats}>
            <span style={styles.label}>Badge Number</span>
            <p style={styles.value}>{userStats.badges}</p>
          </div>
        </div>
        <div style={styles.statItem}>
          <img
            src="/assets/streak_stat.png"
            alt="Streak Stat"
            style={styles.starImage}
          />
          <div style={styles.indStats}>
            <span style={styles.label}>Current Streak</span>
            <p style={styles.value}>{userStats.streak} Days</p>
          </div>
        </div>
      </div>

      <h2>Exp Bar</h2>
      <div style={styles.progressBarContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: `${(userStats.xp / 1000) * 100}%`, // Dynamically set width based on XP
          }}
        ></div>
      </div>
      <div style={styles.xpText}>{userStats.xp} / 1000 XP</div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#1a1a2e", // Semi-transparent white
    color: "#73b5dd",
    border: "5px solid rgb(73, 181, 221)", // Light border
    borderRadius: "10px",
    padding: "30px",
    margin: "20px auto",
    width: "90%",
    boxShadow: "0 8px 32px rgba(196, 182, 182, 0.45)", // Strong shadow
    backdropFilter: "blur(10px)", // Frosted glass effect
    WebkitBackdropFilter: "blur(20px)", // Safari support
    textAlign: "center",
  },
  header: {
    fontSize: "4.5rem",
    color: "#73b5dd",
    marginBottom: "15px",
    margin: "10px",
  },
  subHeader: {
    fontSize: "3rem",
    margin: "10px",
    padding: "15px",
    color: "#ffffff",
  },
  statContainer: {
    display: "flex", // Enable Flexbox
    flexDirection: "row", // Stack items vertically
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    width: "100%", // Ensure it spans the container width
    textAlign: "center", // Center text inside the container
    margin: "0 auto", // Center the container itself horizontally
    padding: "15px",
  },
  statItem: {
    color: "#ffffff",
    display: "flex",
    margin: "10px",
    justifyContent: "space-between",
    marginBottom: "10px",
    padding: "15px",
  },
  label: {
    padding: "10px",
    fontSize: "1.5rem",
    color: "#ffffff",
    fontWeight: "bold",
  },
  value: {
    color: "#ffffff",
    fontSize: "2rem",
  },
  progressBarContainer: {
    height: "20px",
    width: "100%",
    backgroundColor: "#2e2e4e", // Darker background for the progress bar
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "20px",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#73b5dd", // Light blue for the progress bar
    transition: "width 0.3s ease-in-out", // Smooth transition for progress updates
  },
  xpText: {
    marginTop: "10px",
    fontSize: "1.25rem",
    color: "#ffffff",
  },
  starImage: {
    width: "100px",
    height: "100px",
    marginLeft: "10px",
  },
  indStats: {
    margin: "20px",
  },
};

export default PersonalStats;
