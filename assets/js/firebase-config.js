import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

export const firebaseConfig = {
  apiKey: "AIzaSyC7rVo_eFPo_176hPdaOg7clKcm75_sjUI",
  authDomain: "similock-enterprise-seo.firebaseapp.com",
  projectId: "similock-enterprise-seo",
  storageBucket: "similock-enterprise-seo.firebasestorage.app",
  messagingSenderId: "420615750495",
  appId: "1:420615750495:web:0116b1c1af5c3dd017acea"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const demoMode = false;
