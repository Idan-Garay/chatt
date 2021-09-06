import { useState, useEffect } from "react";
import MessagePanel from "./MessagePanel";
import User from "./User";
import socket from "../socket";

export default function Chat({ username }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  //flow of user
  const displayUsers = (users) => {
    let filteredUsers = users.filter((user) => user.self === false);

    filteredUsers = filteredUsers.map((user, index) => (
      <User user={user} key={index} setSelectedUser={setSelectedUser} />
    ));
    return filteredUsers;
  };

  useEffect(() => {
    setUser(users.find((user) => user.username === username));
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = username === user.username ? true : false;
      });
      setUsers(users);
    });

    socket.on("private message", ({ from, content }) => {
      user.messages.push({ from, content });
      setUser(User);
    });
  }, [user, users.length]);

  return (
    <div className="flex h-100">
      <div className="left-panel border-r-2 border-blue-100 min-h-screen w-1/5">
        <div>{username}</div>
        {displayUsers(users)}
      </div>
      <MessagePanel
        user={user}
        selectedUser={selectedUser || { username: "John Doe", messages: [] }}
      />
    </div>
  );
}
