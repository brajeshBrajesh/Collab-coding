import React, { useState, useRef } from "react";
import AddButton from "../AddButton";
import { getDatabase, ref, push, set } from "firebase/database";
import { useSelector } from "react-redux";

import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import styles from "./QnPaper.module.css";
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
              sem: subject.current.value,
              teacher: teacher.current.value,
              year: year.current.value,
            }).then(() => {
              console.log("sucessful");
              year.current.value = "";
              subject.current.value = "";
              teacher.current.value = "";
              sem.current.value = "";
              off();
            });
          }
        });
      }
    );
  }
  function on() {
    console.log("on");
    document.getElementById("overlay").style.display = "block";
  }

  function off() {
    document.getElementById("overlay").style.display = "none";
  }
  return (
    <div>
      <button
        type="button"
        class="btn btn-outline-success"
        style={{ display: !isAdmin ? "none" : null }}
        onClick={on}
      >
        Add Question paper
      </button>
      <div id="overlay" className={styles.overlay}>
        <div id="text" className={styles.text}>
          <form
            action=""
            style={{
              border: "2px solid red",
              padding: "2rem",
              // background: "pink",
            }}
          >
            <fieldset>
              <legend>Question paper Details</legend>
              <label htmlfor="subject">Enter subject </label>
              <br />
              <input type="text" id="subject" ref={subject} name="subject" />
              <br />
              <br/>
              
              <label htmlfor="sem">Semester</label>
              <br/>
              <input type="text" id="sem" ref={sem} name="sem" />
              <br />
              <br/>
              <label htmlfor="lname">Teacher</label>
              <br/>
              <input type="text" id="lname" ref={teacher} name="lname" />
              <br />
              <br/>
              <label htmlfor="year">Year</label>
              <br />
              <input type="text" id="year" ref={year} name="year" />
              <br />
              <br />
              <AddButton off={off} onClick={uploadHandler} />
              {/* <button
                type="button"
                className="btn btn-secondary "
                onClick={off}
                // disabled
              >
                Cancel
              </button> */}
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
