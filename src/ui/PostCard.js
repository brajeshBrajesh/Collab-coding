import React from "react";
import styles from "./PostCard.module.css";
function PostCard(props) {
  // console.log(props.details);
  // console.log(props.details.key);
  // console.log(props.details.userDetails.userId);
  const deleteHandler = (keyOfPost, postUserId, imagePath) => {
    console.log(imagePath);
    if (window.confirm("Sure delete the post?"))
      props.deletePost(keyOfPost, postUserId, imagePath);
  };
  return (
    <div
      className="container my-3"
      style={{ border: "2px solid black", whiteSpace: "pre-wrap" }}
    >
      <h4>{props.details.userDetails.userName}</h4>
      {props.details.personalPost && (
        <div>
          <button>Edit</button>
          <button
            onClick={() =>
              deleteHandler(
                props.details.key,
                props.details.userDetails.userId,
                props.details.content.img_path
              )
            }
          >
            Delete
          </button>
        </div>
      )}

      <h1>{props.details.content.title}</h1>
      <p>{props.details.time}</p>
      <p>{props.details.content.desc}</p>
      {props.details.content.img_URL !== "" && (
        <img
          src={props.details.content.img_URL}
          alt="Image"
          style={{ height: "200px", width: "200px" }}
        />
      )}
      <div className="cardFooter">
        <button>Like</button> 12 <br />
        <button>Dislike</button> 1
      </div>
    </div>
  );
}

export default PostCard;
