
import { useHistory } from "react-router-dom";

export default function ChatUser({name, setName, user}) {
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    history.push("/chat");
  }

  return (
    <div className="bg-green-50 border-2 w-1/4 rounded mx-auto border-green-700">
      <fieldset>
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