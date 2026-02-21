"use client";
import { createContext, useContext, useEffect, useState } from "react";

type User = { username: string; role: string } | null;

// undefined = still loading, null = not authenticated, User = authenticated
const AuthContext = createContext<User | undefined>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
