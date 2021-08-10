import {useState, useEffect} from "react";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit
} from "firebase/firestore";
import db from "../services/firebase";
import Message from "./Message";

export function Channel() {

  const [messages, setMessages] = useState([]);
  // const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  const onNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  }

  const getQueryData = async () => {
    const q = query(messagesRef, orderBy("date", "asc"), limit(100));
    const querySnapshot = await getDocs(q);

    setMessages(querySnapshot.docs.map(doc => {
      const {text, date} = doc.data();
        return {
          id: doc.id,
          text: text,
          date: new Date(date).toLocaleTimeString()
        }
      }
     )
    );
  };

  useEffect(() => {
    getQueryData();
  }, []);

  // add and fetches data
  const handleSubmit = async e => {
    e.preventDefault();
    // add message data to firestore db
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        text: newMessage,
        date: new Date().toLocaleString(),
      });
      setNewMessage("");
      getQueryData();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className=" bg-blend-darken bg-gray-700 h-full overflow-y-scroll flex flex-col">
      <div className=" w-full flex flex-col overflow-y-scroll" >
      {
        messages.length
        ? messages.map((message) => <Message key={message.id} text={message.text} date={message.date} />)
        : "Still Empty..."
      }
      </div>
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded
        px-4 py-2 my-2
        bg-gray-400 w-3/4 
        mx-auto
        "
      >
        <input 
          type="text"
          value={newMessage}
          onChange={onNewMessageChange}
          placeholder="Type your message here..."
          className="h-10 w-5/6 mr-2 bg-transparent text-white-500 placeholder-gray-600"
        />
        <button type="submit"
          className="border p-2 rounded text-gray-500 font-bold "
        >
          Send
        </button>
      </form>
    </div>
  )
}