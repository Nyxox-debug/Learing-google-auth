import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState("");
  const value: AuthContextType = {
    user,
    setUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used withing an AuthContextProvider");
  }
  return authContext;
};
