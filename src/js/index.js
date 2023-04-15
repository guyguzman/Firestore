import { initializeApp, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, getDocs, collection, query, where, addDoc } from "firebase/firestore";
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
const defaultStorage = getStorage();
const defaultFirestore = getFirestore();
const auth = getAuth();

console.log(getApp().name);

const docRef1 = doc(db, "vehicles", "KVvCtLcHnEqInfNKPgje");
const docSnap1 = await getDoc(docRef1);
console.log(docSnap1.data());

const docRef2 = doc(db, "vehicles", "KVvCtLcHnEqInfNKPgje", "makes", "zzZGGkL1gyflRqioOmyc");
const docSnap2 = await getDoc(docRef2);
console.log(docSnap2.data());

const docRef3 = collection(db, "vehicles", "KVvCtLcHnEqInfNKPgje", "makes");
const docSnap3 = await getDocs(docRef3);
docSnap3.docs.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});

const docRef4 = doc(db, "vehicles", "KVvCtLcHnEqInfNKPgje");
const docSnap4 = await getDoc(docRef4);
console.log(docSnap4.data());

const newDoc = await addDoc(collection(db, "vehicles"), { year: "2019" });

// const docRef5 = collection(db, "vehicles", "KVvCtLcHnEqInfNKPgje", "makes");
// const docSnap5 = await getDoc(docRef5);
// console.log(docSnap5.data());

// const collectionVehicles = collection(db, "vehicles");
// const snapshotVehicles = await getDocs(collectionVehicles);
// console.log(snapshotVehicles.data());


let vehicles = [];
// getDocs(collectionVehicles).then((vehicleSnapshot) => {
//     vehicleSnapshot.forEach((vehicle) => {
//         vehicles.push({...vehicle.data(), id: vehicle.id });
//     });
//     console.log(vehicles);
// });

// getDocs(collectionVehicles).then((vehicleSnapshot) => {
//     vehicleSnapshot.forEach((vehicle) => { vehicles.push({...vehicle.data(), id: vehicle.id }); });
// });




const vehicles2 = await getDocs(collection(db, "vehicles"));
vehicles2.docs.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});

// const test = db.collection("vehicles").get().then((querySnapshot) => { querySnapshot.forEach((doc) => { console.log(doc.id, " => ", doc.data()); }); });

console.log("Finished...");