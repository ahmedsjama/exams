import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCHVpsnCS3l6ymBXDDJQzlIOon5N_NGyi8",
  authDomain: "tisqo-8366e.firebaseapp.com",
  projectId: "tisqo-8366e",
  storageBucket: "tisqo-8366e.appspot.com",
  messagingSenderId: "730933148446",
  appId: "1:730933148446:web:3f34f6363431c3f7c5a70f",
  measurementId: "G-R0V2WK8W0F"
};
const app = initializeApp(firebaseConfig);
async function checkingServer() {
  const db = getFirestore(app);
  const serverWorking = await getDoc(doc(db, "server", "working"));
  return serverWorking.data().working;
}
const handle = async ({ event, resolve }) => {
  const server = await checkingServer();
  if (!server)
    return {};
  const response = await resolve(event);
  return response;
};
export {
  handle
};
