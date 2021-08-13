
import { useEffect, useState, useRef } from "react";
import "firebase/database";
import db from "./firebase";
import Message from "./Message";
import {
  query, 
  orderBy, 
  limit, 
  collection, 
  addDoc, 
  onSnapshot 
} from "firebase/firestore";


export default function Channel(props) {
  const [messages, setMessages] = useState([]);
  // const messagesRef = collection(db, "messages");
  const [newMessage, setNewMessage] = useState("");
  const mRef = useRef(messages);
  const cRef = collection(db, "message");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString();
    const data = {
      text: newMessage,
      date: date,
      receiver: props.receiver,
      sender: props.sender,
    }
    await addDoc(cRef, data)
    setNewMessage("");
    // getQueryData();
  }

  useEffect(() => {
    const controller = new AbortController();
    // getQueryData();
    
    return () =>  controller.abort();
  });

  useEffect(() => {
    const q = query(cRef, orderBy("date", "asc"), limit(20));
    const unsubscribe = onSnapshot(q, (doc) => {
      const newMessages = [];

      doc.docChanges().forEach(change => {
        if (change.type === "added") {
          const {text, date_created, receiver, sender} = change.doc.data();
          
          if (receiver === props.receiver && sender === props.sender) {
            newMessages.push({
              id: change.doc.id,
              receiver: props.receiver,
              sender: props.sender,
              text: text,
              date: date_created
            });
          }
        }
      });

      mRef.current = mRef.current.length === newMessages.length? mRef.current: mRef.current.concat(newMessages);
      setMessages(mRef.current);
    }, [mRef.current.length]);

    return () => {
      unsubscribe();
      setMessages([]);
    }
  }, []);

  return (
    <>
      <div className="h-5/6 bg-green-200 flex flex-col">
        <div className="font-bold tracking-wide text-green-800 text-right text-3xl mr-5 py-2">
          {props.receiver}
        </div>
        <div name="oof" className="flex-grow-4 border-t-2 border-green-900 flex flex-col overflow-y-auto min-h-5/6 justify-start items-end p-5">
          {
            messages
            ? messages.map(data => (<Message key={data.id} text={data.text} />) )
            : "Loading ..."
          }
        </div>
      </div>
      <form 
        onSubmit={handleSubmit}
        className=" h-20 flex flex-col justify-center border-2  rounded border-green-900 bg-green-400 mt-3"
      >
        <div className="h-12 p-1 w-1/3 mx-auto bg-white rounded border-2 border-green-900 flex">
          <input type="text"
            className="bg-transparent placeholder-gray-700 w-5/6 mr-1 p-1
             outline-none"
            placeholder="type text here..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <button 
            className="text-green-900 font-extrabold tracking-wider px-2 w-auto"
          >
            Send
          </button>
        </div>
      </form>
    </>
  )
}