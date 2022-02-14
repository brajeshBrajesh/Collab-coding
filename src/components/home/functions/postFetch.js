import app from "../../../firebase/Firebase";
import {
  getDatabase,
  ref,
  child,
  get,
  query,
  limitToFirst,
  limitToLast,
  orderByChild,
  startAt,
  startAfter,
  endAt,
  endBefore,
  equalTo,
  orderByKey,
} from "firebase/database";

const postFetch = (
  limit,
  setHasMore,
  setToDisplayPosts,
  toDisplayPosts,
  // userPosts,
  userId
) => {
  // setLoading(true);
  const db = getDatabase();

  const dbRef = query(ref(db, "posts/"), limitToLast(limit));

  let data = null;
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // data = snapshot.val();
        let temp = [];

        console.log(snapshot.val());
        for (const key in snapshot.val()) {
          //   temp.push(snapshot.val()[t]);
          // console.log(snapshot.val()[t]);
          let insert = true;
          let personalPost = false;
          for (let i = 0; i < toDisplayPosts.length; ++i) {
            if (key === toDisplayPosts[i].key) {
              insert = false;
              break;
            }
          }
          if (insert === true) {
            if (snapshot.val()[key].userDetails.userId === userId)
              personalPost = true;
            temp.push({
              ...snapshot.val()[key],
              key: key,
              personalPost: personalPost,
            });
          }
        }
        temp.reverse();
        // console.log(temp);
        // console.log(toDisplayPosts);
        let newArray = toDisplayPosts.concat(temp);
        // console.log(newArray);
        if (newArray.length === toDisplayPosts.length) setHasMore(false);
        console.log(newArray);
        setToDisplayPosts(newArray);
      } else {
        console.log("No data available");
        setToDisplayPosts([]);
        setHasMore(false);
      }

      // setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      // setLoading(false);
      setHasMore(false);
    });

  console.log("Post fetched");
};
export default postFetch;
