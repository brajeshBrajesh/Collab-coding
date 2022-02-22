import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, push, set } from "firebase/database";
import { useSelector } from "react-redux";
import AddButton from "../AddButton";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function Books() {
  const [toDisplaData, setToDisplayData] = useState([]);
  const [bookFilters, setBookFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress,setProgress] = useState(0);
  const dbRef = ref(getDatabase());
  const db = getDatabase();
      
     const bookRef = ref(db,'content/college/Books');
     const bookUID = push(bookRef); 
      
     //
    function uploadHandler(file){
      console.log(file);
      const storage = getStorage();
      const filePath = "books/" + bookUID.key ;
      console.log(bookUID.key);
      const storageRef = sref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
      "state_changed",
      (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          function setBooks (){
             
            set(bookUID,{
              pdfURL: downloadURL,
              bookName:"Ml",
              subject:"Da",
              sem:"1"
      
            }).then(()=>{
              console.log("sucessful");
            })
          };
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
          
           for (const key  in snapshot.val()){
            books.push((snapshot.val()[key]));
          };
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
    
  return (
    <>
      {loading && <p>Loading ... </p>}
       
      
      
      
      <AddButton  onClick={uploadHandler} />

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
}
