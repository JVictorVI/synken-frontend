import { useEffect, useState } from "react";
import { getAllUsers } from "./FollowersService";
import FollowerHeader from "../FollowerHeader/FollowerHeader";

function FollowersFeed() {
  const [users, setUsers] = useState([]);

  const handleChatClick = (chatUser) => {
    sessionStorage.setItem("chatUser", JSON.stringify(chatUser));
    window.location.href = `/chat/${chatUser.username}`;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <FollowerHeader
          key={user.id}
          user={user}
          onChatClick={handleChatClick}
        />
      ))}
    </div>
  );
}

export default FollowersFeed;
