import React, { useEffect, useState } from "react";
import app from "../firebase/Firebase";
import { useLocation } from "react-router-dom";
import {
  getAuth,
  setPersistence,
  inMemoryPersistence,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../redux/Auth";
import Spinner from "../ui/Spinner";
import Signup from "../components/signup/Signup";
// var admin = require("firebase-admin");

// var serviceAccount = require("../server/my-first-project-3fbf8-firebase-adminsdk-cndpv-96d2835148.json");

function Login(props) {
  console.log(props);
  console.log("Login function");
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const loginHandler = () => {
    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();

        return signInWithRedirect(auth, provider);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        // console.log(user);
        user
          .getIdTokenResult()
          .then((id) => {
            console.log(id.claims);
            if (id.claims.admin !== undefined) return true;
            
            return false;
          })
          .then((isAdmin) => {
            console.log(isAdmin);
            dispatch(loginActions.login({ uid, isAdmin }));
            setLoading(false);
            // const nav = window.location.pathname;
            navigate("/home");
          });
        // function
      } else {
        console.log("signed out");
        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      {!loading && (
        <div className="container my-5">
          <Signup signupHandler={loginHandler} />
        </div>
      )}
      {loading && <Spinner />}
    </div>
  );
}

export default Login;
