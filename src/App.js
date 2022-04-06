import "./App.css";
import app from "./firebase.init";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);
function App() {
  const handleGoogleSignIn = () => {
    console.log("working");
  };
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>google signIn</button>
    </div>
  );
}

export default App;
