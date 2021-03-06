import { useState } from "react";
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from "firebase/auth";

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  useHistory
} from "react-router-dom";

import Button from "./Button";
//pages
import Chat from "./Chat";
import ChatUser from "./ChatUser";

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
)

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const history = useHistory();
  const auth = getAuth();
  
  if (!auth.currentUser) {
    history.push("/");
  }
  
  const signInWithGoogle = () => {
    
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();
    
    signInWithPopup(auth, provider)
    .then(res => {
      const data = res.user;
      setUser(data);
      history.push("/");
    })
    .catch(console.log)
  }
  
  const signOutt = () => {
    signOut(auth)
    .then(res => {
      if (res === undefined) {
        setUser(null);
        history.push("/");
      }
    })
    .catch(console.log);
  }
  
  return (
    <div className="h-screen bg-green-200">
      <nav className="flex justify-between p-2 bg-green-500">
        <h1 className=" text-white font-bold text-3xl">
          <Link to="/">
            Chatt
          </Link>
        </h1>

        { user
          ? <Button handleClick={signOutt} children="Sign Out" />
          : <Button handleClick={signInWithGoogle} children="Sign in via Google" />
        }
      </nav>

      {
        user?
        <Switch>
          <Route exact path="/">
            { user
              ?<ChatUser name={name} setName={setName} user={user} />
              : null
            }
          </Route>

          <Route path="/chat">
            <Chat sender={auth.currentUser.displayName} receiver={name}/>
          </Route>

        </Switch>
      : <h1 className="text-red-500 text-2xl font-bold bg-white rounded w-1/3 py-5 mx-auto text-center">
          Login First
        </h1>
    }
    </div>
  );
}

export default  AppWrapper
