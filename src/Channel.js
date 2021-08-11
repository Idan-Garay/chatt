
import { useEffect, useState } from "react";
import "firebase/database";
import db from "./firebase";
import Message from "./Message";
import { doc, query, orderBy, limit, collection, getDocs, addDoc } from "firebase/firestore";


export default function Channel() {
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");
  const [newMessage, setNewMessage] = useState("")

  // const unsub = onSnapshot(collection(db, "messages"),
  //   doc => {
  //     console.log("current data: ", doc.data);
  //     setMessages(doc.data);
  //   }
  // );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      date: new Date().toLocaleDateString()
    })
    setNewMessage("");
    getQueryData();
  }

  useEffect(() => {
    const controller = new AbortController();
    getQueryData()
    return () =>  controller.abort();
  }, []);

  return (
    <>
      <div className="h-5/6 bg-green-200">
        <div className=" h-full flex flex-col overflow-y-scroll justify-start items-end p-5">
          {
            messages
            ? messages.map(data => (<Message key={data.id} text={data.text} />) )
            : "Loading ..."
          }
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className=" h-20 flex flex-col justify-center border-2  rounded border-green-900 bg-green-300 mt-3"
      >
        <div className="h-12 p-1 w-1/3 mx-auto bg-white rounded border-2 border-green-900 flex">
          <input type="text"
            className="bg-transparent placeholder-gray-700 w-5/6 mr-1 p-1"
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