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
    time: new Date().getTime(),
    likes: 0,
    dislikes: 0,
    comment: ["junk"],
    content: {
      title: title,
      desc: desc,
      img_URL: downloadURL,
      img_path: filePath,
    },
  })
    .then(() => {
      const db = getDatabase();
      const dataRef = tempRef(db);
      let allPosts = [];

      get(child(dataRef, `users/${userDetails.login.loginId}/posts/allPosts`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("saving to user post");
            allPosts = snapshot.val();
            allPosts.push(newPostRef.key);
            // console.log(allPosts);
            set(tempRef(db, `users/${userDetails.login.loginId}/posts`), {
              allPosts,
            });
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .then(() => {
      alert("Successfully posted ");
      navigate("/login");
    });
}

export default saveToDatabase;
