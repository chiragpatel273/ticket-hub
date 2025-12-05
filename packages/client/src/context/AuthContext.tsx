import { createContext, useEffect, useState } from "react";
import authApi from "../api/authApi";

interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      authApi
        .getCurrentUser()
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);

    // Immediately fetch user details
    authApi.getCurrentUser().then((res) => {
      setUser(res.data.user);
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
