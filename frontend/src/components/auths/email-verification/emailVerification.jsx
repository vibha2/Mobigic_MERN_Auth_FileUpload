// EmailVerification.js
import React, { useState, useEffect } from "react";
import "./emailVerification.css";
import AuthService from "../../../services/authService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";

const EmailVerification = () => {
  const [showSendButton, setShowSendButton] = useState(true);
  const [user, setUser] = useState();
  const [otp, setOtp] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

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
    setLoading(true);
    AuthService.sendEmailOTP(user.email).then(
      (res) => {
        console.log("otp sent =>", res);
        setShowSendButton(false);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        alert(`Error: ${err.message}`);
      }
    );
  };

  const handleVerifyOtp = () => {
    // Implement OTP verification logic here
    console.log("Verifying OTP:", otp);
    if (!otp) return;
    setLoading(true);
    AuthService.verifyEmailOTP(user.email, otp).then(
      (res) => {
        console.log("verified => ", res);
        localStorage.setItem("logged-in-user", userId);
        setLoading(false);
        navigate(`/home/${userId}`);
      },
      (err) => {
        console.log("err =>", err);
        setLoading(false);
        alert(`Invalid OTP`);
      }
    );
  };

  return (
    <div className="verify-container">
      <p className="verify-heading">Email Verification</p>
      {showSendButton ? (
        <>
          <p>
            Hi, <b>{user?.firstName}</b>. Welcome to the CRYPTOS.
          </p>
          <p>
            {" "}
            Click on the button below to send the otp over your email address{" "}
            <b>{user?.email}</b>.{" "}
          </p>

          <div className="send-otp-btn-container">
            {isLoading ? (
              <>
                <button className="verify-btn">Sending otp...</button>
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
                <button className="verify-btn" onClick={handleSendOtp}>
                  Send OTP
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div>
          <p>
            An OTP has been sent to <b>{user.email}</b>. <br></br>
            <br></br>Please check your email and enter the OTP to verify your
            email address.
          </p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          
            <div className="send-otp-btn-container">
            {isLoading ? (
              <>
                <button className="verify-btn">Verifying otp...</button>
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
                <button className="verify-btn" onClick={handleVerifyOtp}>
            Verify OTP
            </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
