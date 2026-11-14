'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { store } from '@/lib/db/store';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  loginAs: (role: UserRole, userEmail?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Default to Super Admin for quick preview or restore from sessionStorage
    const savedRole = (sessionStorage.getItem('up_web_tech_role') as UserRole) || 'SUPER_ADMIN';
    const targetUser = store.users.find((u) => u.role === savedRole) || store.users[0];
    setUser(targetUser);
  }, []);

  const loginAs = (targetRole: UserRole, userEmail?: string) => {
    let matchedUser = userEmail
      ? store.users.find((u) => u.email === userEmail)
      : store.users.find((u) => u.role === targetRole);

    if (!matchedUser) {
      matchedUser = {
        id: `u-${Date.now()}`,
        email: `${targetRole.toLowerCase()}@upwebtech.com`,
        fullName: targetRole === 'CLIENT' ? 'Client User' : targetRole === 'WORKER' ? 'Developer' : 'Admin User',
        role: targetRole,
        status: 'ACTIVE',
        createdAt: '2026-01-01',
        updatedAt: '2026-01-01',
      };
    }

    sessionStorage.setItem('up_web_tech_role', targetRole);
    setUser(matchedUser);
  };

  const logout = () => {
    sessionStorage.removeItem('up_web_tech_role');
    loginAs('SUPER_ADMIN');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'SUPER_ADMIN',
        isAuthenticated: !!user,
        loginAs,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
