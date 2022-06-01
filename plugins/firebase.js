// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_Y62KJ-o4iwbx_nehrYhzhA9bbuEspDM",
  authDomain: "sns-app-995f1.firebaseapp.com",
  projectId: "sns-app-995f1",
  storageBucket: "sns-app-995f1.appspot.com",
  messagingSenderId: "206794030661",
  appId: "1:206794030661:web:25b3796c52a9849e31ad2c"
};



// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default(context, inject)=>{
    inject("firebase",firebaseApp)
}
