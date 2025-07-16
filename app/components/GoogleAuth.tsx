import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth';
import { setPersistence, browserLocalPersistence } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

function AuthStatus() {
  const { currentUser } = useAuth();
  const [signInWithGoogle, , loadingSignIn, errorSignIn] = useSignInWithGoogle(auth);
  const [signOut, loadingSignOut, errorSignOut] = useSignOut(auth);

  const handleSignIn = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  if (currentUser) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Hi, {currentUser.displayName || currentUser.email}</span>
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => signOut()}
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