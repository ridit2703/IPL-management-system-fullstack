import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../auth.service";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(formData);

      // Expected backend response:
      // { success: true, data: { user, accessToken } }
      const { user, accessToken } = response.data ?? {};

      if (!user || !accessToken) {
        throw new Error("Unexpected login response from server.");
      }

      // Temporary approach until we add AuthContext.
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("accessToken", accessToken);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">
          Sign in to your IPL Management System account.
        </p>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;