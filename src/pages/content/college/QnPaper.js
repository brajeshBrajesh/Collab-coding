import React, { useState, useRef } from "react";
import AddButton from "../AddButton";
import { getDatabase, ref, push, set } from "firebase/database";
import { useSelector } from "react-redux";
import styles from "./Bk.module.css";

import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function QnPaper() {
  const db = getDatabase();
  const isAdmin = useSelector((state) => state.login.isAdmin);
  const [showform, setShowform] = useState();
  const subject = useRef();
  const sem = useRef();
  const teacher = useRef();
  const year = useRef();

  const qnpaperRef = ref(db, "content/college/Qn paper");
  const qnpaperUID = push(qnpaperRef);

  const [progress, setProgress] = useState(0);

  function uploadHandler(file) {
    console.log(file);
    const storage = getStorage();
    const filePath = "qnpapers/" + qnpaperUID.key;
    //  console.log(bookUID.key);
    const storageRef = sref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        setProgress(progress);
      },
      (error) => {
        console.log("error in uploading");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setBooks();
          function setBooks() {
            set(qnpaperUID, {
              pdfURL: downloadURL,
              subject: subject.current.value,
              sem: sem.current.value,
              teacher: teacher.current.value,
              year: year.current.value,
            }).then(() => {
              console.log("sucessful");
            });
          }
        });
      }
    );
  }
  return (
    <div>
      <button
        type="button"
        class="btn btn-outline-success mx-2 my-3"
        style={{ display: !isAdmin ? "none" : null }}
        onClick={() => {
          setShowform(!showform);
        }}
      >
        Add Question Papers
      </button>
      {showform && (
        <form className={styles.center}>
          <fieldset>
            <legend>Question Paper Details</legend>
            <label htmlfor="fname">Enter subject: </label>
            <br />
            <input
              type="text"
              id="fname"
              ref={subject}
              name="fname"
              className={styles.mytext}
            />
            <br />

            <label htmlfor="lname">Semester:</label>
            <br />
            <input
              type="text"
              id="lname"
              ref={sem}
              name="lname"
              className={styles.mytext}
            />
            <br />
            <label htmlfor="lname">Teacher:</label>
            <br />
            <input
              type="text"
              id="lname"
              ref={teacher}
              name="lname"
              className={styles.mytext}
            />
            <br />
            <label htmlfor="lname">Year:</label>
            <br />
            <input
              type="text"
              id="lname"
              ref={year}
              name="lname"
              className={styles.mytext}
            />
            <br />
            <br />
            <input type="file" id="fileadd" name="fileadd" />
            <br />
            <br />

            <button
              className="btn btn-secondary"
              type="button"
              style={{ backgroundColor: "RoyalBlue" }}
            >
              ADD
            </button>
            {/* <AddButton onClick={uploadHandler} /> */}
          </fieldset>
        </form>
      )}
    </div>
  );
}
