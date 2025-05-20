import styles from "./Post.module.css";
import default_pfp from "../../assets/undefined_pfp.png";
import { formatDateString } from "../../Service/GeneralService";

function Post({ post }) {
  return (
    <div>
      <>
        <div className={styles.post}>
          <div className={styles.postProfileHead}>
            <img
              src={
                post.user.profilePicture
                  ? post.user.profilePicture
                  : default_pfp
              }
              alt="Profile"
              onClick={() => {
                window.location.href = `/profile/${post.user.username}`;
              }}
            />
            <div className={styles.postProfileInfo}>
              <h2>{post.user.name}</h2>
              <p>@{post.user.username}</p>
              <span>{formatDateString(post.createdAt)}</span>
            </div>
          </div>

          <div className={styles.text}>
            <p>{post.content}</p>
          </div>

          {post.imgPost ? (
            <img src={post.imgPost} className={styles.postImage} alt="Post" />
          ) : null}
        </div>
      </>
    </div>
  );
}

export default Post;
