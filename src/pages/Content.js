import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, Outlet } from "react-router-dom";
import College from "../College.png";
import dsa from "../dsa.png";

export default function Content() {
  return (
    <>
      <div className="container my-4">
        <div class="row">
          <div class="col-sm-6 text-center" >
            {/* <Navbar/> */}
            <Link to="/college">
              <img
                src={College}
                style={{
                  height: "370px",
                  width: "350px",
                  borderRadius: "5px",
                }}
                alt="COLLEGE"
              />
            </Link>
          </div>
          <div class="col-sm-6 text-center" >
            {/* dsa */}

            <Link to="/dsa">
              <img
                src={dsa}
                style={{
                  height: "370px",
                  width: "350px",
                  borderRadius: "5px",
                }}
                alt="DSA"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
