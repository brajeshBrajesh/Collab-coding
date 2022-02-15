import React, { useEffect, useState } from "react";
import styles from "./PostCard.module.css";

import { useSelector } from "react-redux";
import checkIfPostIsLikedByUser from "./functions/checkIfPostIsLikedByUser";
import updateLikeStatusInDatabase from "./functions/updateLikeStatusInDatabase";

function PostCard(props) {
  const [likedByUser, setLikedByUser] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

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
        <button onClick={likeHandler}>{likedByUser ? "Unlike" : "Like"}</button>{" "}
        {likesCount} <br />
        {/* <button>Dislike</button> 1 */}
      </div>
    </div>
  );
}

export default PostCard;

// import * as React from "react";
// import "./Post.module.css";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import CommentIcon from "@mui/icons-material/Comment";
// import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
// import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

// import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
// import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function RecipeReviewCard() {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <div className="container">
//       <Card sx={{ maxWidth: 345 }}>
//         <CardHeader
//           avatar={
//             <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//               S
//             </Avatar>
//           }
//           action={
//             <IconButton aria-label="settings">
//               <MoreVertIcon />
//             </IconButton>
//           }
//           title="DSA Problem"
//           subheader="February 16, 2022"
//         />
//         <CardMedia component="img" height="194" image="" alt="Coding problem" />
//         What if, instead of being able to climb 1 or 2 steps at a time, you
//         could climb any number from a set of positive integers X? For example,
//         if X = {(1, 3, 5)}, you could climb 1, 3, or 5 steps at a time.
//         Generalize your function to take in X
//         <CardContent>
//           <Typography variant="body2" color="text.secondary"></Typography>
//         </CardContent>
//         <CardActions disableSpacing>
//           <IconButton aria-label="like">
//             <ThumbUpRoundedIcon />
//           </IconButton>
//           <IconButton aria-label="dislike">
//             <ThumbDownAltRoundedIcon />
//           </IconButton>
//           <IconButton aria-label="comment">
//             <QuestionAnswerOutlinedIcon />
//           </IconButton>

//           <ExpandMore
//             expand={expanded}
//             onClick={handleExpandClick}
//             aria-expanded={expanded}
//             aria-label="show more"
//           >
//             <ExpandMoreIcon />
//           </ExpandMore>
//         </CardActions>
//         <Collapse in={expanded} timeout="auto" unmountOnExit>
//           <CardContent>
//             <Typography paragraph>Method:</Typography>
//             <Typography paragraph>
//               Heat 1/2 cup of the broth in a pot until simmering, add saffron
//               and set aside for 10 minutes.
//             </Typography>
//             <Typography paragraph>
//               Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
//               over medium-high heat. Add chicken, shrimp and chorizo, and cook,
//               stirring occasionally until lightly browned, 6 to 8 minutes.
//               Transfer shrimp to a large plate and set aside, leaving chicken
//               and chorizo in the pan. Add pimentón, bay leaves, garlic,
//               tomatoes, onion, salt and pepper, and cook, stirring often until
//               thickened and fragrant, about 10 minutes. Add saffron broth and
//               remaining 4 1/2 cups chicken broth; bring to a boil.
//             </Typography>
//             <Typography paragraph>
//               Add rice and stir very gently to distribute. Top with artichokes
//               and peppers, and cook without stirring, until most of the liquid
//               is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
//               reserved shrimp and mussels, tucking them down into the rice, and
//               cook again without stirring, until mussels have opened and rice is
//               just tender, 5 to 7 minutes more. (Discard any mussels that don’t
//               open.)
//             </Typography>
//             <Typography>
//               Set aside off of the heat to let rest for 10 minutes, and then
//               serve.
//             </Typography>
//           </CardContent>
//         </Collapse>
//       </Card>
//     </div>
//   );
// }
