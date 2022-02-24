import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function College() {
  return (
    <>
      {/* <Navbar /> */}
      <div>
        <Link to="notes">
          <img src="" alt="NOTES" />
        </Link>
        <br />

        <Link to="qn-paper">
          <img src="" alt="QUESTION PAPERS" />
        </Link>
        <br />
        <Link to="books">
          <img src="" alt="BOOKS" />
        </Link>
      </div>
    </>
  );
}
