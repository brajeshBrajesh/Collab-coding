import app from "../../../firebase/Firebase";

import {
  getDatabase,
  set,
  ref,
  get,
  child,
  serverTimestamp,
} from "firebase/database";
import deleteImageFromStorage from "./deleteImageFromStorage";
const deleteTheGivenPost = (
  postId,
  postUserId,
  toDisplayPosts,
  setToDisplayPosts,
  imagePath
) => {
  const db = getDatabase();

  set(ref(db, "posts/" + postId), {});
  // get(child(ref(db), "users/" + postUserId + "/posts/" + postId)).then(
  //   (snapshot) => {
  //     if (snapshot.exists()) {
  //       // console.log(snapshot.val());
  //       const posts = snapshot.val();
  //       let tempPosts = [];
  //       for (let i = 0; i < posts.length; ++i) {
  //         if (posts[i] !== postId) tempPosts.push(posts[i]);
  //       }
  //       set(ref(db, "users/" + postUserId + "/posts"), {
  //         allPosts: tempPosts,
  //       });
  //     } else {
  //       console.log("Not found snapshot");
  //     }
  //   }
  // );\
  set(ref(db, "users/" + postUserId + "/posts/" + postId), {
    posted: {},
  });

  if (imagePath.length !== 0) deleteImageFromStorage(imagePath); //deleting image from storage
  let temp = [];
  for (let i = 0; i < toDisplayPosts.length; ++i) {
    if (toDisplayPosts[i].key !== postId) temp.push(toDisplayPosts[i]);
  }
  setToDisplayPosts(temp);
};
export default deleteTheGivenPost;
