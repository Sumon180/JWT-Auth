import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import "../components/SignUpPage.css";
import { useLocalStorage } from "../useLocalStorage";

const Singup = () => {
  let [name, setName] = useLocalStorage("name", "");
  let [email, setEmail] = useLocalStorage("email", "");
  let [password, setPassword] = useLocalStorage("password", "");
  const [checked, setChecked] = useLocalStorage("checked", false);

  const navigate = useNavigate();

  let handleSubmit = () => {
    if (!name && !email && !password) {
      toast.error("Fill the all details!");
    } else if (!name) {
      toast.error("Enter your name!");
    } else if (!email) {
      toast.error("Enter your email!");
    } else if (!password) {
      toast.error("Enter your password!");
    } else if (password.length < 7) {
      toast.error("Password need minimum 8 character!");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          toast.success("Account created Successfully");
          console.log(userCredential);
          setTimeout(() => navigate("/homepage"), 1000);
        })
        .catch((err) => {
          console.log(err.code);
          if (err.code == "auth/email-already-in-use") {
            toast.error("Email already in use!");
          } else {
            toast.error("");
          }
        });
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // setTimeout(() => navigate("/homepage"), 1000);
    }
  });

  return (
    <div id="singup">
      <div className="singup">
        <h2>Create a New account!</h2>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
        />
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        I am not robbot
        <button onClick={handleSubmit}>Singup</button>
        <Link to="/">You have already account? Singin</Link>
      </div>
    </div>
  );
};

export default Singup;
