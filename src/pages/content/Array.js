import React from "react";
import Array from "../Array.png";
import { Link, Outlet } from "react-router-dom";
export default function Array() {
  return (
    <div>
      <h1>HI</h1>

      <Link to="array">
        <img src={Array} width="350px" alt="ARRAY" />
      </Link>
      <Outlet />
    </div>
  );
}
