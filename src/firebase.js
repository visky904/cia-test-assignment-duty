import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqBgKeEBaF9OMkArGNWN2A_J5v95vG-rA",
  authDomain: "cia-automation-5af84.firebaseapp.com",
  projectId: "cia-automation-5af84",
  storageBucket: "cia-automation-5af84.firebasestorage.app",
  messagingSenderId: "271395918058",
  appId: "1:271395918058:web:dfde0f0a4f8f64d21cc793",
  measurementId: "G-2C5Q7B7SKS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;