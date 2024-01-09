import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthService from "../../../services/authService";
import './homePage.css';
import bullImg from  './bull.jpg'
const HomePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();
  
   useEffect(() => {
    AuthService.getUserById(userId).then(
      (res) => {
        console.log("user =>", res.data.user);
        setUser(res.data.user);
      },
      (err) => {
        console.log("err =>", err);
      }
    );
  }, [userId]);
  
  return (
    <div className="homepage-container">
      <div class="image-container fade-image">
        <p className="greet-text">
          <span className="greet-welcome">Hey</span> {user?.firstName},<span className="greet-welcome">{"    "}welcome to CRYPTOS</span> 
        </p>
         <img className="bull-img" width={1200} src={bullImg} alt="bull img"/>
      </div>
       
      
    </div>
  )
}

export default HomePage