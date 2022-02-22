import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function College() {
  return (
    <>
      {/* <Navbar /> */}
      <div>
        <Link to="notes">Notes</Link>
        <br />

        <Link to="qn-paper">Qn paper</Link>
        <br />
        <Link to="books">Books</Link>
      </div>
    </>
  );
}
