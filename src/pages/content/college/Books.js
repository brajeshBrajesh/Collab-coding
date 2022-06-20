import React, { useEffect, useRef, useState } from "react";
import { getDatabase, ref, child, get, push, set } from "firebase/database";
import { useSelector } from "react-redux";
import AddButton from "../AddButton";

import BooksDetail from "../../../components/BooksDetail";
import BooksAddDet from "../../../components/BooksAddDet";
import styles from "./Books.module.css";

import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function Books() {
  const isAdmin = useSelector((state) => state.login.isAdmin);
  const [toDisplaData, setToDisplayData] = useState([]);
  const [bookFilters, setBookFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showform, setShowform] = useState();
  const subject = useRef();
  const author = useRef();
  const BookName = useRef();
  const sem = useRef();
  const dbRef = ref(getDatabase());
  const db = getDatabase();

  const bookRef = ref(db, "content/college/Books");
  const bookUID = push(bookRef);

  //
  function uploadHandler(file) {
    console.log(file);
    const storage = getStorage();
    const filePath = "books/" + bookUID.key;
    console.log(bookUID.key);
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
            set(bookUID, {
              pdfURL: downloadURL,
              bookName: BookName.current.value,
              Author: author.current.value,
              Subject: subject.current.value,
              semester: sem.current.value,
            }).then(() => {
              console.log("sucessful");
            });
          }
        });
      }
    );
  }

  //

  const fetchBooks = () => {
    setLoading(true);
    get(child(dbRef, "content/college/Books"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          let books = [];

          for (const key in snapshot.val()) {
            books.push(snapshot.val()[key]);
          }
          setToDisplayData(books);
        } else {
          console.log("No data available");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchBooks();
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
      {loading && <p>Loading ... </p>}

      <button
        type="button"
        class="btn btn-outline-success"
        style={{ display: !isAdmin ? "none" : null }}
        onClick={on}
      >
        Add Book 
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
              <legend>Book Details</legend>
              <br/>
              <br/>
              <label htmlfor="lname">Book Name</label>
              <br />
              
              <input type="text" id="lname" ref={BookName} name="lname" />
              <br/>
              <br/>
              <label htmlfor="fname">Enter subject </label>
              <br />
              <input type="text" id="fname" ref={subject} name="fname" />
              <br />
              <br/>

              <label htmlfor="lname">Book author</label>
              <br />
              <input type="text" id="lname" ref={author} name="lname" />
              <br />
              <br/>
              <label htmlfor="lname">Semester</label>
              <br/>
              <input type="text" id="lname" ref={sem} name="lname" />
              <br/>
              <br />
              <AddButton off={off} onClick={uploadHandler} />
              {/* <button
                type="button"
                className="btn btn-secondary "
                onClick={off}
              >
                Cancel
              </button> */}
            </fieldset>
          </form>
        </div>
      </div>

      <ul>
        {!loading &&
          toDisplaData.map((books) => (
            <li>
              <div className="container">
                sem={books.sem}
                <br />
                subject={books.subject}
                <br />
                <a
                  class="btn btn-primary"
                  href={books.pdfUrl}
                  target="_blank"
                  role="button"
                >
                  Link
                </a>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
  // return (
  //   <div>
  //     <div id="overlay" className={styles.overlay}>
  //       <div id="text" className={styles.text}>
  //         <form
  //           action=""
  //           // style={{
  //           //   width: "18%",
  //           //   borderRadius: "5px",
  //           //   padding: 5,
  //           //   textAlign: "center",
  //           //   border: "1px solid gray",
  //           //   borderTop: "3px solid Seagreen",
  //           //   backgroundColor: "mintcream",
  //           //   //   borderStyle: "ridge",
  //           // }}
  //         >
  //           <fieldset>
  //             <legend>Notes Details</legend>
  //             <label htmlfor="fname">Enter subject </label>
  //             <br />
  //             <input type="text" id="fname" ref={subject} name="fname" />
  //             <br />
  //             <br />
  //             <label htmlfor="lname">Semester</label>
  //             <input type="text" id="lname" ref={sem} name="lname" />
  //             <br />
  //             <AddButton onClick={uploadHandler} />
  //             <button
  //               type="button"
  //               className="btn btn-secondary "
  //               onClick={off}
  //             >
  //               Cancel
  //             </button>
  //           </fieldset>
  //         </form>
  //       </div>
  //     </div>
  //     {/* <button type="button" class="btn btn-outline-success" style={{display:!isAdmin?'none':null}} onClick={()=>{setShowform(!showform)}}>

  //          Add Notes
  //          </button>
  //          {showform &&
  //       <form
  //       action=""
  //       style={{
  //         width: "18%",
  //         borderRadius: "5px",
  //         padding: 5,
  //         textAlign: "center",
  //         border: "1px solid gray",
  //         borderTop: "3px solid Seagreen",
  //         backgroundColor: "mintcream",
  //         //   borderStyle: "ridge",
  //       }}
  //     >
  //       <fieldset>
  //         <legend>Notes Details</legend>
  //         <label htmlfor="fname">Enter subject </label>
  //         <br />
  //         <input type="text" id="fname" ref={subject} name="fname" />
  //         <br />
  //         <br />
  //         <label htmlfor="lname">Semester</label>
  //         <input type="text" id="lname" ref={sem} name="lname" />
  //         <br />
  //         <AddButton  onClick={uploadHandler} />
  //        </fieldset>
  //     </form>} */}
  //     <div className="col-4" style={{ border: "2px solid red" }}>
  //       <button type="button" class="btn btn-success" onClick={on}>
  //         AddNote
  //       </button>
  //     </div>
  //   </div>
  // );
}
