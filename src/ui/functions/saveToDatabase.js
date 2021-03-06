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
  downloadURL,
  filePath
) {
  console.log("Save to databse");
  set(newPostRef, {
    userDetails: {
      userName: userDetails.login.userName,
      userId: userDetails.login.loginId,
    },
    time: new Date().toLocaleString(),
    likes: {
      likesCount: 0,
      likedBy: {},
    },

    content: {
      title: title,
      desc: desc,
      img_URL: downloadURL,
      img_path: filePath,
    },
  })
    .then(() => {
      const db = getDatabase();
      set(tempRef(db, `users/${userDetails.login.loginId}/posts/${newPostRef .key}/`),
        {
          posted: true,
        });
    })
    .then(() => {
      alert("Successfully posted ");
      navigate("/login");
    });
}

export default saveToDatabase;
