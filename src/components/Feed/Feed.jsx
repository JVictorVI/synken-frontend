import { useEffect, useState } from "react";
import Post from "../Post/Post";
import { getPosts } from "./FeedService";

import styles from "./Feed.module.css";
import Loader from "../Loader/Loader";

function Feed({ posts, setPosts }) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const data = await getPosts();
      setPosts(data);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.feed}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </>
          ) : (
            <>
              <h3> Nenhum post para exibir no momento...</h3>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Feed;
