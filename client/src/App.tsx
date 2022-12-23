import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import HomePage from "./components/HomePage";
import Singin from "./components/Signin";
import Signup from "./components/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Singin />}></Route>
          <Route path="/homepage" element={<HomePage />}></Route>
          <Route path="/signuppage" element={<Signup />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
