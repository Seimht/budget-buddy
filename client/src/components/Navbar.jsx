import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
      <Link to="/">Dashboard</Link>
      <Link to="/transactions">Transactions</Link>
      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <>
            <span style={{ marginRight: 8 }}>{user.email}</span>
            <button
              onClick={async () => {
                await logout();
                nav('/login');
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
