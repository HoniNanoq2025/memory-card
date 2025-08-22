// src/components/Header/Header.jsx
import React from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import styles from "./Header.module.scss";

const Header = () => {
  const [score] = useLocalStorage("score", 0);
  const [bestScore] = useLocalStorage("bestScore", 0);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Memory Card Game</h1>
          <p className={styles.subtitle}>Click each card only once!</p>
        </div>

        <div className={styles.scoreSection}>
          <div className={styles.scoreCard}>
            <span className={styles.scoreLabel}>Score</span>
            <span className={styles.scoreValue}>{score}</span>
          </div>
          <div className={styles.scoreCard}>
            <span className={styles.scoreLabel}>Best</span>
            <span className={styles.scoreValue}>{bestScore}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
