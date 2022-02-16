import { getDatabase, ref, set, push } from "firebase/database";
const postComment = (comment, userName, userId, newPath, newCommentRef) => {
  set(newCommentRef, {
    name: userName,
    comment: comment.current.value,
    path: newPath,
    time: new Date().toLocaleString(),
    userId: userId,
  });
};
export default postComment;
