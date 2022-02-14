import React, { useState, useEffect } from "react";
import CreatePost from "../../ui/CreatePost";

import { useSelector } from "react-redux";
import PostDisplay from "./PostDisplay";
// import styles from "./MainHome.module.css";

function MainHome() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const createPostClickHandler = () => {
    setShowCreatePost(!showCreatePost);
  };

  return (
    <div>
      <div className="text-center my-4">
        <button
          type="button"
          className="btn btn-dark"
          onClick={createPostClickHandler}
        >
          Create Post
        </button>
      </div>
      {showCreatePost && (
        <CreatePost createPostCancel={createPostClickHandler} />
      )}
      <PostDisplay/>
    </div>
  );
}

export default MainHome;
