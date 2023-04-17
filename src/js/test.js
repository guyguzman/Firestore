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
  setDoc,
  deleteDoc,
  Timestamp,
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
//console.log(docSnap1.data());

const docRef2 = doc(
  db,
  topLevelCollection,
  "KVvCtLcHnEqInfNKPgje",
  "makes",
  "zzZGGkL1gyflRqioOmyc"
);
const docSnap2 = await getDoc(docRef2);
//console.log(docSnap2.data());

const docRef3 = collection(
  db,
  topLevelCollection,
  "KVvCtLcHnEqInfNKPgje",
  "makes"
);
const docSnap3 = await getDocs(docRef3);
docSnap3.docs.forEach((doc) => {
  //console.log(doc.id, " => ", doc.data());
});

const docRef4 = doc(db, topLevelCollection, "KVvCtLcHnEqInfNKPgje");
const docSnap4 = await getDoc(docRef4);
//console.log(docSnap4.data());

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
  //console.log(doc.id, " => ", doc.data());
});

// await initializeDatabase("Dakota", { year: "2016" });

// async function initializeDatabase(databaseName, firstDocument) {
//   let topLevelCollection = databaseName;
//   let yearDoc = await addDoc(collection(db, topLevelCollection), firstDocument);
//   let yearId = yearDoc.id;
//   console.log("New Database " + yearId);
// }

//await initializeDatabase("Dakota", { year: "2017" });
//

//================================================================================

const docData = {
  stringExample: "Hello world!",
  booleanExample: true,
  numberExample: 3.14159265,
  dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
  arrayExample: [5, true, "hello"],
  nullExample: null,
  objectExample: {
    a: 5,
    b: {
      nested: "foo",
    },
  },
};

let schema = [
  { name: "vehicles", level: 0 },
  { name: "makes", level: 1 },
  { name: "models", level: 2 },
];

let collectionPath = [
  "vehicles",
  "KVvCtLcHnEqInfNKPgje",
  "makes",
  "zzZGGkL1gyflRqioOmyc",
  "models",
];

let collectionPath1 = ["vehicles", "KVvCtLcHnEqInfNKPgje", "makes"];

let documentPath = ["vehicles", "2021", "makes", "4MwOouS1JLSBVGlFTbHq"];

let firstDocument = { year: "2016" };
let databaseName = "vehicles";

//deleteCollection(["Dakota", "2016", "makes", "4MwOouS1JLSBVGlFTbHq", "models"]);
getCollectionDocuments(collectionPath);
//testing(...collectionPath);
// updateDocument("doc2");
initializeDatabase("dakota", { year: "2017" });

let testSpreadData = [1, 2, 3, 4, 5];

testSpread(...testSpreadData);

function testSpread() {
  for (let index = 0; index < arguments.length; index++) {
    //console.log(arguments[index]);
  }
}

function testing(...collectionPath) {
  console.log("Arguments length = " + arguments.length);
  console.log("testing........");
  console.log(...collectionPath);
}

function isCollection(collectionPath) {
  let length = collectionPath.length;
  if (length % 2 != 0) {
    return true;
  } else {
    return false;
  }
}

function isDocument(collectionPath) {
  let length = collectionPath.length;
  if (length % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

async function updateDocument(documentId, documentData) {
  await setDoc(doc(db, "vehicles", documentId), documentData);
}
async function getCollectionDocuments(collectionPath) {
  if (true) {
    console.log("in getCollectionDocuments", collectionPath[0]);

    collectionPath.forEach((path) => {
      console.log("-" + path + "-");
    });

    let reference1 = collection(db, "vehicles");

    let reference = collection(db, ...collectionPath);

    console.log(reference);
    let snapshot = await getDocs(reference);
    console.log("snapshot.docs.length = " + snapshot.docs.length);
    snapshot.docs.forEach((doc) => {
      console.log(doc.id);
    });

    return;
  }
}

async function initializeDatabase(databaseName, firstDocument) {
  let yearDoc = await addDoc(collection(db, databaseName), firstDocument);
  let yearId = yearDoc.id;
  console.log("New Database " + yearId);
}

async function deleteDatabase(databaseName) {
  let reference = collection(db, databaseName);
  let snapshot = await getDocs(reference);
  snapshot.docs.forEach((doc) => {
    deleteDocument(databaseName, doc.id);
  });
}

async function deleteCollection(collectionPath) {
  let length = collectionPath.length;
  let isCollection = false;
  let isDocuments = false;
  if (length % 2 != 0) {
    for (let index = length - 1; index > 0; index--) {
      let name = collectionPath[index];
      if (index % 2 == 0) {
        isCollection = true;
        isDocuments = false;
      } else {
        isCollection = false;
        isDocuments = true;
      }
      if (isCollection) {
        let reference = collection(db, name);
        let snapshot = await getDocs(reference);
        snapshot.docs.forEach((doc) => {
          deleteDocument(collection, doc.id);
        }); //
        if (isDocuments) {
        }
        console.log(collectionPath[index], isCollection, isDocuments, index);
      }
    }
  }
}

async function getDocument(collectionPath) {
  let docRef3 = collection(db, collection, "KVvCtLcHnEqInfNKPgje", "makes");
  let docSnap3 = await getDocs(docRef3);
  docSnap3.docs.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

async function deleteDocument(collection, documentId) {
  let docRef = doc(db, collection, documentId);
  console.log("Deleting document " + documentId);
  deleteDoc(doc(db, collection, documentId))
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
