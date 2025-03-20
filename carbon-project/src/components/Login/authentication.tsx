import { createContext, useContext, useState } from "react";

type AuthContextType = {
  user: string | null;
  register: (email: string, password: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<{ email: string; password: string }[]>([]); // ✅ Store registered users
  const [user, setUser] = useState<string | null>(null);

  const register = (email: string, password: string) => {
    // Check if email is already registered
    if (users.some((u) => u.email === email.trim().toLowerCase())) {
      console.log("User already exists");
      return false;
    }

    // Register new user
    setUsers([...users, { email: email.trim().toLowerCase(), password }]);
    console.log("User registered:", email);
    return true;
  };

  const login = (email: string, password: string) => {
    const existingUser = users.find((u) => u.email === email.trim().toLowerCase() && u.password === password);

    if (existingUser) {
      setUser(email);
      return true;
    }

    console.log("Invalid credentials");
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use authentication
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
