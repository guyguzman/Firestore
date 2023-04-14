import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
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
const db1 = getFirestore(app);
const db = getFirestore();


const collectionVehicles = collection(db, "vehicles");
const snapshotVehicles = await getDocs(collectionVehicles);
snapshotVehicles.forEach((doc) => {
    console.log(doc.id, " >= ", doc.data());
});

const vehicles = await getDocs(collection(db, "vehicles"));
vehicles.docs.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});

// const test = db.collection("vehicles").get().then((querySnapshot) => { querySnapshot.forEach((doc) => { console.log(doc.id, " => ", doc.data()); }); });

console.log("Finished...");