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

let databaseName = "Blazing";
//initializeDatabase("Blazing", firstDocument);
// await addDocument(["Blazing"], firstDocument);
// await addDocument(["guy"], firstDocument);
// await addDocument(["guy"], docSampleData);

let newDocs = await getCollectionDocuments(collectionPath1);
let newDoc = await getDocument(documentPath2);

fetchFile();

function fetchFile() {
  let jsonInput;
  let jsonArray = [];
  let categoryObject = [{}];
  let level0Array = [];
  let level1Array = [];
  let level2Array = [];
  let printDetail = true;
  let printArray = false;
  let objectProduct = [];
  fetch("./json/products.json")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((product) => {
        let documentData = [product.INSTRUMENT, product.TYPE, product.MODEL];
        jsonArray.push(documentData);
      });

      jsonInput = json;

      let unique_0 = returnDistinct(jsonArray, 0);
      let unique_1;
      let unique_2;
      let level0Object = {};
      let level1Object = {};
      let level2Object = {};

      let products = [
        {
          category: "Guitars",
          subcategory: [
            {
              category: "Electric",
              subcategories: [
                { category: "Solid Body" },
                { category: "Left Handed" },
              ],
            },
            { category: "Acoustic" },
            { category: "Bass" },
          ],
        },
        { category: "Pedals and Amplifiers" },
        { category: "Recording Gear" },
      ];

      let productsJSON = JSON.stringify(products);
      console.log(productsJSON);
      console.log(products);
      returnDistinct(jsonArray, 0).forEach((item1) => {
        let level1Array = jsonArray.filter((item) => item[0] == item1);
        level1Array = returnDistinct(level1Array, 1);
        if (printDetail) console.log(`___${item1}`);
        level1Array.forEach((item2) => {
          level1Array.forEach((item2) => {
            let level2Array = jsonArray
              .filter((item) => item[0] == item1)
              .filter((item) => item[1] == item2);
            if (printDetail) console.log(`______${item2}`);
            let level3Array = returnDistinct(level2Array, 2);
            let level3ArrayOut = [];
            level3Array.forEach((item3) => {
              if (printDetail) console.log(`_________${item3}`);
              let obj = new Object();
              obj = objectAddProperty(obj, "category", item3);
              level3ArrayOut.push(obj);
            });
            console.log(level3ArrayOut);
          });
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function objectAddProperty(object, property, value) {
  object[property] = value;
  return object;
}

function jsonInsertEmptyArray(input) {
  console.log(item);
  objectHierarchy.search;
  console.log(objectHierarchy);
  console.log(JSON.stringify(objectHierarchy));
}

function jsonAddArray(input, array) {}

function returnDistinct(duplicates, index) {
  const flag = {};
  const uniqueArray = [];
  duplicates.forEach((item) => {
    if (!flag[item[index]]) {
      flag[item[index]] = true;
      uniqueArray.push(item[index]);
    }
  });
  return uniqueArray;
}

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
  if (isDocumentPath(documentPath)) {
    let reference = collection(db, ...documentPath);
    await addDoc(reference, documentData)
      .then((result) => {
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
