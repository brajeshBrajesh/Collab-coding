import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import NOTES from "../NOTES.png";
import question from "../question.png";
import books from "../books.png";
import styles from "./College.module.css";

export default function College() {
  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.contain}>
        <div className={styles.card}>
          <Link to="notes">
            <img src={NOTES} width="350px" alt="NOTES" />
          </Link>
        </div>

        <div className={styles.card} style={{ border: "2px solid gray" }}>
          <Link to="qn-paper">
            <img src={question} width="350px" alt="QUESTION PAPERS" />
          </Link>
        </div>

        <div className={styles.card}>
          <Link to="books">
            <img src={books} width="350px" alt="BOOKS" />
          </Link>
        </div>
      </div>
    </>
  );
}
