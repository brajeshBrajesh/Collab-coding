import React , {useState}from 'react'
import AddButton from '../AddButton'
import { getDatabase, ref, child, get, push, set } from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function QnPaper() {
  const db = getDatabase();
      
  const qnpaperRef = ref(db,'content/college/Qn paper');
  const qnpaperUID = push(qnpaperRef); 
   
  const [file,setFile] = useState(null);
  const [progress,setProgress] = useState(0);

  
  function uploadHandler(){
    console.log(file);
    const storage = getStorage();
    const filePath = "qnpapers/" + qnpaperUID.key ;
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
           
          set(qnpaperUID,{
            pdfURL: downloadURL,
            subject:"Da",
            sem:"1",
            teacher:"KApil sir",
            year:"2022"
    
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
    <input type="file" onChange={(e) => {
     setFile(e.target.files[0]);
    }} 
        // onClick={console.log(file)}
/>
     <AddButton  onClick={uploadHandler} />
    </div>
  )
}
