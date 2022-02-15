import PostCard from "../../ui/PostCard";

import { useState, useEffect } from "react";
import app from "../../firebase/Firebase";
import { useSelector } from "react-redux";
import postFetch from "./functions/postFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../ui/Spinner";
import deleteTheGivenPost from "./functions/deleteTheGivenPost";

function PostDisplay() {
  const userId = useSelector((state) => state.login.loginId);
  // const userPosts=useSelector(state=>state.post.allPosts);

  const [limit, setLimit] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const [toDisplayPosts, setToDisplayPosts] = useState([]);

  useEffect(() => {
    postFetch(
      limit,
      setHasMore,
      setToDisplayPosts,
      toDisplayPosts,
      // userPosts,
      userId
    );
  }, [limit]);
  const loadMoreHandler = () => {
    setLimit(limit + 3);
  };

  const deletePostHandler = (postId, postUserId, imagePath) => {
    // console.log(postId + " post deleted by " + postUserId);
    deleteTheGivenPost(
      postId,
      postUserId,
      toDisplayPosts,
      setToDisplayPosts,
      imagePath
    );
  };
  return (
    <InfiniteScroll
      dataLength={toDisplayPosts.length} //This is important field to render the next data
      next={loadMoreHandler}
      hasMore={hasMore}
      loader={<Spinner />}
      endMessage={<h3>No more post</h3>}
    >
      <div className="container">
        <div className="row m-2">
          {toDisplayPosts.map((post) => (
            <PostCard
              key={post.key}
              details={post}
              deletePost={deletePostHandler}
            />
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default PostDisplay;
