import "./App.css";
import HomePage from "./components/auths/home-page/homePage";
import Register from "./components/auths/register-user/register-user";
import Login from "./components/auths/login/login";
import EmailVerification from "./components/auths/email-verification/emailVerification";
import NavbarComponent from "./components/commons/navabar/navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="body">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify/:userId" element={<EmailVerification />} />
      </Routes>
    </div>
  );
}

export default App;
