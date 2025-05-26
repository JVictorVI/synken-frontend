import styles from "./FollowerHeader.module.css";
import default_pfp from "../../assets/undefined_pfp.png";

function FollowerHeader({ user, onChatClick }) {
  return (
    <div className={styles.followerHeader}>
      <div className={styles.profileBanner} onClick={() => onChatClick(user)}>
        <div className={styles.profileHead}>
          <img
            src={user.profilePicture ? user.profilePicture : default_pfp}
            alt="Profile"
          />
          <div className={styles.profileInfo}>
            <h2>{user.name}</h2>
            <p>@{user.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowerHeader;
