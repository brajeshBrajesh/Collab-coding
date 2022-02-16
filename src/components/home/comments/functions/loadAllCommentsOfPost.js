import { getDatabase, ref, child, get } from "firebase/database";

const loadAllCommentsOfPost = (path, setToDisplayComments) => {
  const dbRef = ref(getDatabase());
  //   console.log(path);
  get(child(dbRef, path))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let allComments = [];
        for (let key in snapshot.val()) {
          allComments.push({
            comment: snapshot.val()[key].comment,
            name: snapshot.val()[key].name,
            time: snapshot.val()[key].time,
            path: snapshot.val()[key].path,
            userId: snapshot.val()[key].userId,
            key:key,
          });
        }
        setToDisplayComments(allComments);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  console.log("function called");
};

export default loadAllCommentsOfPost;
