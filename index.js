// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT5fjf2xti-Am0-bxssW2D91J8b3AGXzo",
  authDomain: "tennis-bot-2e567.firebaseapp.com",
  projectId: "tennis-bot-2e567",
  storageBucket: "tennis-bot-2e567.appspot.com",
  messagingSenderId: "547394012808",
  appId: "1:547394012808:web:be95106087fd0b481e013d",
  measurementId: "G-K99LJDCC7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);