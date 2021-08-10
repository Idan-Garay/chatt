import { useState } from 'react';
import './App.css';
import Button from './components/Button';
import { Channel } from './components/Channel';

// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);

  // const signInWithGoogle = async () => {
  //   // Retrieve Google provider object
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   // Set language to the default browser preference
  //   firebase.auth().useDeviceLanguage();
  //   // Start sign in process
  //   try {
  //     const res = await firebase.auth().signInWithPopup(provider);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <div className="App h-screen">
      <nav>
        <ul className="bg-yellow-500 flex justify-between h-14 items-center px-2">
          <li className="font-bold" >Chatt</li>
          <li>
            <button
              className="font-bold"
              onClick={signInWithGoogle}
            >
              Sign in
            </button>

          </li>
        </ul>
      </nav>
      <div className="h-5/6 w-full">
        <Channel />
      </div>
    </div>
  );
}

export default App;
