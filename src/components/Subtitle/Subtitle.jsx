// src/components/Subtitle/Subtitle.jsx
import React from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import styles from "./Subtitle.module.scss";

const Subtitle = ({ totalCards = 21 }) => {
  const [score] = useLocalStorage("score", 0);
  const [bestScore] = useLocalStorage("bestScore", 0);
  const [clickedImages] = useLocalStorage("clickedImages", []);

  // Determine game status for dynamic messaging
  const getGameStatus = () => {
    if (score === 0 && clickedImages.length === 0) {
      return "ready";
    } else if (score > 0) {
      return "playing";
    } else {
      return "reset";
    }
  };

  const getStatusMessage = () => {
    const status = getGameStatus();

    switch (status) {
      case "ready":
        return "Ready to test your memory? Click any card to begin!";
      case "playing":
        return `Great job! Keep going - you're on a streak of ${score}!`;
      case "reset":
        return "Don't worry! Try again and beat your best score.";
      default:
        return "Click each card only once to score points!";
    }
  };

  const getEncouragementLevel = () => {
    if (score === 0) return "neutral";
    if (score >= bestScore && score > 0) return "excellent";
    if (score >= bestScore * 0.8) return "good";
    return "encouraging";
  };

  return (
    <section className={styles.subtitle}>
      <div className={styles.container}>
        <div className={styles.messageSection}>
          <p
            className={`${styles.statusMessage} ${
              styles[getEncouragementLevel()]
            }`}
          >
            {getStatusMessage()}
          </p>

          <div className={styles.gameInfo}>
            <div className={styles.progressIndicator}>
              <span className={styles.progressLabel}>Progress:</span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width:
                      clickedImages.length > 0 && totalCards > 0
                        ? `${(clickedImages.length / totalCards) * 100}%`
                        : "0%",
                  }}
                ></div>
              </div>
              <span className={styles.progressText}>
                {clickedImages.length}/{totalCards} cards
              </span>
            </div>
          </div>
        </div>

        <div className={styles.tips}>
          <div className={styles.tip}>
            <span className={styles.tipIcon}>💡</span>
            <span className={styles.tipText}>
              {score === 0
                ? "Tip: Pay attention to each image - you can only click it once!"
                : score < 10
                ? "Tip: Take your time to remember which cards you've already clicked."
                : "Tip: You're doing great! Focus and you might get a perfect score!"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subtitle;
