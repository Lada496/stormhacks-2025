"use client";

import styles from "./AchievementCard.module.css";
import Image from "next/image";

export default function AchievementCard({
  icon = "/assets/achievements_svg_pack/icons/trophy-gold.svg",
  title,
  description,
  unlockedDate,
  achieved = true, // boolean - whether achievement is unlocked
  progress = null, // string like "3/10" or object like { current: 3, required: 10 }
  size = "medium", // small, medium, large
  customConfig = null,
}) {
  // Format progress if it's an object
  const progressText = progress
    ? typeof progress === 'string'
      ? progress
      : `${progress.current}/${progress.required}`
    : null;
  // Size presets
  const sizePresets = {
    small: {
      maxWidth: "600px",
      height: "180px",
      padding: "1.5rem",
      iconSize: "64px",
      titleSize: "1.5rem",
      descSize: "1rem",
      dateSize: "1rem",
      badgeSize: "32px",
    },
    medium: {
      maxWidth: "800px",
      height: "240px",
      padding: "2rem",
      iconSize: "96px",
      titleSize: "2rem",
      descSize: "1.25rem",
      dateSize: "1.25rem",
      badgeSize: "44px",
    },
    large: {
      maxWidth: "1000px",
      height: "300px",
      padding: "2.5rem",
      iconSize: "128px",
      titleSize: "2.5rem",
      descSize: "1.5rem",
      dateSize: "1.5rem",
      badgeSize: "56px",
    },
  };

  const config = customConfig || sizePresets[size] || sizePresets.medium;

  const cardStyle = {
    "--card-max-width": config.maxWidth,
    "--card-height": config.height,
    "--card-padding": config.padding,
    "--icon-size": config.iconSize,
    "--title-size": config.titleSize,
    "--desc-size": config.descSize,
    "--date-size": config.dateSize,
    "--badge-size": config.badgeSize,
  };

  return (
    <div className={`${styles.card} ${!achieved ? styles.locked : ''}`} style={cardStyle}>
      <Image
        src="/assets/achievements_svg_pack/cards/achievement-card.svg"
        alt=""
        fill
        className={styles.cardBackground}
      />

      <div className={styles.cardContent}>
        <div className={styles.leftSection}>
          <div className={styles.iconContainer}>
            <Image
              src="/assets/achievements_svg_pack/slots/icon-slot.svg"
              alt=""
              fill
              className={styles.iconSlot}
            />
            <img src={icon} alt="" className={styles.icon} />
          </div>

          <div className={styles.textContent}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            {achieved ? (
              <p className={styles.date}>Unlocked: {unlockedDate}</p>
            ) : (
              <p className={styles.progress}>
                {progressText ? `Progress: ${progressText}` : 'Locked'}
              </p>
            )}
          </div>
        </div>

        <div className={styles.badgeContainer}>
          <Image
            src="/assets/achievements_svg_pack/slots/right-badge-slot.svg"
            alt=""
            fill
            className={styles.badge}
          />
        </div>
      </div>
    </div>
  );
}
