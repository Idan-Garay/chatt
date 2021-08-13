import { useState, useRef } from "react"
import {
  Redirect
} from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

export default function ChatUser({name, setName, user}) {
  const [redirect, setRedirect] = useState(false);
  const formRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Name submitted: " + name);
    setRedirect(true);
    //redirected to a channel with the user
  }

  useEffect(() => {
    if (!user) {
      formRef.current.disabled = true;
    }
  }, [user])

  return (
    <div className="bg-green-50 border-2 w-1/4 rounded mx-auto border-green-700">

      {
        redirect
        ? <Redirect to="/chat" />
        : null
      }
      <fieldset ref={formRef}>
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
      </fieldset>
      {
        user
        ? null
        : <h1 className="text-red-700 text-center text-xl font-bold"> Please Login first!</h1>
      }
    </div>
  )
}