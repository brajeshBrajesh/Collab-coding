import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet } from "react-router-dom";
import College from "../College.png";
import dsa from "../dsa.png";

export default function Content() {
  return (
    <>
      <div class="row">
        <div class="column">
          {/* <Navbar/> */}
          <Link to="/college">
            <img src={College} width="350px" alt="COLLEGE" />
          </Link>
        </div>
        <div class="column">
          {/* dsa */}

          <Link to="/dsa">
            <img src={dsa} width="350px" alt="DSA" />
          </Link>
        </div>
      </div>
    </>
  );
}
