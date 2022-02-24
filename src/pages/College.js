import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import NOTES from "../NOTES.png";
import question from "../question.png";
import books from "../books.png";

export default function College() {
  return (
    <>
      {/* <Navbar /> */}
      <div>
        <Link to="notes">
          <img src={NOTES} width="350px" alt="NOTES" />
        </Link>
        <br />

        <Link to="qn-paper">
          <img src={question} width="350px" alt="QUESTION PAPERS" />
        </Link>
        <br />
        <Link to="books">
          <img src={books} width="350px" alt="BOOKS" />
        </Link>
      </div>
    </>
  );
}
