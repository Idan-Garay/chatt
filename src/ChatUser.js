import { useState } from "react"
import {
  Redirect
} from "react-router-dom";

export default function ChatUser({name, setName}) {
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Name submitted: " + name);
    setRedirect(true);
    //redirected to a channel with the user
  }

  return (
    <div className="bg-green-50 border-2 w-1/4 rounded mx-auto border-green-700">

      {
        redirect
        ? <Redirect to="/chat" />
        : null
      }
      <form
        className="max-w-2/3 w-auto border-blue-400 border flex"
        onSubmit={handleSubmit}
      >
        <div className=" space-x-1 flex items-center">
          <input 
            type="text"
            className="h-10 w-30 placeholder-gray-700 px-2"
            placeholder="Type a name..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button className="bg-green-700 text-white h-8 px-2 rounded border-2 border-green-900">
            Chat 
          </button>
        </div>
        
      </form>
    </div>
  )
}