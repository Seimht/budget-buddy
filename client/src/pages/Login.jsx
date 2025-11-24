const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";

export default function Login() {
  function handleLogin() {
    window.location.href = `${API_BASE}/auth/google`;
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <h2>Login</h2>
      <p>Click below to sign in with your Google account.</p>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}
