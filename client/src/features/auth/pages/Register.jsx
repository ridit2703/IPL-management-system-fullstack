import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../auth.service";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      await registerUser(formData);
      navigate("/login", {
        state: { message: "Registration successful. Please log in." },
      });
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p className="auth-subtitle">
          Join the IPL Management System.
        </p>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          minLength={2}
          maxLength={35}
          required
        />

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
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          minLength={8}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="auth-footer">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

export default Register;