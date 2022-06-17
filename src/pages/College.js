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
      <div className="row my-4">
        <Link to="notes" className="col-md-4 text-center">
          <img
            src={NOTES}
            style={{ width: "18rem", height: "18rem", borderRadius: "5px" }}
            alt="NOTES"
          />
        </Link>
        <br />

        <Link to="qn-paper" className="col-md-4 text-center">
          <img
            src={question}
            style={{ width: "18rem", height: "18rem", borderRadius: "5px" }}
            alt="QUESTION PAPERS"
          />
        </Link>
        <br />
        <Link to="books" className="col-md-4 text-center">
          <img
            src={books}
            style={{ width: "18rem", height: "18em", borderRadius: "5px" }}
            alt="BOOKS"
          />
        </Link>
      </div>
    </>
  );
}
