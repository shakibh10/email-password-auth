// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu-xe_rQFfXTsmSH18xT_HRYVIvleZS-U",
  authDomain: "email-password-auth-ccdf6.firebaseapp.com",
  projectId: "email-password-auth-ccdf6",
  storageBucket: "email-password-auth-ccdf6.appspot.com",
  messagingSenderId: "81192752396",
  appId: "1:81192752396:web:375e476b298bdd953d6529"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

