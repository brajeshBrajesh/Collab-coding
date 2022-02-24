import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet } from "react-router-dom";
export default function Content() {
  return (
    <div>
      {/* <Navbar/> */}
      <Link to="/college">
        <img src="" alt="COLLEGE" />
      </Link>
      <br />
      {/* dsa */}
      <Link to="/dsa">
        <img src="" alt="DSA" />
      </Link>
    </div>
  );
}
