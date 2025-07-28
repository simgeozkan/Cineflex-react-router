import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Kullanıcı tipi örnek (gerekirse özelleştir)
export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authKey = 'authUser2';

export const AuthProvider = ({ children }: { children: ReactNode }) => {


  
  const [user, setUser] = useState<User | null>(null);

  // Mount olduğunda localStorage'dan kullanıcıyı oku
  useEffect(() => {
    const storedUser = localStorage.getItem(authKey);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem(authKey, JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(authKey);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 