import React,{useState,useEffect} from 'react'
import AddButton from '../AddButton'
import { getDatabase, ref, child, get, push, set } from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function Notes() {
  const db = getDatabase();
      
  const notesRef = ref(db,'content/college/Notes');
  const notesUID = push(notesRef); 
   
   const [progress,setProgress] = useState(0);

 //
 function uploadHandler(file){
   console.log(file);
   const storage = getStorage();
   const filePath = "notes/" + notesUID.key ;
  //  console.log(bookUID.key);
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
          
         set(notesUID,{
           pdfURL: downloadURL,
           notesName:"Ml",
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
  return (
    <div> 
    
     
      <AddButton  onClick={uploadHandler} />
    </div>
  )
}
