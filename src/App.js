import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Button, Form } from "react-bootstrap";

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
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
  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  };

  // this is for password
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  };

  // this is for form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="text-center mt-3">
        <h3>Name: {user.displayName}</h3>
        <p>Gmail: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>

      <div className="mx-auto bg-info w-50">
        <h2 className="text-center pt-3">Registration Form</h2>
        <Form onSubmit={handleFormSubmit} className=" mx-auto  p-5">
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className=" text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordBlur}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="text-center p-3">
          {user.uid ? (
            <button onClick={handleLogOut}>Logout</button>
          ) : (
            <>
              <button
                className="me-4 btn btn-danger"
                onClick={handleGoogleSignIn}
              >
                Google signIn
              </button>
              <button className="btn btn-warning" onClick={handleGithubSignIn}>
                Github signIn
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
