// EmailVerification.js
import React, { useState, useEffect } from "react";
import "./emailVerification.css";
import AuthService from "../../../services/authService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [showSendButton, setShowSendButton] = useState(true);
  const [user, setUser] = useState();
  const [otp, setOtp] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getUserById(userId).then(
      (res) => {
        console.log("user =>", res.data.user.email);
        setUser(res.data.user);
      },
      (err) => {
        console.log("err =>", err);
      }
    );
  }, [userId]);

  const handleSendOtp = () => {
    // Simulate sending OTP (you can replace this with actual API call)
    // For now, let's just toggle the state to show the OTP input field
    AuthService.sendEmailOTP(user.email).then(
      (res) => {
        console.log("otp sent =>", res);
        setShowSendButton(false);
      },
      (err) => {
        alert(`Error: ${err.message}`);
      }
    );
  };

  const handleVerifyOtp = () => {
    // Implement OTP verification logic here
    console.log("Verifying OTP:", otp);
    if (!otp) return;
    AuthService.verifyEmailOTP(user.email, otp).then(
      (res) => {
        console.log("verified => ", res);
        navigate(`/`);
      },
      (err) => {
        console.log("err =>", err);
        alert(`Invalid OTP`);
      }
    );
  };

  return (
    <div className="verify-container">
      <p className="verify-heading">Email Verification</p>
      {showSendButton ? (
        <>
          <p>Hi, <b>{ user?.firstName}</b>. Welcome to the CRYPTOS.</p><p> Click on the button below to send the otp over your email address <b>{user?.email}</b>. </p>
          <button className="verify-btn" onClick={handleSendOtp}>Send OTP</button>
        </>
      ) : (
          <div>
             <p>
            An OTP has been sent to <b>{user.email}</b>. <br></br><br></br>Please check your email and enter
            the OTP to verify your email address.
          </p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="verify-btn" onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
