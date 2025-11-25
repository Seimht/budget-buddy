
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    api("/api/auth/me")
      .then((data) => {
      
        setUser(data);
      })
      .catch((err) => {
        console.error("Auth check error:", err);
        setUser(null);
      })
      .finally(() => setChecking(false));
  }, []);

  const value = { user, setUser, checking };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
