import { createContext, useContext, useState, ReactNode,useEffect } from "react";

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

  // 🔁 Restore user from localStorage on load
  useEffect(() => {
    const storedUser = localStorage.getItem("carbonUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

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

    const userToSave = { ...found };
    setUser(userToSave);
    localStorage.setItem("carbonUser", JSON.stringify(userToSave));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("carbonUser");
  };

  const updateGoals = (newGoal: number) => {
    if (user) {
      const updatedUser = { ...user, goals: newGoal };
      setUser(updatedUser);
      localStorage.setItem("carbonUser", JSON.stringify(updatedUser));

      const index = mockUsers.findIndex((u) => u.email === user.email);
      if (index !== -1) {
        mockUsers[index] = updatedUser;
      }
    }
  };

  const updateTrash = (newTrash: number) => {
    if (user) {
      const updatedUser = { ...user, trash: newTrash };
      setUser(updatedUser);
      localStorage.setItem("carbonUser", JSON.stringify(updatedUser));

      const index = mockUsers.findIndex((u) => u.email === user.email);
      if (index !== -1) {
        mockUsers[index] = updatedUser;
      }
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
