import { createContext, useContext, useState } from 'react';
import type { User } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: any | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<any | null>>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true, // Start in a loading state
  error: null,
  setCurrentUser: () => {},
  setLoading: () => {},
  setError: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  return (
    <AuthContext.Provider value={{ currentUser, loading, error, setCurrentUser, setLoading, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);