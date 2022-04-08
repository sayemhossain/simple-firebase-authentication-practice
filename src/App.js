import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // this is for google signup
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => console.log(error));
  };
  // this  is  signout
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => setUser({}));
  };

  // this is for github signup
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // this is for email password auth
  // this is for email
  const handleEmailChange = (e) => {
    console.log(e.target.value);
  };

  // this is for password
  const handlePasswordChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="App">
      {user.uid ? (
        <button onClick={handleLogOut}>Logout</button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>Google signIn</button>
          <button onClick={handleGithubSignIn}>Github signIn</button>
        </>
      )}
      <h3>Name: {user.displayName}</h3>
      <p>Gmail: {user.email}</p>
      <img src={user.photoURL} alt="" />

      <div>
        <form>
          <input onChange={handleEmailChange} type="email" name="email" id="" />
          <input
            onChange={handlePasswordChange}
            type="password"
            name="password"
            id=""
          />
        </form>
      </div>
    </div>
  );
}

export default App;
