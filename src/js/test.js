import {
  initializeApp,
  getApp,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDSXpmMhr3oTvIQ9K06hFKl8P1DD1xKz9w",
  authDomain: "testfirebase-b84cd.firebaseapp.com",
  projectId: "testfirebase-b84cd",
  storageBucket: "testfirebase-b84cd.appspot.com",
  messagingSenderId: "401210150491",
  appId: "1:401210150491:web:03a47951d5b2accbe5397e",
  measurementId: "G-3TWCV45BKW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const defaultStorage = getStorage();
const defaultFirestore = getFirestore();
const auth = getAuth();

let topLevelCollection = "vehicles";

console.log(getApp().name);

const docRef1 = doc(db, topLevelCollection, "KVvCtLcHnEqInfNKPgje");
const docSnap1 = await getDoc(docRef1);
console.log(docSnap1.data());

const docRef2 = doc(
  db,
  topLevelCollection,
  "KVvCtLcHnEqInfNKPgje",
  "makes",
  "zzZGGkL1gyflRqioOmyc"
);
const docSnap2 = await getDoc(docRef2);
console.log(docSnap2.data());

const docRef3 = collection(
  db,
  topLevelCollection,
  "KVvCtLcHnEqInfNKPgje",
  "makes"
);
const docSnap3 = await getDocs(docRef3);
docSnap3.docs.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});

const docRef4 = doc(db, topLevelCollection, "KVvCtLcHnEqInfNKPgje");
const docSnap4 = await getDoc(docRef4);
console.log(docSnap4.data());

let addRecord = true;
if (addRecord) {
  console.log("Adding record.......................");
  let topLevelCollection = "Dakota";
  let yearDoc = await addDoc(collection(db, topLevelCollection), {
    year: "2016",
  });
  let yearId = yearDoc.id;
  let docRefYear = doc(db, topLevelCollection, yearId);
  let colRefYear = collection(docRefYear, "makes");
  let makeDoc = await addDoc(colRefYear, {
    make: "Tesla",
  });
  let makeId = makeDoc.id;
  let docRefMake = doc(db, topLevelCollection, yearId, "makes", makeId);
  let colRefMake = collection(docRefMake, "makes");
  let modelDoc = await addDoc(colRefMake, {
    model: "s",
  });
  let modelId = modelDoc.id;
}

console.log("Example 5------------------");
const docRef5 = collection(db, topLevelCollection);
const docSnap5 = await getDocs(docRef5);
docSnap5.docs.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});

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

const vehicles2 = await getDocs(collection(db, topLevelCollection));
vehicles2.docs.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});

// const test = db.collection("vehicles").get().then((querySnapshot) => { querySnapshot.forEach((doc) => { console.log(doc.id, " => ", doc.data()); }); });

console.log("Finished...");

// await initializeDatabase("Dakota", { year: "2016" });

// async function initializeDatabase(databaseName, firstDocument) {
//   let topLevelCollection = databaseName;
//   let yearDoc = await addDoc(collection(db, topLevelCollection), firstDocument);
//   let yearId = yearDoc.id;
//   console.log("New Database " + yearId);
// }
