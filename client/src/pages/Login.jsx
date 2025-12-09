export default function Login() {
    return (
      <div className="login-screen">
        <div className="login-card">
          <h2>Login</h2>
          <p>Sign in to Budget Buddy with your Google account.</p>
  
          <a href={`${import.meta.env.VITE_API_URL || "http://localhost:5050"}/auth/google`}>
            <button className="login-button">
              Login with Google
            </button>
          </a>
        </div>
      </div>
    );
  }
  