/**
 * @file This component is responsible for initializing the Firebase Auth listener.
 * It is a client-side only component and should never be imported on the server.
 * It listens for authentication state changes and updates the AuthContext accordingly.
 * It renders null and has no visual output.
 */
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';

// Fail-fast assertion to prevent this from running on the server.
if (typeof window === 'undefined') {
  throw new Error('FirebaseAuthInitializer is a client-only component and should not be imported on the server.');
}

export function FirebaseAuthInitializer() {
  const { setCurrentUser, setLoading, setError } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err);
        setLoading(false);
        setCurrentUser(null);
      }
    );

    return () => unsubscribe();
  }, [setCurrentUser, setLoading, setError]);

  return null;
} 