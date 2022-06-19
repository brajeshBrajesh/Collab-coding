import React, { useState, useEffect } from "react";
import styles from "./MyNotes.module.css";
import PostCard from "../ui/PostCard";
import AddNotesForm from "../ui/AddNotesForm";
// import postFetch from "./functions/postFetch";
import { useSelector } from "react-redux";
import notesFetch from "../components/home/functions/notesFetch";
// import ShowNotes from "../components/home/ui/ShowNotes";
// ../../ui/ShowNotes
import ShowNotes from "../ui/ShowNotes";
export default function MyNotes() {
  // const [toDisplayNotes, setToDisplayNotes] = useState([]);
  const [toDisplayPosts, setToDisplayPosts] = useState([]);

  const userId = useSelector((state) => state.login.loginId);
  useEffect(() => {
    console.log("UseEffect called of my notes");
    notesFetch(
       
      setToDisplayPosts,
      toDisplayPosts,
      // userPosts,
      userId,
      "notes"
    );
  }, []);

  function on() {
    console.log("on");
    document.getElementById("overlay").style.display = "block";
  }

  function off() {
    document.getElementById("overlay").style.display = "none";
  }
  return (
    <>
      <div id="overlay" className={styles.overlay}>
        <div id="text" className={styles.text}>
          <AddNotesForm overlayOut={off} />
        </div>
      </div>
      <div
        className="alert alert-warning alert-dismissible fade show my-1"
        role="alert"
      >
        <strong>This is your personal section!</strong> Here you can store your
        important notes for future refrance.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
      <div className="row">
        <div className="col-4" style={{ border: "2px solid red" }}>
          <button type="button" class="btn btn-success" onClick={on}>
            AddNote
          </button>
        </div>
        <div className="col-8">
          <h1>HI</h1>
        </div>
      </div>
       
        {toDisplayPosts.map((notes) => (
            <ShowNotes
            details={notes}
            key={notes.key}
            img_URL={notes.content.img_URL}
            />
          ))}
    </>
  );
}
