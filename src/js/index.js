// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDSXpmMhr3oTvIQ9K06hFKl8P1DD1xKz9w",
    authDomain: "testfirebase-b84cd.firebaseapp.com",
    projectId: "testfirebase-b84cd",
    storageBucket: "testfirebase-b84cd.appspot.com",
    messagingSenderId: "401210150491",
    appId: "1:401210150491:web:03a47951d5b2accbe5397e",
    measurementId: "G-3TWCV45BKW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const docRef = doc(db, "people", "sSWD03mjDWliuldDW5Um");
// const docSnap = await getDoc(docRef);
// console.log(docSnap.data());

const querySnapshot = await getDocs(collection(db, "people"));
querySnapshot.docs.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});