import React, { useEffect, useState } from "react";
import app from "../firebase/Firebase";
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

function Login() {
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
        console.log(uid);

        dispatch(loginActions.login(uid));
        setLoading(false);
        navigate("/home");
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
