// app/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBx-bolmWovKG_w6La1OwLi88CLNKpSt1s",
    authDomain: "cineflex-86530.firebaseapp.com",
    projectId: "cineflex-86530",
    storageBucket: "cineflex-86530.firebasestorage.app",
    messagingSenderId: "903982145051",
    appId: "1:903982145051:web:700cec599172f5442a62be",
    measurementId: "G-WGGWFTZ4VF"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
