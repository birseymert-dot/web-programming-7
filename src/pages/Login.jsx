import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { DEMO_PASSWORD, DEMO_USERNAME, login } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { dispatch } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = await login(username, password);
      dispatch({ type: "LOGGED_IN", payload: user });
      const destination = location.state?.from;
      navigate(destination ? `${destination.pathname}${destination.search || ""}` : "/", {
        replace: true,
      });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-layout">
      <div className="login-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Sign in</h1>
        <p className="muted-copy">Sign in to view your cart and manage your items.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Student email</label>
          <input
            id="username"
            type="email"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button full-width" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="demo-credentials">
          <strong>Demo account</strong>
          <span>{DEMO_USERNAME}</span>
          <span>Password: {DEMO_PASSWORD}</span>
          <small>Replace the demo username with your student email before submitting.</small>
        </div>
      </div>
    </section>
  );
}
