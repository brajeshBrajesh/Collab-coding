import { getDatabase, ref, runTransaction, set } from "firebase/database";
const updateLikeStatusInDatabase = (userId, postId) => {
  const db = getDatabase();
  const postRef = ref(db, `posts/${postId}/likes`);

  runTransaction(postRef, (post) => {
    if (post) {
      if (post.likedBy && post.likedBy[userId]) {
        post.likesCount--;
        post.likedBy[userId] = null;

        set(ref(db, "users/" + userId + "/likes/" + postId), {
          liked: {},
        });
      } else {
        post.likesCount++;
        if (!post.likedBy) {
          post.likedBy = {};
        }
        post.likedBy[userId] = true;
        set(ref(db, "users/" + userId + "/likes/" + postId), {
          liked: true,
        });
      }
    }
    // console.log(post);
    return post;
  });
};
export default updateLikeStatusInDatabase;
