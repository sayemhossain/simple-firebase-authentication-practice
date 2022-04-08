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
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Button, Form } from "react-bootstrap";

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
  const handleEmailBlur = (e) => {
    console.log(e.target.value);
  };

  // this is for password
  const handlePasswordBlur = (e) => {
    console.log(e.target.value);
  };

  // this is for form submit
  const handleFormSubmit = (e) => {
    console.log("Form submited");
    e.preventDefault();
  };
  return (
    <div>
      <div className="text-center my-5">
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
      </div>

      <div className="mx-auto bg-success w-50">
        <h2 className="text-center pt-3">Registration Form</h2>
        <Form onSubmit={handleFormSubmit} className=" mx-auto  p-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
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
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
