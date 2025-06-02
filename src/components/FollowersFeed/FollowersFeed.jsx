import { useEffect, useState } from "react";
import { getAllUsers } from "./FollowersService";
import FollowerHeader from "../FollowerHeader/FollowerHeader";
import Loader from "../Loader/Loader";

function FollowersFeed() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));

  const handleChatClick = (chatUser) => {
    sessionStorage.setItem("chatUser", JSON.stringify(chatUser));
    window.location.href = `/chat/${chatUser.username}`;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await getAllUsers(sessionUser.username);
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {users.length > 0 ? (
            <>
              {users.map((user) => (
                <FollowerHeader
                  key={user.id}
                  user={user}
                  onChatClick={handleChatClick}
                />
              ))}
            </>
          ) : (
            <h3>Nenhum amigo disponível para conversar...</h3>
          )}
        </>
      )}
    </div>
  );
}

export default FollowersFeed;
