import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet } from "react-router-dom";
import College from "../College.png";
import dsa from "../dsa.png";
import styles from "./College.module.css";

export default function Content() {
  return (
    <>
      <div className={styles.contain}>
        <div className={styles.card}>
          {/* <Navbar/> */}
          <Link to="/college">
            <img src={College} width="350px" alt="COLLEGE" />
          </Link>
        </div>

        {/* dsa */}
        <div className={styles.card}>
          <Link to="/dsa">
            <img src={dsa} width="350px" alt="DSA" />
          </Link>
        </div>
      </div>
    </>
  );
}
