import { useState } from "react";
import MessagePanel from "./MessagePanel";
import User from "./User";

export default function Chat() {
  return (
    <div className="flex h-100">
      <div className="left-panel border-r-2 border-blue-100 min-h-screen w-1/5">
        <User />
        <User />
      </div>
      <MessagePanel />
    </div>
  );
}
