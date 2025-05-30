import { useEffect } from "react";
import Post from "../Post/Post";
import { getPosts } from "./FeedService";

import styles from "./Feed.module.css";

function Feed({ posts, setPosts }) {
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.feed}>
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
    </div>
  );
}

export default Feed;
