import "./App.css";
import HomePage from "./components/auths/home-page/homePage";
import Register from "./components/auths/register-user/register-user";
import Login from "./components/auths/login/login";
import EmailVerification from "./components/auths/email-verification/emailVerification";
import NavbarComponent from "./components/commons/navabar/navbar";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const [user, setUser] = useState(localStorage.getItem("logged-in-user"));
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("logged-in-user");
      console.log("check user -> stored user =>", storedUser);
      if (storedUser !== user) {
        setUser(storedUser);
        if (storedUser === "null") {
          navigate("/login");
        }
        // Perform any additional actions if needed
      }
    };

    // Set up an interval to check localStorage periodically
    const intervalId = setInterval(checkUser, 1000); // Check every second, adjust as needed

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <div className="body">
      <NavbarComponent props={user} />
      <Routes>
        <Route path="/home/:userId" element={<HomePage />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify/:userId" element={<EmailVerification />} />
      </Routes>
    </div>
  );
}

export default App;
