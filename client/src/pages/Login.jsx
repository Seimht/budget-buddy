// client/src/pages/Login.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { API_BASE } from "../api";

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, don't stay on login page
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  function handleLogin() {
    window.location.href = `${API_BASE}/auth/google`;
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h2>Login</h2>
      <p>Sign in with your Google account to access Budget Buddy.</p>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}
