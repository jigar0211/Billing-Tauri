import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/core';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./App/Home/Home";
import ConfG from "./App/ConfG/ConfG";
import Billing from "./App/Billing/Billing";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Checking subscription status...");
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      // For development, comment the next line to bypass the API check
      // const response = await invoke("check_subscription_status");

      // If the API check is bypassed, directly set the response to "active"
      const response = "active"; // Uncomment this line for development

      if (response === "active") {
        setMessage("Subscription is active. Redirecting to dashboard...");
        setTimeout(() => setRedirectToDashboard(true), 2000);
      } else {
        setMessage("Subscription has expired. Please renew your subscription.");
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
      setTimeout(() => setRedirectToDashboard(true), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (redirectToDashboard) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conf" element={<ConfG />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </Router>
    );
  }

  return (
    <div className="app-container">
      {isLoading ? <h1>Loading...</h1> : <div className="alert">{message}</div>}
    </div>
  );
}

export default App;