import React, { useState, useContext } from "react";
import SentimentChart from "./SentimentChart";
import { TailSpin } from "react-loader-spinner";

import Lottie from "lottie-react";
import Animation from "../assets/68889.json"; // Lottie JSON file
import { UserContext } from "../context/UserContext"; // Assuming UserContext is set up
import axios from "axios";

const ReviewsDashboard = () => {
  const { userInfo } = useContext(UserContext);
  const [appName, setAppName] = useState("");
  const [sentimentData, setSentimentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setAppName(e.target.value);

  const isLoggedIn = userInfo?.data?.username;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let response;
      if (isLoggedIn) {
        // If logged in, proceed with the fetch call to the backend
        response = await fetch(
          `${import.meta.env.VITE_URL}/api/v1/review/get-reviews`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ appName }),
          }
        );
      } else {
        // If not logged in, you can either return a mock response or show an error
        response = {
          ok: true,
          json: async () => ({
            data: { positiveReviews: [], negativeReviews: [] },
          }), // Mock response
        };
        setError("You must be logged in to analyze reviews.");
      }

      if (!response.ok) throw new Error("Failed to fetch reviews");

      const data = await response.json();

      // Calculate the sentiment percentages
      const positiveCount = data.data.positiveReviews.length;
      const negativeCount = data.data.negativeReviews.length;
      const totalReviews = positiveCount + negativeCount;

      const positivePercentage = totalReviews
        ? ((positiveCount / totalReviews) * 100).toFixed(2)
        : 0;
      const negativePercentage = totalReviews
        ? ((negativeCount / totalReviews) * 100).toFixed(2)
        : 0;

      setSentimentData({
        positiveCount,
        negativeCount,
        positivePercentage,
        negativePercentage,
      });
    } catch (err) {
      setError("Failed to load sentiment data.");
      console.error(err);
    } finally {
      setLoading(false);
      setAppName("");
    }
  };

  return (
    <>
      <div className="reviews-dashboard">
        <h1 className="dashboard-header">Reviews Dashboard</h1>
        <form className="app-id-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="appName"
            placeholder="Enter App Name"
            value={appName}
            onChange={handleChange}
            className="app-id-input"
          />
          <button type="submit" className="submit-btn">
            {loading ? (
              <TailSpin color="#fff" height={25} width={25} />
            ) : (
              "Analyse Reviews"
            )}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {sentimentData && !loading && (
          <div className="sentiment-data">
            <SentimentChart
              positiveCount={sentimentData.positiveCount}
              negativeCount={sentimentData.negativeCount}
            />
            <div className="sentiment-percentages">
              <p>Positive Reviews: {sentimentData.positivePercentage}%</p>
              <p>Negative Reviews: {sentimentData.negativePercentage}%</p>
            </div>
          </div>
        )}
      </div>
      <div className="anime">
        <Lottie animationData={Animation} loop={true} autoplay={true} />
      </div>
    </>
  );
};

export default ReviewsDashboard;
