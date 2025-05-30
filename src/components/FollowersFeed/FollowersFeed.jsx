import { useEffect, useState } from "react";
import { getAllUsers } from "./FollowersService";
import FollowerHeader from "../FollowerHeader/FollowerHeader";

function FollowersFeed() {
  const [users, setUsers] = useState([]);
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));

  const handleChatClick = (chatUser) => {
    sessionStorage.setItem("chatUser", JSON.stringify(chatUser));
    window.location.href = `/chat/${chatUser.username}`;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers(sessionUser.username);
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default FollowersFeed;
