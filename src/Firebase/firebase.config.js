// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfwORSGwJQ5fLwXTZQdRKuseUXfISbCMM",
  authDomain: "ema-john-with-firebase-a-ebae0.firebaseapp.com",
  projectId: "ema-john-with-firebase-a-ebae0",
  storageBucket: "ema-john-with-firebase-a-ebae0.appspot.com",
  messagingSenderId: "503502740333",
  appId: "1:503502740333:web:c4821f0105562c4f745864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app