// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBBtb5L2hEbfU7fRarhJPs4liqN9Pi1qB4",
  authDomain: "sep-g4-95b78.firebaseapp.com",
  projectId: "sep-g4-95b78",
  storageBucket: "sep-g4-95b78.appspot.com",
  messagingSenderId: "33550167790",
  appId: "1:33550167790:web:db81e20161dc5374abcdff",
  measurementId: "G-WR2NSTX29R"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export{app}