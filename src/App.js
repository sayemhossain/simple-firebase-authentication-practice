import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => console.log(error));
  };
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => setUser({}));
  };
  return (
    <div className="App">
      {user.email ? (
        <button onClick={handleLogOut}>Logout</button>
      ) : (
        <button onClick={handleGoogleSignIn}>Google signIn</button>
      )}
      <h3>Name: {user.displayName}</h3>
      <p>Gmail: {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
