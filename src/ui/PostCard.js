import React from "react";
import styles from "./PostCard.module.css";
function PostCard(props) {
  return (
    <div className="container my-3" style={{ border: "2px solid black" }}>
      <h4>{props.details.userDetails.userName}</h4>
      {props.details.personalPost && (
        <div>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      )}
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
