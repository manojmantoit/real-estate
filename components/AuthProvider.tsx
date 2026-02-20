"use client";
import { createContext, useContext, useEffect, useState } from "react";

type User = { username: string; role: string } | null;
const AuthContext = createContext<User>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
