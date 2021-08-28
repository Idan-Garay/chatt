import './Chat.css'
import { useState, useEffect } from 'react'
import socket from './socket'
import MessagePanel from './MessagePanel'
import User from './User'

export default function Chat({username}) {
  const [message, setMessage] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([]);

  const onMessage = e => {
    e.preventDefault();
    if (selectedUser) {
      socket.emit("private message", {username, content: message});
      setMessage('');
    }
  }

  const onSelectUser = user => {
    user.hasNewMessages = false;
    setSelectedUser(user);
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
      setUsers([...users, user]);
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
      let i, len;
      len = users.length;

      for (let i = 0; i < len && users[i].userID === from; i++) {}

      if (i < users.length) {
        const user = users[i];
        user.messages.push({
          content,
          fromSelf: false,
        });
        if (user !== selectedUser) {
          user.hasNewMessages = true;
        }
        setUsers()
      }
    });

  })

  return (
    <div>
      <div className="left-panel">
      {
        users.map(({user, selected, onClick}, index) => (
          <User key={index} selected={selectedUser === user} onClick={() => onSelectUser(user)} />
        ))
      }
      </div>
      <div className="right-panel">
        {
          selectedUser
          ? <MessagePanel user={selectedUser} onSubmit={onMessage} className="right-panel"/>
          : null
        }
      </div>
    </div>
  )
}