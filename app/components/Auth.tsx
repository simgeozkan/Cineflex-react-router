import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "./AuthContext";

const Auth: React.FC = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const { user, login, logout } = useAuth();
  const handleGoogleSignIn = async () => {

    setError("");

    await setPersistence(auth, browserLocalPersistence); //Oturumun localStorage'da saklanacağı anlamına gelir. Böylece kullanıcı sayfayı yenilese bile, oturum bilgileri kalır, kullanıcı tekrar giriş yapmak zorunda kalmaz.

    const provider = new GoogleAuthProvider(); //Firebase Authentication için Google ile oturum açma sağlayıcısını (Google Auth Provider) oluşturur.GoogleAuthProvider ile Google OAuth işlemi başlatılır.

    //Firebase, bu provider ile Google’ın kimlik doğrulama servislerine bağlanır.
    
    //Kullanıcı Google hesabıyla giriş yapabilir.

    try {
      const result = await signInWithPopup(auth, provider); //kullanici buradan aliniyor 

      // Context'e kullanıcıyı kaydet

      const user=result.user;

      if (user.email) {
        localStorage.setItem("userEmail", user.email);  // localstorage a e mail kaydettik
      }

      //console.log(result);  burda usercredential bilgilerini alt basliklar ile gorebilriyoruz.

      login({ // login objesi kullaniciya ait bilgileri tutuyor
        uid: result.user.uid, // result ile beraber kullaniciya ait bilgiler aliniyor.
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });
    } 
    
    catch (err: any) {
      setError(err.message);
    }

  };

  return (

    // tasarim kismi burada.google ile giris yapmnasini istiyoruz authentication islemini google yapacak.giris yap dediginde handlegooglesignin fonksiyonu teteiklenecek.

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