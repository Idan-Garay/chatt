import { hot } from "react-hot-loader/root";
import { useState, useEffect } from "react";
import Chat from "./components/Chat";
import "tailwindcss/tailwind.css";
import SelectUser from "./components/SelectUser";

function App() {
  // const [selectedUser, setselectedUser] = useState([]);
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const username = useState("");

  return (
    <div className="border-4 h-screen">
      {isUsernameSet ? (
        <Chat username={username[0]} />
      ) : (
        <SelectUser username={username} setIsUsernameSet={setIsUsernameSet} />
      )}
    </div>
  );
}

export default hot(App);
