import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import Lottie from "lottie-react";
import Animation from "../assets/Animation - 1731595615970.json"; // Lottie JSON file

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>App Review Analyzer</h1>
        <p>Helps you to perform sentiment analysis on customer reviews.</p>
        <Link to="/review" style={{ textDecoration: "none" }}>
          <div className="pos">
            <button className="btn btn-primary">Review Now</button>
          </div>
        </Link>
      </div>
      <div className="hero-image">
        <Lottie animationData={Animation} loop={true} autoplay={true} />
      </div>
    </section>
  );
}

export default Hero;
