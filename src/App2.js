import socket from "./socket";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [recipient, setRecipient] = useState("");
  // const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

  // const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", messages: [] });

  useEffect(() => {
    socket.on("private message", ({ from, content }) => {
      user.messages.push({ from, content });
      setUser({ ...user });
    });
  }, [user.messages.length]);

  const sendMessage = (e) => {
    e.preventDefault();

    socket.username = username;
    socket.emit("private message", { username, message, recipient });
    setMessage("");
  };

  const connectToServer = (e) => {
    e.preventDefault();
    socket.auth = { username };
    socket.connect();
    setShowChat(true);
  };

  return (
    <div>
      <h1>Chat</h1>
      {showChat ? (
        <form onSubmit={sendMessage}>
          <br />
          <label>
            {" "}
            Recipient
            <input
              type="text"
              onChange={(e) => setRecipient(e.target.value)}
              value={recipient}
            />
          </label>
          <br />
          <label>
            Message
            <input
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </label>
          <button>Submit</button>
        </form>
      ) : (
        <form onSubmit={connectToServer}>
          <label>
            {" "}
            Username
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <button>Submit</button>
          </label>
        </form>
      )}

      <div>
        {user.messages.map((message, index) => (
          <pre key={index}>
            {message.from}
            {message.content}
          </pre>
        ))}
      </div>
    </div>
  );
}
