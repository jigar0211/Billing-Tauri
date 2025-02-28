import { useEffect, useState } from "react";
import { invoke } from '@tauri-apps/api/core';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./App/Home/Home";
import ConfG from "./App/ConfG/ConfG";
import "./App.css";

function App() {
  const invoke = window.__TAURI__.core.invoke;
  const [message, setMessage] = useState("Checking subscription status...");
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const response = await invoke("check_database");
      setMessage(response);
      setTimeout(() => setRedirectToDashboard(true), 2000);
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
