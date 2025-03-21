import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  email: string;
  password: string;
  goals: number;
  trash: number;
};

const mockUsers: User[] = [
  {
    email: "sa@example.com",
    password: "123456",
    goals: 1,
    trash: 1,
  },
  {
    email: "jane@example.com",
    password: "password",
    goals: 1,
    trash: 1,
  },
];

// ✅ AuthContextType includes updaters
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateGoals: (newGoal: number) => void;
  updateTrash: (newTrash: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    let found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      found = {
        email,
        password,
        goals: 0,
        trash: 0,
      };
      mockUsers.push(found);
    }

    setUser(found);
    return true;
  };

  const logout = () => setUser(null);


  const updateGoals = (newGoal: number) => {
    if (user) {
      const updatedUser = { ...user, goals: newGoal };
      setUser(updatedUser);
    }
  };

  const updateTrash = (newTrash: number) => {
    if (user) {
      const updatedUser = { ...user, trash: newTrash };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateGoals, updateTrash }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
