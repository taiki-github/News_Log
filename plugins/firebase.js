// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDip_pte2apsYjoV3grXMc-Ka4jTjGvI78",
  authDomain: "news-memo-703e6.firebaseapp.com",
  projectId: "news-memo-703e6",
  storageBucket: "news-memo-703e6.appspot.com",
  messagingSenderId: "892657777787",
  appId: "1:892657777787:web:a295d645fc87bc7b2376de"
};



// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default(context, inject)=>{
    inject("firebase",firebaseApp)
}
