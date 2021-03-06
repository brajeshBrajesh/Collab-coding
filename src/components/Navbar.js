import React from "react";
import { Link, NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../redux/Auth";
function Navbar() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        alert("Logging you out");
        dispatch(loginActions.logout());

        navigate("/");
      })
      .catch((error) => {
        alert("Error");
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Navbar
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/content">
                Content
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/my-notes">
                My-Notes
              </NavLink>
            </li>
            {/* 
            <li className="nav-item">
              <NavLink className="nav-link " aria-current="page" to="/purpose">
                Purpose
              </NavLink>
            </li> */}
          </ul>
          <div className="d-flex">
            <NavLink
              className="nav-link "
              aria-current="page"
              to="/notifications"
            >
              Notifications
            </NavLink>
            <button
              className="btn btn-outline-success "
              onClick={logOutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
