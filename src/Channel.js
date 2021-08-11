
import { useEffect, useState } from "react";
import "firebase/database";
import db from "./firebase";
import Message from "./Message";
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";


export default function Channel() {
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");

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

  // const getMessagesFromFireStore = () => {
  //   const q = query(collection(db, "messages"), orderBy('data', 'asc'), limit(20));

  //   const data = getDocs(q)
  //     .then(res => {
  //       return res.docs.map(doc => {
  //         console.log(doc);
  //         const {text, date} = doc.data();
  //         return {
  //           text: text,
  //           date: new Date(date).toLocaleTimeString()
  //         }
  //       })
  //     })
  //     .then(setMessages)
  //     .catch(console.log)

  //   }

  useEffect(() => {
    getQueryData();
  }, []);

  console.log(messages);

  return (
    <div className="bg-green-200 h-full flex flex-col justify-start items-end p-2">
      {
        messages
        ? messages.map(data => (<Message text={data.text} />) )
        : "Loading ..."
      }
      <form
        onSubmit={() => {}}
        className="h-12 p-1 w-1/3 mx-auto bg-green-300 rounded border-2 border-green-900 flex"
      >
        <input type="text"
          className="bg-transparent placeholder-gray-700 w-5/6 mr-1 p-1"
          placeholder="type text here..."
        />

        <button 
          className="text-white font-extrabold tracking-wider px-2 w-auto"
        >
          Send
        </button>
      </form>
    </div>
  )
}