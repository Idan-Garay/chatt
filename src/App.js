import { useState } from "react";
import {auth} from "./firebase";
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

  const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    auth().useDeviceLanguage();

    auth().signInWithPopup(provider)
      .then(res => {
        const data = res.user;
        setUser(data);
      })
      .then()
      .catch(console.log)
  }

  const signOut = () => {
    console.log("clicked");
    const res = auth().signOut()
                  .then(res => {
                    if (res === undefined) {
                      setUser(null);
                      history.push("/");
                    }
                  })
  }

  return (
    <div>
      <nav className="flex justify-between">
        <h1>
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