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
