import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQBU6I9CY37D2_kXRpftxhsgD7SsVYg30",
  authDomain: "expense-tracker-vault.firebaseapp.com",
  projectId: "expense-tracker-vault",
  storageBucket: "expense-tracker-vault.appspot.com",
  messagingSenderId: "993658819743",
  appId: "1:993658819743:web:5e59da4de5656448ddfeaa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
export const storage = getStorage(app);

