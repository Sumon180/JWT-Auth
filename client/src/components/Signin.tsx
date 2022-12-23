import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCustomToken,
} from "firebase/auth";
import { useLocalStorage } from "../useLocalStorage";
// import token from "../token/Token";

const Singin = () => {
  let [email, setEmail] = useLocalStorage("email", "");
  let [password, setPassword] = useLocalStorage("password", "");
  const [checked, setChecked] = useLocalStorage("checked", false);

  const navigate = useNavigate();

  let handleSubmit = () => {
    if (!email && !password && !checked) {
      toast.error("Fill the all details!");
    } else if (!email) {
      toast.error("Enter your email!");
    } else if (!password) {
      toast.error("Enter your password!");
    } else if (password.length < 7) {
      toast.error("Password need minimum 8 character!");
    } else if (!checked) {
      toast.error("Are you robbot?");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          toast.success("Sign in Successfully");
          console.log(userCredential);
          setTimeout(() => navigate("/homepage"), 1000);
        })
        .catch((err) => {
          console.log(err.code, err.message);
          if (err.code == "auth/wrong-password") {
            toast.error("Wrong password!");
          } else if (err.code == "auth/user-not-found") {
            toast.error("Wrong email!");
          } else {
            toast.error("");
          }
        });
    }
  };

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
    }
  });

  useEffect(() => {
    // storing input name
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      signInWithCustomToken(auth, token)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("my-user", user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
          console.log("err-log", errorCode);
          console.log("err-log", errorMessage);
        });
    }

    // localStorage.setItem("email", JSON.stringify(email));
    // localStorage.setItem("password", JSON.stringify(password));
  }, [email, password]);

  return (
    <div id="signin">
      <div className="signin">
        <h2>Login your account!</h2>
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
        <button onClick={handleSubmit}>Sign in</button>
        <Link to="/signuppage">You have don't account? Singup</Link>
      </div>
    </div>
  );
};

export default Singin;
