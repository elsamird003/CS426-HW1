import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  email: string;
  name: string;
  password: string;
  goals: number;
  trash: number;
};

const mockUsers: User[] = [
  {
    email: "sam@example.com",
    name: "Samuel",
    password: "123456",
    goals: 10,
    trash: 5,
  },
  {
    email: "jane@example.com",
    name: "Jane",
    password: "password",
    goals: 15,
    trash: 12,
  },
];

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (email: string, password: string) => {
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };
  
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
