import React, { useState, useEffect, useRef } from "react";
import AddButton from "../AddButton";
import { useSelector } from "react-redux";
import styles from "./Bk.module.css";

import { getDatabase, ref, child, get, push, set } from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function Notes() {
  const db = getDatabase();

  const notesRef = ref(db, "content/college/Notes");
  const notesUID = push(notesRef);

  const [progress, setProgress] = useState(0);
  const isAdmin = useSelector((state) => state.login.isAdmin);
  const [showform, setShowform] = useState();
  const subject = useRef();
  const sem = useRef();
  //
  function uploadHandler(file) {
    console.log(file);
    const storage = getStorage();
    const filePath = "notes/" + notesUID.key;
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
            set(notesUID, {
              pdfURL: downloadURL,

              subject: subject.current.value,
              sem: sem.current.value,
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
        class="btn btn-outline-success mx-2 my-3 btnc"
        style={{ display: !isAdmin ? "none" : null }}
        onClick={() => {
          setShowform(!showform);
        }}
      >
        Add Notes
      </button>

      {showform && (
        <div className={styles.container}>
          <form className={styles.center}>
            <fieldset>
              <legend>Notes Details</legend>
              <div className="row">
                <div className="col-25">
                  <label htmlfor="fname">Enter subject: </label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="fname"
                    ref={subject}
                    name="fname"
                    className={styles.mytext}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-25">
                  <label htmlfor="lname">Semester:</label>
                </div>

                <div className="col-75">
                  <input
                    type="text"
                    id="lname"
                    ref={sem}
                    name="lname"
                    className={styles.mytext}
                  />
                </div>
              </div>
              <br />
              <div class="col-75">
                <input type="file" id="fileadd" name="fileadd" />
              </div>
              <br />

              <div>
                <button
                  className="btn btn-secondary"
                  type="button"
                  style={{ backgroundColor: "RoyalBlue" }}
                >
                  ADD
                </button>
              </div>
              {/* <AddButton onClick={uploadHandler} /> */}
            </fieldset>
          </form>
        </div>
      )}
    </div>
  );
}
