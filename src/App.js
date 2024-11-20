import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import { useState } from "react";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // @ts-ignore
      setUser(user);
    });
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
