import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDwhNuKLhRJCRQhYD14k6Vq7nsV2PWxxCU",
  authDomain: "create-a-website-like-x-8906a.firebaseapp.com",
  projectId: "create-a-website-like-x-8906a",
  storageBucket: "create-a-website-like-x-8906a.appspot.com",
  messagingSenderId: "724831135561",
  appId: "1:724831135561:web:718f6d8050ef8f1969dc98",
  measurementId: "G-GNKHLRXRM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;