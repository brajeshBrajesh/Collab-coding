import {
  child,
  get,
  getDatabase,
  set,
  ref as tempRef,
} from "firebase/database";
import React from "react";

function saveToDatabase(
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
) {
  console.log("Save to databse");
  set(newPostRef, {
    content: {
      time: new Date().toLocaleString(),
      title: title,
      desc: desc,
      img_URL: downloadURL,
      img_path: filePath,
    },
  }).then(() => {
    alert("Successfully posted ");
    setPostClicked(false);
    cancelHandler();
    navigate("/my-notes");
    setFileUrl("");
    render();
  });
}

export default saveToDatabase;
