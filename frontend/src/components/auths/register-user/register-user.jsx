// components/Register.js
import React, { useState } from 'react';
import './register-user.css'; // Import your custom stylesheet
import  AuthService  from '../../../services/authService';
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("User =>", formData);
    AuthService.signUp(formData).then((res) => {
      console.log("user created =>", res);
      setLoading(false);
      navigate(`/email-verify/${res.data.user._id}`);
    },(err) =>{
      console.log("Err =>", err);
      setError(err.response.data.message);
      setLoading(false);
    })
    // Add your registration logic here
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error ? (
          <div className="error-container">{error}</div>
        ) : (
          <></>
        )}
        <div className="login-btn-container">
          {isLoading ? (
            <>
              <button className="register-btn">
                Signing up...
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
              <button className='register-btn' type="submit">Register</button>
            </>
          )}
        </div>
        
          <hr />
        <div>
          Already an existing member?<p className="sign-up-cta" onClick={() => { navigate(`/login`) }}>Login</p>
        </div>
      </form>
    </div>
  );
};

export default Register;
