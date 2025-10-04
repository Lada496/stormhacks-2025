"use client";

import styles from "./gameModeCard.module.css";
import Image from "next/image";

export default function GameModeCard({
                                         icon,
                                         theme = "pink", // pink, blue, green, orange, purple
                                         title,
                                         description,
                                         xp,
                                         buttonText = "START QUEST",
                                         onStartQuest,
                                         size = "small", // small, medium, large, or custom config object
                                         customConfig = null,
                                     }) {
    // Size presets
    const sizePresets = {
        small: {
            maxWidth: "500px",
            padding: "2rem",
            iconSize: "80px",
            titleSize: "2rem",
            descSize: "1rem",
            xpSize: "1.25rem",
            buttonTextSize: "1.25rem",
            buttonHeight: "80px",
        },
        medium: {
            maxWidth: "700px",
            padding: "3rem",
            iconSize: "128px",
            titleSize: "3rem",
            descSize: "1.25rem",
            xpSize: "1.75rem",
            buttonTextSize: "1.5rem",
            buttonHeight: "120px",
        },
        large: {
            maxWidth: "864px",
            padding: "4rem",
            iconSize: "160px",
            titleSize: "4rem",
            descSize: "1.5rem",
            xpSize: "2rem",
            buttonTextSize: "1.75rem",
            buttonHeight: "140px",
        },
    };

    const config = customConfig || sizePresets[size] || sizePresets.medium;

    const cardStyle = {
        "--card-max-width": config.maxWidth,
        "--card-padding": config.padding,
        "--icon-size": config.iconSize,
        "--title-size": config.titleSize,
        "--desc-size": config.descSize,
        "--xp-size": config.xpSize,
        "--button-text-size": config.buttonTextSize,
        "--button-height": config.buttonHeight,
    };

    return (
        <div className={styles.card} style={cardStyle}>
            <Image
                src={`/assets/cards/card-${theme}.svg`}
                alt=""
                fill
                className={styles.cardBackground}
            />

            <div className={styles.cardContent}>
                <div className={styles.header}>
                    <div className={styles.iconContainer}>
                        <Image
                            src={`/assets/iconslots/iconslot-${theme}.svg`}
                            alt=""
                            fill
                            className={styles.iconSlot}
                        />
                        <img src={icon} alt="" className={styles.icon}/>
                    </div>

                    <div className={styles.xpBadge}>
                        <Image
                            src="/assets/badge/xp-slot.svg"
                            alt=""
                            fill
                            className={styles.xpSlot}
                        />
                        <span className={styles.xpText}>+{xp} XP</span>
                    </div>
                </div>

                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>

                <button className={styles.startButton} onClick={onStartQuest}>
                    <Image
                        src={`/assets/buttons/button-${theme}.svg`}
                        alt=""
                        fill
                        className={styles.buttonBackground}
                    />
                    <span className={styles.buttonText}>{buttonText}</span>
                </button>
            </div>
        </div>
    );
}
