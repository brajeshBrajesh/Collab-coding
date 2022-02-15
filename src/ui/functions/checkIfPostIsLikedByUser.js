import { getDatabase, ref, child, get } from "firebase/database";
import app from "../../firebase/Firebase";
import setNumLikesOfPost from "./setNumLikesOfPost";

const checkIfPostIsLikedByUser = (
  setLikedByUser,
  userId,
  postId,
  setLikesCount
) => {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `posts/${postId}/likes/likedBy/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setLikedByUser(true);
      } else {
        setLikedByUser(false);
        console.log("No data available");
      }
     
      setNumLikesOfPost(postId, setLikesCount);
      
    })
    .catch((error) => {
      console.error(error);
    });
};
export default checkIfPostIsLikedByUser;
