// src/components/Footer/Footer.jsx
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>Memory Card Game</h3>
            <p className={styles.description}>
              Test your memory by clicking each card only once. Can you get a
              perfect score?
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>How to Play</h4>
            <ul className={styles.rules}>
              <li>Click on any card to start</li>
              <li>Remember which cards you've clicked</li>
              <li>Don't click the same card twice</li>
              <li>Try to click all cards for a perfect score!</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Game Info</h4>
            <div className={styles.info}>
              <p>🎯 Goal: Click all cards once</p>
              <p>🧠 Challenge: Remember your choices</p>
              <p>🏆 Win: Beat your best score</p>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Memory Card Game. Built with React.
          </p>
          <p className={styles.credits}>Images provided by various Neko APIs</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
