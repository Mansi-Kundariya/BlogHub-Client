import { createContext, useState } from "react";
import { User } from "../types/user";

export const AuthContext = createContext({
  user: null as User | null,
  login: (data: any) => {},
  logout: () => {},
});

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  const login = (data: User) => setUser(data);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
