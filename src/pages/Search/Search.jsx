import FollowersFeed from "../../components/FollowersFeed/FollowersFeed";
import Navebar from "../../components/Navebar/Navebar";
import styles from "./Search.module.css";

function Search() {
  return (
    <div className={styles.search}>
      <title>Pesquisa</title>
      <>
        <Navebar />
        <FollowersFeed />
      </>
    </div>
  );
}

export default Search;
