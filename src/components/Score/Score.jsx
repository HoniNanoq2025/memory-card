// src/components/Score/Score.jsx
import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import styles from "./Score.module.scss";

const Score = ({
  variant = "detailed",
  showAnimation = true,
  className = "",
}) => {
  const [score] = useLocalStorage("score", 0);
  const [bestScore] = useLocalStorage("bestScore", 0);
  const [clickedImages] = useLocalStorage("clickedImages", []);
  const [previousScore, setPreviousScore] = useState(score);
  const [isNewBest, setIsNewBest] = useState(false);
  const [showScoreIncrease, setShowScoreIncrease] = useState(false);

  // Track score changes for animations
  useEffect(() => {
    if (showAnimation && score > previousScore) {
      setShowScoreIncrease(true);
      setTimeout(() => setShowScoreIncrease(false), 800);
    }
    setPreviousScore(score);
  }, [score, previousScore, showAnimation]);

  // Check for new best score
  useEffect(() => {
    if (score > 0 && score === bestScore && score > 0) {
      setIsNewBest(true);
      setTimeout(() => setIsNewBest(false), 2000);
    }
  }, [score, bestScore]);

  // Calculate game statistics
  const totalCards = 21;
  const accuracy =
    clickedImages.length > 0
      ? Math.round((score / clickedImages.length) * 100)
      : 0;
  const completion = Math.round((clickedImages.length / totalCards) * 100);
  const streak = score;
  const isPerfectGame = score === totalCards;

  // Get performance level
  const getPerformanceLevel = () => {
    if (isPerfectGame) return "perfect";
    if (score >= bestScore * 0.9) return "excellent";
    if (score >= bestScore * 0.7) return "good";
    if (score >= bestScore * 0.5) return "fair";
    return "beginner";
  };

  // Get performance message
  const getPerformanceMessage = () => {
    const level = getPerformanceLevel();
    switch (level) {
      case "perfect":
        return "🏆 Perfect Game!";
      case "excellent":
        return "🔥 Excellent Memory!";
      case "good":
        return "👍 Great Job!";
      case "fair":
        return "💪 Keep Improving!";
      default:
        return "🎯 Good Start!";
    }
  };

  if (variant === "compact") {
    return (
      <div className={`${styles.scoreCompact} ${className}`}>
        <div className={styles.compactItem}>
          <span className={styles.compactLabel}>Score</span>
          <span
            className={`${styles.compactValue} ${
              showScoreIncrease ? styles.scoreIncrease : ""
            }`}
          >
            {score}
          </span>
        </div>
        <div className={styles.compactDivider}></div>
        <div className={styles.compactItem}>
          <span className={styles.compactLabel}>Best</span>
          <span
            className={`${styles.compactValue} ${
              isNewBest ? styles.newBest : ""
            }`}
          >
            {bestScore}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.scoreDetailed} ${className}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Game Score</h3>
        {isNewBest && <div className={styles.newBestBadge}>New Best! 🎉</div>}
      </div>

      <div className={styles.mainScores}>
        <div className={`${styles.scoreCard} ${styles.current}`}>
          <div className={styles.scoreLabel}>Current Score</div>
          <div
            className={`${styles.scoreValue} ${
              showScoreIncrease ? styles.scoreIncrease : ""
            }`}
          >
            {score}
            {showScoreIncrease && <span className={styles.plusOne}>+1</span>}
          </div>
          <div className={styles.scoreSubtext}>
            {score === 0
              ? "Start playing!"
              : `${score} correct ${score === 1 ? "pick" : "picks"}`}
          </div>
        </div>

        <div className={`${styles.scoreCard} ${styles.best}`}>
          <div className={styles.scoreLabel}>Best Score</div>
          <div
            className={`${styles.scoreValue} ${
              isNewBest ? styles.newBest : ""
            }`}
          >
            {bestScore}
          </div>
          <div className={styles.scoreSubtext}>
            {bestScore === 0 ? "No record yet" : "Personal best"}
          </div>
        </div>
      </div>

      <div className={styles.statistics}>
        <h4 className={styles.statsTitle}>Game Statistics</h4>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{streak}</div>
            <div className={styles.statLabel}>Current Streak</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statValue}>{accuracy}%</div>
            <div className={styles.statLabel}>Accuracy</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statValue}>{completion}%</div>
            <div className={styles.statLabel}>Completion</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statValue}>
              {clickedImages.length}/{totalCards}
            </div>
            <div className={styles.statLabel}>Cards Tried</div>
          </div>
        </div>

        <div className={styles.performance}>
          <div
            className={`${styles.performanceIndicator} ${
              styles[getPerformanceLevel()]
            }`}
          >
            {getPerformanceMessage()}
          </div>
        </div>
      </div>

      {isPerfectGame && (
        <div className={styles.celebration}>
          <div className={styles.celebrationText}>
            🎊 Congratulations! Perfect Memory! 🎊
          </div>
        </div>
      )}
    </div>
  );
};

export default Score;
