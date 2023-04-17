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

let addRecord = false;
if (addRecord) {
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

const docSampleData = {
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
  { name: "products", level: 0 },
  { name: "category", level: 1 },
  { name: "section", level: 2 },
];

let collectionPath1 = [
  "vehicles",
  "KVvCtLcHnEqInfNKPgje",
  "makes",
  "zzZGGkL1gyflRqioOmyc",
  "models",
];

let documentPath1 = ["vehicles", "KVvCtLcHnEqInfNKPgje"];
let documentPath2 = [
  "vehicles",
  "KVvCtLcHnEqInfNKPgje",
  "makes",
  "zzZGGkL1gyflRqioOmyc",
];
let firstDocument = {
  level0: "recordingGear",
  description: "Recording Gear",
  active: true,
};
let databaseName = "vehicles";

//initializeDatabase("Blazing", firstDocument);
await addDocument(["Blazing"], firstDocument);

let newDocs = await getCollectionDocuments(collectionPath1);
let newDoc = await getDocument(documentPath2);

await addDocument(["guy"], firstDocument);
await addDocument(["guy"], docSampleData);

function isCollectionPath(collectionPath) {
  if (collectionPath.length % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

function isDocumentPath(documentPath) {
  if (documentPath.length % 2 != 0) {
    return true;
  } else {
    return false;
  }
}

async function initializeDatabase(databaseName, firstDocument) {
  let document = await addDoc(collection(db, databaseName), firstDocument);
  let documentId = document.id;
}

async function addDocument(documentPath, documentData) {
  console.log("In addDocument...");
  if (isDocumentPath(documentPath)) {
    console.log("Valid Path");
    let reference = collection(db, ...documentPath);
    await addDoc(reference, documentData)
      .then((result) => {
        console.log("Document added");
        return true;
      })
      .catch((error) => {
        return false;
      });
  }
}

async function updateDocument(documentPath, documentData) {
  if (isDocumentPath(documentPath)) {
    let reference = doc(db, ...addDocdocumentPath);
    await updateDoc(reference, documentData)
      .then((result) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  } else {
    return false;
  }
}

async function getDocument(documentPath) {
  if (isDocumentPath(documentPath)) {
    let reference = doc(db, ...documentPath);
    let snapshot;
    snapshot = await getDoc(reference)
      .then((result) => {
        return snapshot.data();
      })
      .catch((error) => {
        return false;
      });
  } else {
    return false;
  }
}

async function deleteDocument(documentPath) {
  if (isDocumentPath(documentPath)) {
    let reference = doc(db, ...documentPath);
    deleteDoc(reference)
      .then((result) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  } else {
    return false;
  }
}

async function getCollectionDocuments(collectionPath) {
  if (isCollectionPath(collectionPath)) {
    let reference = collection(db, ...collectionPath);
    let snapshot = await getDocs(reference);
    return snapshot.docs;
  }
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

function Level0(name) {
  this.name = name;
  this.fullName = function () {
    return this.name;
  };
}

function Level1(name) {
  this.name = name;
  this.fullName = function () {
    return this.name;
  };
}

function Level2(name) {
  this.name = name;
  this.fullName = function () {
    return this.name;
  };
}

function Level3(name) {
  this.name = name;
  this.fullName = function () {
    return this.name;
  };
}
