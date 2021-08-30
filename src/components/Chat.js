import { useState } from "react";

export default function Chat() {
  return (
    <div className="flex h-100">
      <div className="left-panel border-r-2 border-blue-100 min-h-screen w-1/5">
        <div className="user border-0 shadow bg-gray-100 p-2">
          <b>Flo Steinle</b>
          {/* last message */}
        </div>
        <div className="user border-0 shadow-xl p-2">
          <b>Flo Steinle</b>
          {/* last message */}
        </div>
      </div>
      <div className="flex flex-col justify center right-panel border-2 w-full h-screen border-blue-500">
        <header className="pl-2 pt-2 text-2xl h-16">Flo Steinle</header>
        <div className="message-panel min-h-screen border-2 flex flex-col justify-items-stretch bg-red-50">
          <div className="messages-space p-5 pb-2 border-2 flex-grow-4 h-5/6 bg-white flex flex-col items-start text-white">
            {" "}
            <div className="bg-purple-500 p-2 rounded">Helldafdsfsafsdo</div>
          </div>
          <form className="border-2 flex justify-center h-auto bg-green-100">
            <input type="text" className="border-1 w-3/4" />
            <button className="w-20 bg-blue-200 p-1 ml-3">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
