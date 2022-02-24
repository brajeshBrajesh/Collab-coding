import React, { useState } from "react";
import { useSelector } from "react-redux";
import Comments from "../components/home/comments/Comments";
function CommentCard(props) {
  const [showComments, setShowComments] = useState(false);
  const userId = useSelector((state) => state.login.loginId);
  const commentsHandler = () => {
    setShowComments(!showComments);
  };
  //   console.log(props.path);
  const canDelete = props.userId === userId;
  //   console.log(canDelete);
  let path = props.path + "/comments";
  return (
    <div style={{ border: "1px solid blue" }}>
      <h6>
        {props.name}
      </h6>
      {canDelete && <button >Delete</button>}
      <p>{props.comment}</p>
      <p>{props.time}</p>

      {<button onClick={commentsHandler}>Comments</button>}
      {showComments && <Comments path={path} />}
    </div>
  );
}

export default CommentCard;
