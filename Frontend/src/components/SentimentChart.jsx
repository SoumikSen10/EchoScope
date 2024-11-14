import React from "react";
import { Bar } from "react-chartjs-2"; // Keep Bar chart from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement, // Keep BarElement for bar chart
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, // Keep BarElement for bar chart
  Title,
  Tooltip,
  Legend
);

const SentimentChart = ({ positiveCount, negativeCount }) => {
  // Chart.js data configuration for a bar chart
  const data = {
    labels: ["Positive", "Negative"], // Labels for x-axis
    datasets: [
      {
        label: "Sentiment Analysis",
        data: [positiveCount, negativeCount], // Data for positive and negative counts
        backgroundColor: ["#4CAF50", "#FF5733"], // Green for positive, Red for negative
        borderColor: ["#4CAF50", "#FF5733"], // Border color matching background color
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options configuration
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sentiment Analysis of Reviews", // Title of the chart
      },
      legend: {
        position: "top", // Position of the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Ensure y-axis starts from 0
      },
    },
  };

  return <Bar data={data} options={options} />; // Keep Bar chart component
};

export default SentimentChart;
