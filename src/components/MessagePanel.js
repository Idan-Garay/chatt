import Input from "./Input";
import Message from "./Message";
import { useState, useEffect } from "react";

export default function MessagePanel({ selectedUser }) {
  const displayMessages = () => {
    return selectedUser.messages.map((message) => <Message input={message} />);
  };

  return (
    <div className="flex flex-col justify center right-panel border-2 w-full h-screen border-blue-500">
      <header className="pl-2 pt-2 text-2xl h-16">
        {selectedUser.username}
      </header>
      <div className="message-panel min-h-screen border-2 flex flex-col justify-items-stretch bg-red-50">
        <div className="messages-space p-5 pb-2 border-2 flex-grow-4 space-y-3 h-5/6 bg-white flex flex-col flex-wrap-reverse items-start text-white">
          {displayMessages()}
        </div>
        <Input />
      </div>
    </div>
  );
}
