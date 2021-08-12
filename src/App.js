import { useState } from "react";
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from "firebase/auth";

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
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
export default  AppWrapper
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
        history.push("/chat");
      })
      .catch(console.log)
  }

  const signOutt = () => {
    const res = signOut(auth)
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
      <nav className="flex justify-between p-2 border">
        <h1 className=" text-green-400 font-bold text-3xl">
          <Link to="/">
            Chatt
          </Link>
        </h1>

        { user
          ? <Button handleClick={signOutt} children="Sign Out" />
          : <Button handleClick={signInWithGoogle} children="Sign in via Google" />
        }
      </nav>

        
      <Switch>

        <Route exact path="/">
          {/* { user 
          ? (<Redirect to="/chat" />)
          : null
          } */}
          <ChatUser name={name} setName={setName} />
        </Route>

        <Route path="/chat">
          <Chat name={name}/>
        </Route>

        <Route path="user">
        </Route>
      </Switch>
    </div>
  );
}