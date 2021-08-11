import { useState } from "react"

export default function ChatUser() {
  const [name, setName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Name submitted:" + name);
    //redirected to a channel with the user
  }

  return (
    <div className="bg-green-50 border-2 border-green-700">
      <form
      
      >
        <div>
          <input 
            type="text"
            className="h-10 w-30 placeholder-gray-700"
            placeholder="Type a name..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button className="bg-green-700 text-white h-8 p-2 border-2 border-green-900">
            Chat 
          </button>
        </div>
        
      </form>
    </div>
  )
}