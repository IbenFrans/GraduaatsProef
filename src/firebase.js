import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDYVvCXnhX1vmphvtbvI5XFdYNgKPQm5nw",
  authDomain: "mediakit-822c3.firebaseapp.com",
  projectId: "mediakit-822c3",
  storageBucket: "mediakit-822c3.appspot.com",
  messagingSenderId: "1070413476405",
  appId: "1:1070413476405:web:c7e096cb6cfb46014af77c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export default storage