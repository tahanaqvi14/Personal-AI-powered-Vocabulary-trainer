import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store auth info in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userType", "admin");
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsGuestLoading(true);
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userType", "guest");
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h1>Welcome Back</h1>
          <p>Sign in to continue to AI Word Trainer</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="userId">User ID</label>
            <input
              id="userId"
              type="text"
              placeholder="Enter your user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              disabled={isLoading || isGuestLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading || isGuestLoading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading || isGuestLoading}>
            {isLoading ? (
              <>
                <span className="loader"></span>
                <span>Signing in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="guest-notice">
          <div className="notice-icon">ℹ️</div>
          <div className="notice-text">
            <strong>Guest Login Notice:</strong>
            <p>As a guest, you <strong>cannot add words</strong> to the vocabulary. To add words, please login with your User ID and Password.</p>
          </div>
        </div>

        <button
          onClick={handleGuestLogin}
          className="guest-btn"
          disabled={isLoading || isGuestLoading}
        >
          {isGuestLoading ? (
            <>
              <span className="loader"></span>
              <span>Loading...</span>
            </>
          ) : (
            "Continue as Guest"
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;

