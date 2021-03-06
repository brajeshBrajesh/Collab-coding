// import app from "../../firebase/Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import saveToDatabase from "./saveToDatabase";

function imgUploadHandlerAndSaveInDatabase(
  navigate,
  newPostRef,
  fileExtension,
  userDetails,
  file,
  title,
  desc,
  cancelHandler,
  setPostClicked,
  setProgress,
  setFileUrl,
  render
) {
  const storage = getStorage();
  const filePath = "notes/" + newPostRef.key + "." + fileExtension;
  const storageRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(storageRef, file);
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
        setFileUrl(downloadURL);
        saveToDatabase(
          navigate,
          newPostRef,
          userDetails,
          title,
          desc,
          cancelHandler,
          setPostClicked,

          downloadURL,
          filePath,
          render,
          setFileUrl
        );
      });
    }
  );
}

export default imgUploadHandlerAndSaveInDatabase;
