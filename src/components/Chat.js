import { useState, useEffect } from "react";
import MessagePanel from "./MessagePanel";
import User from "./User";
import socket from "../socket";

export default function Chat({ username }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const displayUsers = (users) => {
    let filteredUsers = users.filter((user) => user.self === false);

    filteredUsers = filteredUsers.map((user, index) => (
      <User user={user} key={index} />
    ));
    return filteredUsers;
  };

  useEffect(() => {
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = username === user.username ? true : false;
      });
      setUsers(users);
    });
  });

  return (
    <div className="flex h-100">
      <div className="left-panel border-r-2 border-blue-100 min-h-screen w-1/5">
        <div>{username}</div>
        {displayUsers(users)}
      </div>
      <MessagePanel selectedUser={selectedUser} />
    </div>
  );
}
