import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoutes = ({ children }) => {
  const isLoggedin = useSelector((state) => state.login.isLoggedIn);
  // const navigate = useNavigate();
  console.log("pRIvate routes");
  console.log(isLoggedin);
  if (isLoggedin === false) {
    // alert("Login First");
    return <Navigate to="/login" />;
  } else {
    console.log("Inside else");
    return <Outlet />;
  }
};

export default PrivateRoutes;
