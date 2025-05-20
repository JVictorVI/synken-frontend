import { useState } from "react";
import styles from "./Home.module.css";
import { useEffect } from "react";
import Feed from "../../components/Feed/Feed";
import Navebar from "../../components/Navebar/Navebar";
import PostHeader from "../../components/PostHeader/PostHeader";
import NewPostModal from "../../components/NewPostModal/NewPostModal";

function Home() {
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const userString = await sessionStorage.getItem("user");
      const userData = await JSON.parse(userString);
      setUser(userData);
    }
    fetchUser();
  }, []);

  return (
    <div className={styles.home}>
      <title>Home</title>
      <>
        <Navebar username={user.username} />
        <PostHeader user={user} setIsModalOpen={setIsModalOpen} />
        <NewPostModal
          user={user}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <Feed />
      </>
    </div>
  );
}

export default Home;
