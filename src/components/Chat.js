import './Chat.css'
import { useState, useEffect } from 'react';
import socket from './socket';
import User from './User';
import MessagePanel from './MessagePanel';

export default function Chat() {
  const [selectedUser, setselectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const onMessage = (content) => {
    if (selectedUser) {
      socket.emit("private message", {
        content,
        to: selectedUser.userID,
      });
      selectedUser.messages.push({
        content,
        fromSelf: true,
      });
      setselectedUser(selectedUser);
    }
  }

  const onSelectUser = user => {
    user.hasNewMessages = false;
    setselectedUser(user);
  }

  useEffect(() => {
    socket.on("connect", () => {
      users.forEach((user) => {
        if (user.self) {
          user.connected = true;
        }
      });
    });

    socket.on("disconnect", () => {
      users.forEach((user) => {
        if (user.self) {
          user.connected = false;
        }
      });
    });

    const initReactiveProperties = (user) => {
      user.messages = [];
      user.hasNewMessages = false;
    };

    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        initReactiveProperties(user);
      });
      // put the current user first, and sort by username
      setUsers(users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      }));
    });

    socket.on("user connected", (user) => {
      initReactiveProperties(user);
      users.push(user);
      setUsers(users);
    });

    socket.on("user disconnected", (id) => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.userID === id) {
          user.connected = false;
          break;
        }
      }
    });

    socket.on("private message", ({ content, from }) => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.userID === from) {
          user.messages.push({
            content,
            fromSelf: false,
          });
          if (user !== selectedUser) {
            user.hasNewMessages = true;
          }
          break;
        }
      }
    });

  },)

  return (
    <div>
      <div className="left-panel">
        {
          users.map(({user, selected, status, connected}, index) => (
            <User key={index} selected={selectedUser === user} onClick={() => onSelectUser(user)} />
          ))
        }
      </div>
      {
        selectedUser
        ? <MessagePanel user={selectedUser} onSubmit={onMessage} className="right-panel"/>
        : null
      }
    </div>
  )
}