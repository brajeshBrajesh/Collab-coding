import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet } from "react-router-dom";
export default function Content() {
  return (
    <div>
      {/* <Navbar/> */}
      <Link to="/college">College</Link>
      <br />

      <Link to="/dsa">DSA</Link>
    </div>
  );
}
