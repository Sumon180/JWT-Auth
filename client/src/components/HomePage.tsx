import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const HomePage = () => {
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    localStorage.clear();
  };
  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/">
        <button onClick={handleSignOut}>Sing Out</button>
      </Link>
    </div>
  );
};

export default HomePage;
