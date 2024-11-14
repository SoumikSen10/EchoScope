import React, { useState, useContext } from "react";
import "../App.css";
import LoginVector from "../assets/LoginVector.png";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dotenv from "dotenv";
import Lottie from "lottie-react";
import Animation from "../assets/Animation - 1731596184696.json"; // Lottie JSON file

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }

    // Email format validation including the presence of "@"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/api/v1/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include", // Sends cookies if needed (e.g., for sessions)
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          // Unauthorized error
          toast.error("Email or password does not match");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return;
      }

      const userInfo = await response.json();
      setUserInfo(userInfo);
      console.log("User Info:", userInfo); // Debugging step

      toast.success("Login successful! Redirecting to homepage...");

      // Delay navigation to show the toast for a few seconds
      setTimeout(() => {
        console.log("Redirecting to homepage..."); // Debugging step
        navigate("/");
      }, 3000); // 3 seconds delay
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="login-page">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="login-container">
        <div className="login-form-container">
          <h2 className="login-title">Log In</h2>
          <form className="login-form" onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <div className="login-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
        <div className="login-image">
          <Lottie animationData={Animation} loop={true} autoplay={true} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
