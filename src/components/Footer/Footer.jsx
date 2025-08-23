import React from "react";
import styles from "./Footer.module.scss";
import packageJson from "../../../package.json";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        ©2025{''}
        <a
          href="https://github.com/mihailgaberov"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hejdi Nielsen
        </a>
        <span data-testid="version" className={styles.version}>
          v{packageJson.version}
        </span>
      </p>
    </footer>
  );
}

export default Footer;
