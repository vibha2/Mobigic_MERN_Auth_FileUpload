import React, { useState } from "react";
import "./login.css";
import AuthService from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import toastService from "../../../services/toastersService";
import { MutatingDots } from "react-loader-spinner";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    AuthService.login(formData.email, formData.password).then(
      (res) => {
        console.log("login res =>", res);
        toastService.success("Operation successful!");
        localStorage.setItem("logged-in-user", res.data.user._id);
        setLoading(false);
        navigate(`/home/${res.data.user._id}`);
      },
      (err) => {
        console.log("err =>", err);
        setError(true);
        setLoading(false);
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
        <div className="login-btn-container">
          {isLoading ? (
            <>
              <button className="login-btn">
                Logging in...
              </button>
              <div className="loader">
                <MutatingDots
                  visible={true}
                  height="100"
                  width="100"
                  color="#4fa94d"
                  secondaryColor="#4fa94d"
                  radius="12.5"
                  ariaLabel="mutating-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            </>
          ) : (
            <>
              <button className="login-btn" type="submit">
                Login
              </button>
            </>
          )}
        </div>

        <hr />
        <div>
          Not a member?
          <p
            className="sign-up-cta"
            onClick={() => {
              navigate(`/sign-up`);
            }}
          >
            Create a new account
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
