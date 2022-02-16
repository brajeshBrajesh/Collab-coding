import React, { useState, useEffect } from "react";
import InputComment from "./InputComment";

import loadAllCommentsOfPost from "./functions/loadAllCommentsOfPost";
import CommentCard from "../../../ui/CommentCard";
export default function Comments(props) {
  const [toDisplayComments, setToDisplayComments] = useState([]);
  console.log(props.path);
  useEffect(() => {
    loadAllCommentsOfPost(props.path, setToDisplayComments);
  }, []);
  const addToComment = (comment, userName, userId, newPath, key) => {
    console.log("added to comment");
    // console.log(comment)
    let comments = [...toDisplayComments];
    comments.push({
      comment: comment,
      name: userName,
      time: new Date().toLocaleString(),
      path: newPath,
      userId: userId,
      key: key,
    });
    setToDisplayComments(comments);
  };
  return (
    <div>
      <InputComment path={props.path} addComment={addToComment} />
      <div style={{ padding: "50px" }}>
        {toDisplayComments.map((commentDetails) => (
          <CommentCard
            key={commentDetails.key}
            name={commentDetails.name}
            comment={commentDetails.comment}
            time={commentDetails.time}
            path={commentDetails.path}
            userId={commentDetails.userId}
          />
        ))}
      </div>
    </div>
  );
}
