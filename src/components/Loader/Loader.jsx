// src/components/Loader/Loader.jsx
import React from "react";
import styles from "./Loader.module.scss";

const Loader = ({ message = "Loading...", size = "medium", variant = "spinner" }) => {
  const sizeClass = styles[size];
  const variantClass = styles[variant];

  return (
    <div className={styles.container}>
      <div className={`${styles.loader} ${sizeClass} ${variantClass}`}>
        <div className={styles.spinner}></div>
        <div className={styles.spinner}></div>
        <div className={styles.spinner}></div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loader;