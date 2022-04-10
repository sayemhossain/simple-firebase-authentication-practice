import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Button, Form } from "react-bootstrap";

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
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
        setError(error);
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

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (!/(?=.*\d)/.test(password)) {
      setError("Please use at least one digit.");
      return;
    }
    setValidated(true);
    setError("");

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => console.log(result))
        .then((error) => setError(error));
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          setUser(user);
          setEmail("");
          setPassword("");
          console.log(user);
          handleEmailVerify();
        })
        .catch((error) => {
          setError(error);
          console.error(error);
        });
    }
  };
  //  this is for register checkbox
  const handleRegChange = (e) => {
    setRegistered(e.target.checked);
  };

  // this is for email verification
  const handleEmailVerify = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification send.");
    });
  };
  return (
    <div>
      <div className="text-center mt-3">
        <h3>Name: {user.displayName}</h3>
        <p>Gmail: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>

      <div className="mx-auto bg-info w-50">
        <h2 className="text-center pt-3">
          {registered ? "Login" : "Registration"} Form
        </h2>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleFormSubmit}
          className=" mx-auto  p-5"
        >
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
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
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handleRegChange}
              className="text-black"
              type="checkbox"
              label="Already Registered ?"
            />
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Button variant="primary" className="btn btn-success" type="submit">
            {registered ? "Login" : "Register"}
          </Button>
        </Form>
        <div className="text-center p-3">
          {user.uid ? (
            <button className="btn btn-danger" onClick={handleLogOut}>
              Logout
            </button>
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
