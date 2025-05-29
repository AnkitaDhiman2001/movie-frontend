"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation'; 

interface User {
  email: string; 
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signin: (user: User, redirectTo?: string) => void;
  logout: (redirectTo?: string) => void;
  redirectTo: (path: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('currentUser'); 
    }
    setLoading(false);
  }, []);

  const signin = (user: User, redirectTo: string = '/') => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    router.push(redirectTo);
  };

  const logout = (redirectTo: string = '/auth/login') => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    router.push(redirectTo);
  };

  const redirectTo = (path: string) => {
    router.push(path);
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading, signin, logout, redirectTo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};