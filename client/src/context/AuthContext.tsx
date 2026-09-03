import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { getAuthToken, setAuthToken } from '../lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    try {
      return getAuthToken();
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (!savedUser || savedUser === 'undefined') return null;
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (token) {
        setAuthToken(token);
      } else {
        setAuthToken(null);
        localStorage.removeItem('user');
      }
    } catch {
      // localStorage error protection
    }
  }, [token]);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    setAuthToken(newToken);
    try {
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch {}
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    try {
      localStorage.removeItem('user');
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
