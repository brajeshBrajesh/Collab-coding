import React, { useEffect, useState } from "react";
// import styles from "./PostCard.module.css";

import { useSelector } from "react-redux";
import checkIfPostIsLikedByUser from "./functions/checkIfPostIsLikedByUser";
import updateLikeStatusInDatabase from "./functions/updateLikeStatusInDatabase";
import Comments from "../components/home/comments/Comments";
import ReportIcon from "@mui/icons-material/Report";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import EditIcon from "@mui/icons-material/Edit";

function PostCard(props) {
  const [likedByUser, setLikedByUser] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const userId = useSelector((state) => state.login.loginId); //from redux
  // console.log("renders again");
  useEffect(() => {
    checkIfPostIsLikedByUser(
      setLikedByUser,
      userId,
      props.details.key,
      setLikesCount
    );
  }, []);

  const deleteHandler = (keyOfPost, postUserId, imagePath) => {
    console.log(imagePath);
    if (window.confirm("Sure delete the post?"))
      props.deletePost(keyOfPost, postUserId, imagePath);
  };

  const likeHandler = () => {
    setLikedByUser(!likedByUser);
    updateLikeStatusInDatabase(userId, props.details.key);
  };

  const commentsHandler = () => {
    setShowComments(!showComments);
  };
  //   return (
  //     <div
  //       className="container my-3"
  //       style={{ border: "2px solid black", whiteSpace: "pre-wrap" }}
  //     >
  //       <h4>{props.details.userDetails.userName}</h4>
  //       {props.details.personalPost && (
  //         <div>
  //           <button>Edit</button>
  //           <button
  //             onClick={() =>
  //               deleteHandler(
  //                 props.details.key,
  //                 props.details.userDetails.userId,
  //                 props.details.content.img_path
  //               )
  //             }
  //           >
  //             Delete
  //           </button>
  //         </div>
  //       )}

  //       <h1>{props.details.content.title}</h1>
  //       <p>{props.details.time}</p>
  //       <p>{props.details.content.desc}</p>
  //       {props.details.content.img_URL !== "" && (
  //         <img
  //           src={props.details.content.img_URL}
  //           alt="Image"
  //           style={{ height: "200px", width: "200px" }}
  //         />
  //       )}
  //       <div className="cardFooter">
  //         <button onClick={likeHandler}>{likedByUser ? "Unlike" : "Like"}</button>
  //         {likesCount} <br />
  //         {/* <button>Dislike</button> 1 */}
  //         <button onClick={commentsHandler}>Comments</button>
  //         {showComments && <Comments path={`comments/${props.details.key}`} />}
  //       </div>
  //     </div>
  //   );
  // }

  // export default PostCard;

  // export default function PoatCard() {
  return (
    <Card
      sx={{
        maxWidth: 800,
        // border: "2px solid pink",
        borderRadius: "10px",
        position: "relative",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        justify: "center",
        paddingLeft: "1%",
        paddingRight: "1%",
        textAlign: "justify",
        // display: "flex",
        margin: "auto",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          props.details.personalPost && (
            <div>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>

              <IconButton
                aria-label="delete"
                onClick={() =>
                  deleteHandler(
                    props.details.key,
                    props.details.userDetails.userId,
                    props.details.content.img_path
                  )
                }
              >
                {/* <MoreVertIcon /> */}
                <DeleteIcon />
              </IconButton>
            </div>
          )
        }
        title={props.details.userDetails.userName}
        subheader={props.details.time}
      />
      <Typography variant="subtitle1" gutterBottom component="div">
        <b>{props.details.content.title}</b>
      </Typography>
      {props.details.content.img_URL !== "" && (
        <CardMedia
          component="img"
          // height="194"
          image={props.details.content.img_URL}
          alt="Image"
          sx={{
            borderRadius: "15px",
          }}
        />
      )}
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {props.details.content.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="like"
          sx={{ background: likedByUser ? "blue" : "white" }}
          onClick={likeHandler}
        >
          <ThumbUpRoundedIcon />
        </IconButton>{" "}
        <span>{likesCount}</span>
        <IconButton
          aria-label="comment"
          sx={{ marginLeft: "3rem" }}
          onClick={commentsHandler}
        >
          <QuestionAnswerOutlinedIcon />
        </IconButton>
      </CardActions>
      {showComments && <Comments path={`comments/${props.details.key}`} />}
    </Card>
  );
}

export default PostCard;
