// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgW5J-J4lBIht_IJAVMWZfKA5Y5qLF8qU", 
  authDomain: "liars-game-901bc.firebaseapp.com",
  projectId: "liars-game-901bc",
  storageBucket: "liars-game-901bc.appspot.com",
  messagingSenderId: "171918186219",
  appId: "1:171918186219:web:28cc3370dabe41c018d0ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;