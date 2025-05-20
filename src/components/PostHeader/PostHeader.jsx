import styles from "./PostHeader.module.css";
import default_pfp from "../../assets/undefined_pfp.png";

function PostHeader({ user, setIsModalOpen }) {
  return (
    <div className={styles.profileHub}>
      <img
        src={user.profilePicture ? user.profilePicture : default_pfp}
        alt="Profile"
      />
      <div
        className={styles.newPostContainer}
        onClick={() => setIsModalOpen(true)}
      >
        <p>No que está pensando, {user.name}?</p>
      </div>
    </div>
  );
}

export default PostHeader;
