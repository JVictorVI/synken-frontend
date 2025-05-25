import { useEffect, useState } from "react";
import { getAllUsers } from "./FollowersService";
import FollowerHeader from "../FollowerHeader/FollowerHeader";

function FollowersFeed() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
      console.log(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <FollowerHeader key={user.id} user={user} />
      ))}
    </div>
  );
}

export default FollowersFeed;
