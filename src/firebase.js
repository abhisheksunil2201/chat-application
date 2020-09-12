import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBqJry1dPcUNanIt6FfGTbUk-zLQwrsk6U",
  authDomain: "chat-application-c6445.firebaseapp.com",
  databaseURL: "https://chat-application-c6445.firebaseio.com",
  projectId: "chat-application-c6445",
  storageBucket: "chat-application-c6445.appspot.com",
  messagingSenderId: "871879677185",
  appId: "1:871879677185:web:397f92c6e8f4d6ccd13700",
  measurementId: "G-WEZJLNWMTH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;