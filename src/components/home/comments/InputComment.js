import React, { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import postComment from "./functions/postComment";
import { getDatabase, ref, set, push } from "firebase/database";

export default function InputComment(props) {
  let comment = useRef();
  const userName = useSelector((state) => state.login.userName);
  const userId = useSelector((state) => state.login.loginId);

  const db = getDatabase();
  const commentListRef = ref(db, props.path);
  const newCommentRef = push(commentListRef);
  const newPath = props.path + "/" + newCommentRef.key;

  const postCommentHandler = () => {
    if (window.confirm("Sure want to post!")) {
      postComment(comment, userName, userId, newPath, newCommentRef);
      props.addComment(
        comment.current.value,
        userName,
        userId,
        newPath,
        newCommentRef.key
      );
      comment.current.value = "";
    }
  };
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="exampleInputtext1" className="form-label">
          Enter comment
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputtext1"
          aria-describedby="textHelp"
          ref={comment}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={postCommentHandler}
        >
          Post
        </button>
      </div>
    </div>
  );
}
