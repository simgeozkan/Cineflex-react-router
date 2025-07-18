import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../firebase";

type AuthProps = {
  onAuthSuccess?: (user: any) => void;
};

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);


  const handleGoogleSignIn = async () => {
    setError("");
    await setPersistence(auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      if (onAuthSuccess) onAuthSuccess(result.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  if (user) {
    return (
      <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
        <h2>Welcome, {user.email}!</h2>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <button onClick={handleGoogleSignIn} style={{ width: "100%", padding: 10, background: "#4285F4", color: "white", border: "none", borderRadius: 4, marginBottom: 8 }}>
          Sign in with Google
        </button>
        <br />
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer" }}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Auth; 