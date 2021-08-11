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

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
)
export default  AppWrapper
function App() {
  const [user, setUser] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const auth = getAuth();

  const signInWithGoogle = () => {

    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage();

    signInWithPopup(auth, provider)
      .then(res => {
        const data = res.user;
        setUser(data);
      })
      .then()
      .catch(console.log)
  }

  const signOut = () => {
    console.log("clicked");
    const res = signOut(auth)
                  .then(res => {
                    if (res === undefined) {
                      setUser(null);
                      history.push("/");
                    }
                  })
  }

  return (
    <div>
      <nav className="flex justify-between p-2 border">
        <h1 className=" text-green-400 font-bold text-3xl">
          Chatt
        </h1>

        { user
          ? <Button handleClick={signOut} children="Sign Out" />
          : <Button handleClick={signInWithGoogle} children="Sign in via Google" />
        }
      </nav>
      <Switch>

        <Route exact path="/">
          { user 
          ? (<Redirect to="/chat" />)
          : null
          }
        </Route>
        
        <Route to="/chat">
          <Chat />
        </Route>
      </Switch>
    </div>
  );
}