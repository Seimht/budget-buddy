
import { API_BASE } from "../api";

export default function Login() {
  const handleGoogleLogin = () => {
   
    const base = API_BASE.replace(/\/+$/, "");
    
    window.location.href = `${base}/auth/google`;
  };

  return (
    <div className="login-page">
      <h2>Sign in to Budget Buddy</h2>
      <p>Login with Google to view and manage your Budget Buddy dashboard.</p>
      <button className="login-button" onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
}
