import { API_BASE } from "../api";

export default function Login() {
  const handleGoogleLogin = () => {
   
    window.location.href = `${API_BASE}/auth/google`;
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h2>Login</h2>
      <p>Sign in to Budget Buddy with your Google account.</p>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
}
