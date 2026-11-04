import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import { logoutUser } from "../../auth/auth.service";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");

    try {
      await logoutUser();
      logout();
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "Logout failed. Please try again.");
    }
  }

  return (
    <main style={{ padding: "24px" }}>
      <h1>IPL Management System</h1>

      <p>Welcome, {user?.name || "User"}!</p>
      <p>Your role: {user?.role || "Unknown"}</p>

      {error && <p role="alert">{error}</p>}

      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}

export default Dashboard;