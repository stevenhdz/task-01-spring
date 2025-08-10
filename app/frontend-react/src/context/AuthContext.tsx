"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';


export interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (data: { user: string; token: string }) => void;
  logout: () => void;
}

// Exporta el contexto para poder usarlo en useAuth
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const login = (data: { user: string; token: string }) => {
    console.log(data)
    setUser(data.user);
    setToken(data.token);

    localStorage.setItem('user', data.user);
    localStorage.setItem('token', data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
