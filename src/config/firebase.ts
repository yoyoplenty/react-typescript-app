// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSK85Px9g6o8HcWREf-mNGRaBt0YkZy-0",
  authDomain: "react-test-app-fff6d.firebaseapp.com",
  databaseURL: "https://react-test-app-fff6d-default-rtdb.firebaseio.com",
  projectId: "react-test-app-fff6d",
  storageBucket: "react-test-app-fff6d.appspot.com",
  messagingSenderId: "293118269542",
  appId: "1:293118269542:web:9a612014e57a4e2f23b5a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
