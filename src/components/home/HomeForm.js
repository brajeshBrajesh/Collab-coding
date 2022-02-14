import React, { useRef } from "react";
import { getDatabase, ref, set } from "firebase/database";
import app from "../../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../redux/Auth";
import styles from "./HomeForm.module.css";

function HomeForm(props) {
  const userName = useRef();
  const dispatch = useDispatch();
  const formSubmitHandler = () => {
    if (userName.current.value.trim().length < 4) {
      alert("Enter a valid username(Atleast of length 4)");
    } else {
      const db = getDatabase();

      set(ref(db, `users/${props.uid}`), {
        name: userName.current.value,
        posts: {
          allPosts: ["junk"],
        },
        likes: {
          allLikes: ["junk"],
        },
        dislikes: {
          allDislikes: ["junk"],
        },
        comments: {
          allComments: ["junk"],
        },
      });
      dispatch(loginActions.userNameAdder(userName.current.value));

      props.userExists();
    }
  };
  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <h5>
          {" "}
          <div
            className="container my-5"
            style={{
              width: "70%",
              borderRadius: "5px",
            }}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputName1" className="form-label">
                <h4>Please enter your name to continue</h4>
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName1"
                aria-describedby="NameHelp"
                ref={userName}
              />
            </div>
            <button
              type="submit"
              className={`btn btn-primary ${styles.but}`}
              onClick={formSubmitHandler}
            >
              Continue
            </button>
          </div>
        </h5>
      </div>
    </div>
  );
}

export default HomeForm;
