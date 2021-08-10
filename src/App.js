import { useState } from "react";
import {auth} from "./firebase";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//pages
import Chat from "./Chat";

export default function App() {
  const [user, setUser] = useState(null);

  const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    auth().useDeviceLanguage();

    auth().signInWithPopup(provider)
      .then(res => {
        const data = res.user.displayName;
        setUser(data);
      })
      .then()
      .catch(console.log)
  }

  return (
    <div>
      <Router>
        <Switch>

          <Route exact path="/">
            { user 
            ? <Redirect to="/chat" /> 
            : <button 
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </button>
            }
          </Route>
          
          <Route to="/chat">
            <Chat />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}