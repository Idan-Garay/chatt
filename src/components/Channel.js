import {useState} from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../services/firebase";

export function Channel() {

  // const [messages, setMessages] = useState([]);
  // const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const onNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    // add message data to firestore db
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        text: newMessage,
        date: new Date().toLocaleString()
      });
      setNewMessage("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="bg-gray-500 h-full w-8/10 p-2">
      Channel
      <br />
      <div className="bg-white px-2 h-120px w-100"></div>
      <form
        onSubmit={handleSubmit}
      >
        <input 
          type="text"
          value={newMessage}
          onChange={onNewMessageChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}