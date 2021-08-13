
import { useEffect, useState, useRef } from "react";
import "firebase/database";
import db from "./firebase";
import Message from "./Message";
import { doc,
  query, 
  orderBy, 
  limit, 
  collection, 
  getDocs, 
  addDoc, 
  onSnapshot 
} from "firebase/firestore";


export default function Channel({name}) {
  const [messages, setMessages] = useState([]);
  // const messagesRef = collection(db, "messages");
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  // const getQueryData = async () => {
  //   const q = query(messagesRef, orderBy("date", "desc"), limit(100));
  //   const querySnapshot = await getDocs(q);

  //   setMessages(querySnapshot.docs.map(doc => {
  //     const {text, date} = doc.data();
  //       return {
  //         id: doc.id,
  //         text: text,
  //         date: new Date(date).toLocaleTimeString()
  //       }
  //     }
  //    )
  //   );
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "messages"), {
      text: newMessage,
      date: new Date().toLocaleString()
    })
    setNewMessage("");
    // getQueryData();
  }

  useEffect(() => {
    const controller = new AbortController();
    // getQueryData();
    
    return () =>  controller.abort();
  });

  const mRef = useRef(messages);
  useEffect(() => {
    const cRef = collection(db, "messages");
    const q = query(cRef, orderBy("date", "desc"), limit(20));
    const unsubscribe = onSnapshot(q, (doc) => {
      const newMessages = [];

      doc.docChanges().forEach(change => {
        if (change.type === "added") {
          const {text, date} = change.doc.data();
          newMessages.push({
            id: change.doc.id,
            text: text,
            date: date
          });
        }
      });

      mRef.current = mRef.current.length === newMessages.length? mRef.current: mRef.current.concat(newMessages);
      setMessages(mRef.current);
    });

    return () => {
      unsubscribe();
      
    }
  }, []);

  return (
    <>
      <div className="h-5/6 bg-green-200 flex flex-col">
        <div className="font-bold tracking-wide text-green-800 text-right text-3xl mr-5">
          {name}
        </div>
        <div ref={scrollRef} name="oof" className="flex-grow-4 flex flex-col overflow-y-scroll justify-start items-end p-5">
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