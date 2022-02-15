import { getDatabase, ref, onValue } from "firebase/database";
import app from "../../firebase/Firebase";

const setNumLikesOfPost = (postId, setLikesCount) => {
  const db = getDatabase();

  console.log("Clicekr");
  const dataRef = ref(db, `posts/${postId}/likes/likesCount`);
  onValue(dataRef, (snapshot) => {
    //Onvalue is called when the data inside its  node changes
    
    setLikesCount(snapshot.val())
    // console.log(snapshot.val());
  });
};

export default setNumLikesOfPost;
