import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        paddingBottom: "1rem",
        marginBottom: "1.5rem",
        borderBottom: "1px solid #e5e7eb"
      }}
    >
      <Link to="/" style={{ fontWeight: 600 }}>
        Dashboard
      </Link>

      <Link to="/transactions" style={{ fontWeight: 600 }}>
        Transactions
      </Link>

      <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem", alignItems: "center" }}>
        {user ? (
          <>
            <span
              style={{
                fontSize: "14px",
                color: "#374151",
                fontWeight: 500
              }}
            >
              {user.email}
            </span>

            <button
              onClick={async () => {
                await logout();
                nav("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
