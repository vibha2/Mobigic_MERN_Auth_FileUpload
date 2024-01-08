import React, { useState } from "react";
import "./login.css";
import AuthService from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import toastService from "../../../services/toastersService";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.login(formData.email, formData.password).then(
      (res) => {
        console.log("login res =>", res);
        toastService.success("Operation successful!");
        navigate("/");
      },
      (err) => {
        console.log("err =>", err);
        setError(true);
      }
    );
    // Add your login logic here
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {isError ? (
          <div className="error-container">Invalid credentials.</div>
        ) : (
          <></>
        )}

        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
