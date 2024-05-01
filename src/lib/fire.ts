// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { collection, doc, getDoc, getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHVpsnCS3l6ymBXDDJQzlIOon5N_NGyi8",
  authDomain: "tisqo-8366e.firebaseapp.com",
  projectId: "tisqo-8366e",
  storageBucket: "tisqo-8366e.appspot.com",
  messagingSenderId: "730933148446",
  appId: "1:730933148446:web:3f34f6363431c3f7c5a70f",
  measurementId: "G-R0V2WK8W0F"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)


export async function checkingServer() {
  const db = getFirestore(app)
  const serverWorking = await getDoc(doc(db, 'server', 'working'))

  return serverWorking.data().working
}