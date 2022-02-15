import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { loginActions } from "../redux/Auth";
import { getDatabase, ref, child, get } from "firebase/database";
import Navbar from "../components/Navbar";
import Spinner from "../ui/Spinner";
import HomeForm from "../components/home/HomeForm";
import MainHome from "../components/home/MainHome";
import { useDispatch } from "react-redux";
import { loginActions } from "../redux/Auth";
import { postActions } from "../redux/Post";

function Home() {
  const db = getDatabase();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.login.loginId);
  // console.log(uid.login.loginId);
  const [loading, setLoading] = useState(true);
  const [userNameExist, setUserNameExist] = useState(false);
  const [userName, setUserName] = useState("");
  const dataRef = ref(db);

  const getNameFromDatabase = () => {
    setLoading(true);
    get(child(dataRef, `users/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val().posts.allPosts);
          setUserName(snapshot.val().name);
          dispatch(loginActions.userNameAdder(snapshot.val().name));
          dispatch(postActions.postsFetcher(snapshot.val().posts.allPosts));

          setUserNameExist(true);
        } else {
          console.log("No data available");
          setUserNameExist(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setUserNameExist(false);
      });
  };

  useEffect(() => {
    getNameFromDatabase();
  }, []);
  // console.log("HOME");

  const homeformUserNameExistSetter = () => {
    setUserNameExist(true);
  };

  return (
    <div>
      <Navbar />

      {loading && <Spinner />}
      {!loading && userNameExist && <MainHome />}
      {!loading && !userNameExist && (
        <HomeForm userExists={homeformUserNameExistSetter} uid={uid} />
      )}
    </div>
  );
}

export default Home;
