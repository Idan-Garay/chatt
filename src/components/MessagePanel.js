import Input from "./Input";
import Message from "./Message";
import { useState, useEffect } from "react";
import socket from "../socket";

export default function MessagePanel({ selectedUser, user }) {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit("private message", { content, user });
    setContent("");
  };

  const displayMessages = () => {
    const messages = selectedUser.messages;
    messages.push(content);
    return selectedUser.messages.map((message, index) => (
      <Message key={index} input={message} />
    ));
  };

  useEffect(() => {
    const messages = selectedUser.messages.filter(
      (message) => message.from === user.username
    );
    messages.push(
      user.messages.filter((message) => {
        console.log(message.to, message.recipient);
        return message.to === selectedUser.username;
      })
    );
    setMessages(messages);
    console.log(messages);
  }, [messages.length]);

  return (
    <div className="flex flex-col justify center right-panel border-2 w-full h-screen border-blue-500">
      <header className="pl-2 pt-2 text-2xl h-16">
        {selectedUser.username}
      </header>
      <div className="message-panel min-h-screen border-2 flex flex-col justify-items-stretch bg-red-50">
        <div className="messages-space p-5 pb-2 border-2 flex-grow-4 space-y-3 h-5/6 bg-white flex flex-col flex-wrap-reverse items-start text-white">
          {displayMessages()}
        </div>
        <Input
          user={user}
          content={content}
          setContent={setContent}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
