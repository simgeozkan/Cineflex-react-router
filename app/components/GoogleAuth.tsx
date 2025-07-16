import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

function AuthStatus() {
  const { currentUser } = useAuth();
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingSignOut, setLoadingSignOut] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState<Error | null>(null);
  const [errorSignOut, setErrorSignOut] = useState<Error | null>(null);

  const handleSignIn = async () => {
    try {
      setLoadingSignIn(true);
      setErrorSignIn(null);
      
      await setPersistence(auth, browserLocalPersistence);
      
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
      setErrorSignIn(err as Error);
    } finally {
      setLoadingSignIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoadingSignOut(true);
      setErrorSignOut(null);
      
      await signOut(auth);
    } catch (err) {
      console.error(err);
      setErrorSignOut(err as Error);
    } finally {
      setLoadingSignOut(false);
    }
  };

  if (currentUser) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Hi, {currentUser.displayName || currentUser.email}</span>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignOut}
          disabled={loadingSignOut}
        >
          {loadingSignOut ? '...' : 'Sign Out'}
        </button>
        {errorSignOut && <div className="text-red-500 text-sm">Error: {errorSignOut.message}</div>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleSignIn}
        disabled={loadingSignIn}
      >
        {loadingSignIn ? 'Signing In...' : 'Sign in with Google'}
      </button>
      {errorSignIn && <div className="text-red-500 mt-2 text-sm">Error: {errorSignIn.message}</div>}
    </div>
  );
}

export function GoogleAuth() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder on the server to prevent layout shift
    return <div className="w-48 h-10" />;
  }

  return <AuthStatus />;
}