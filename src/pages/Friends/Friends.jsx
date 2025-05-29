import FollowersFeed from "../../components/FollowersFeed/FollowersFeed";
import Navebar from "../../components/Navebar/Navebar";
import styles from "./Friends.module.css";

function Friends() {
  return (
    <div className={styles.friends}>
      <title>Pesquisa</title>
      <>
        <Navebar />
        <FollowersFeed />
      </>
    </div>
  );
}

export default Friends;
