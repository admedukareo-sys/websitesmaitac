import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, getCurrentUser, setCurrentUser, getUsers, saveUsers, updateRegistration, Registration } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<User>;
  register: (name: string, email: string, pass: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getCurrentUser();
    setUserState(savedUser);
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<User> => {
    const users = getUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!found) {
      throw new Error('Email tidak terdaftar');
    }
    if (found.password && found.password !== pass) {
      throw new Error('Password salah');
    }

    const sessionUser: User = { id: found.id, name: found.name, email: found.email, role: found.role };
    setUserState(sessionUser);
    setCurrentUser(sessionUser);
    return sessionUser;
  };

  const register = async (name: string, email: string, pass: string): Promise<User> => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email sudah terdaftar');
    }

    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password: pass,
      role: 'STUDENT',
    };

    users.push(newUser);
    saveUsers(users);

    // Initial registration draft
    updateRegistration(newUser.id, { status: 'DRAFT', paymentStatus: 'UNPAID' });

    const sessionUser: User = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    setUserState(sessionUser);
    setCurrentUser(sessionUser);
    return sessionUser;
  };

  const logout = () => {
    setUserState(null);
    setCurrentUser(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
