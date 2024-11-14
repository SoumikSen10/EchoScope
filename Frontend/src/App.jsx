// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; // Assuming you're styling globally
import ReviewPage from "./pages/ReviewPage"; // Import your ReviewPage component
import LoginPage from "./pages/LoginPage"; // Import your LoginPage component
import SignupPage from "./pages/SignUpPage"; // Import your SignupPage component
import HomePage from "./pages/HomePage";
import { UserContextProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Routes without Navbar (Login and Signup) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Routes with Navbar */}
            <Route
              path="/"
              element={
                <div>
                  <Navbar />
                  <HomePage />
                </div>
              }
            />
            <Route
              path="/review"
              element={
                <div>
                  <Navbar />
                  <ReviewPage />
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
