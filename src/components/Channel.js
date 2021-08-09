import {useState, useEffect} from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../services/firebase";
import Message from "./Message";

export function Channel() {

  const [messages, setMessages] = useState([]);
  // const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const onNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  }

  useEffect(() => {
    const getQueryData = async () => {
      const querySnapshot = await getDocs(collection(db, "messages"));
      setMessages(querySnapshot.docs.map(data => data.data()));
    }
    getQueryData();
  }, [messages.length]);

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
      <div className="bg-white px-2 h-120px w-100">
        {
          messages.length
          ? messages.map(data => <Message key={data.id} text={data.text} date={data.date} />)
          : "Still Empty..."
        }
      </div>
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