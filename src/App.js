import { hot } from "react-hot-loader/root";
import { useState } from "react";
import Chat from "./components/Chat";
import "tailwindcss/tailwind.css";

function App() {
  // const [selectedUser, setselectedUser] = useState(initialState)
  return (
    <div className="border-4 h-screen">
      <Chat />
    </div>
  );
}

export default hot(App);
