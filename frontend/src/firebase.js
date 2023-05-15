// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:`${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain:`${process.env.REACT_APP_AUTH_DOMAIN}` ,
  projectId: "mingle-a8ff5",
  storageBucket: "mingle-a8ff5.appspot.com",
  messagingSenderId: "830241275165",
  appId: "1:830241275165:web:94e3d3ee657d993e0e75f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const provider=new GoogleAuthProvider();
export default app;