import React, { useState, useEffect, useRef } from "react";
import AddButton from "../AddButton";
import { useSelector } from "react-redux";

import { getDatabase, ref, child, get, push, set } from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import styles from "./Notes.module.css";

export default function Notes() {
  const db = getDatabase();

  const notesRef = ref(db, "content/college/Notes");
  const notesUID = push(notesRef);

  const [progress, setProgress] = useState(0);
  const isAdmin = useSelector((state) => state.login.isAdmin);
  const [showform, setShowform] = useState("off");
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
              <legend>Notes Details</legend>
              <label htmlfor="fname">Enter subject </label>
              <br />
              <input type="text" id="fname" ref={subject} name="fname" />
              <br />
              <br />
              <label htmlfor="lname">Semester</label>
              <br/>
              <input type="text" id="lname" ref={sem} name="lname" />
              {/* <br /> */}
              <br/>
              <br/>
              <div>

              <AddButton off={off}     onClick={uploadHandler}  />
              
              {/* <button
                // className="text-center"
                
                type="button"
                className="btn btn-secondary"
                onClick={showform}
              >
                Cancel
              </button> */}
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      {/* <button type="button" class="btn btn-outline-success" style={{display:!isAdmin?'none':null}} onClick={()=>{setShowform(!showform)}}>
           
           Add Notes  
           </button>
           {showform && 
        <form
        action=""
        style={{
          width: "18%",
          borderRadius: "5px",
          padding: 5,
          textAlign: "center",
          border: "1px solid gray",
          borderTop: "3px solid Seagreen",
          backgroundColor: "mintcream",
          //   borderStyle: "ridge",
        }}
      >
        <fieldset>
          <legend>Notes Details</legend>
          <label htmlfor="fname">Enter subject </label>
          <br />
          <input type="text" id="fname" ref={subject} name="fname" />
          <br />
          <br />
          <label htmlfor="lname">Semester</label>
          <input type="text" id="lname" ref={sem} name="lname" />
          <br />
          <AddButton  onClick={uploadHandler} />
         </fieldset>
      </form>} */}
     
      <div className="col-4" style={{ border: "2px solid red" }}>
        {/* <button type="button" class="btn btn-success" onClick={on}> */}
           <button type="button" class="btn btn-outline-success" style={{display:!isAdmin?'none':null}} onClick={on}>
          AddNote
        </button>
      </div>
    </div>
  );
}
