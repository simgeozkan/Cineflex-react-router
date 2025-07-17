import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

type AuthProps = {
  onAuthSuccess?: (user: any) => void;
};

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        if (onAuthSuccess) onAuthSuccess(userCredential.user);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        if (onAuthSuccess) onAuthSuccess(userCredential.user);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
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
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <button onClick={handleGoogleSignIn} style={{ width: "100%", padding: 10, background: "#4285F4", color: "white", border: "none", borderRadius: 4, marginBottom: 8 }}>
          Sign in with Google
        </button>
        <br />
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer" }}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Auth; 