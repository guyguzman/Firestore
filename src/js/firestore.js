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

// const docRef = doc(db, "products", "MYB5Jk2VItyx5bVWQ1qG");
// deleteDoc(docRef);
let productObject = {};

await fetchFile().then((result) => {
  productObject = result;
});

for (let item of productObject.categories) {
  //console.log(item.category);
}

let productObjectJson = JSON.stringify(productObject);
//console.log(productObjectJson);
let tempProductObject = JSON.parse(productObjectJson);
//console.log(tempProductObject);

await fetchTreeFile();

async function fetchTreeFile() {
  fetch("./json/products.json")
    .then((response) => {
      console.log(response);
      return response.json;
    })
    .then((jsondata) => {
      console.log("inside reading json");
      console.log(jsondata);
    });
}

async function fetchFile() {
  let jsonArray = [];
  let jsonInput;
  let productObject;
  fetch("./json/products.json")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((product) => {
        let documentData = [product.INSTRUMENT, product.TYPE, product.MODEL];
        jsonArray.push(documentData);
      });
      jsonInput = json;
    })
    .catch((error) => {
      console.log(error);
    });
  await parseJSONInput(jsonArray).then((result) => {
    productObject = result;
  });
  return productObject;
}

async function parseJSONInput(jsonArray) {
  let jsonInput;

  let categoryObject = [{}];
  let level0Array = [];
  let level1Array = [];
  let level2Array = [];
  let printDetail = false;
  let printArray = false;
  let writeDatabase = false;
  let createObject = true;
  let objectProduct = [];

  let unique_0 = returnDistinct(jsonArray, 0);
  let unique_1;
  let unique_2;
  let level0Object = {};
  let level1Object = {};
  let level2Object = {};
  let level0ArrayIn = [];
  let level1ArrayIn = [];
  let level2ArrayIn = [];
  let level0ArrayOut = [];
  let level1ArrayOut = [];
  let level2ArrayOut = [];

  let databaseName = "products";
  let productObject = {};
  let index0 = -1;
  let index1 = -1;
  let index2 = -1;

  await deleteCollection(databaseName);

  for (let itemLevel0 of returnDistinct(jsonArray, 0)) {
    index0++;
    level1ArrayIn = jsonArray.filter((item) => item[0] == itemLevel0);

    let document0;
    let document1;

    if (writeDatabase) {
      let reference = collection(db, "products");
      document0 = await addDoc(reference, {
        category: itemLevel0,
      });
    }

    if (createObject) {
      let object = {};
      object.category = itemLevel0;
      level0Array.push(object);
      productObject.categories = level0Array;
      level1Array = [];
      index1 = -1;
    }

    level1ArrayIn = returnDistinct(level1ArrayIn, 1);

    if (printDetail) console.log(`...${itemLevel0}`);

    for (let item2 of level1ArrayIn) {
      index1++;
      level2ArrayIn = jsonArray
        .filter((item) => item[0] == itemLevel0)
        .filter((item) => item[1] == item2);

      if (createObject) {
        let object = {};
        object.category = item2;
        level1Array.push(object);
        productObject.categories[index0].categories = level1Array;
        level2Array = [];
        index2 = -1;
      }

      if (printDetail) console.log(`......${item2}`);

      if (writeDatabase) {
        let reference = collection(db, "products", document0.id, "sections");
        document1 = await addDoc(reference, {
          category: item2,
        });
      }

      level2ArrayIn = returnDistinct(level2ArrayIn, 2);
      level2ArrayOut = [];

      for (let item3 of level2ArrayIn) {
        index2++;
        if (printDetail) console.log(`.........${item3}`);
        let obj = new Object();
        obj = objectAddProperty(obj, "category", item3);
        level2ArrayOut.push(obj);

        if (writeDatabase) {
          let reference = collection(
            db,
            "products",
            document0.id,
            "sections",
            document1.id,
            "subsections"
          );
          let document3 = await addDoc(reference, {
            category: item3,
          });
        }
        if (createObject) {
          let object = {};
          object.category = item3;
          level2Array.push(object);
          productObject.categories[index0].categories[index1].categories =
            level2Array;
        }
      }
    }
  }
  return productObject;
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

function isPathLengthEven(path) {
  if (path.length % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

function isPathLengthOdd(path) {
  if (path.length % 2 != 0) {
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
  if (isPathLengthOdd(documentPath)) {
    let reference = collection(db, ...documentPath);
    await addDoc(reference, documentData)
      .then((docReference) => {
        console.log(docReference.id);
        return docReference.id;
      })
      .catch((error) => {
        return false;
      });
  }
}

async function updateDocument(documentPath, documentData) {
  if (isPathLengthOdd(documentPath)) {
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
  if (isPathLengthOdd(documentPath)) {
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
  if (isPathLengthOdd(documentPath)) {
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
  if (isPathLengthOdd(collectionPath)) {
    console.log("Inside getCollectionDocuments", collectionPath);
    let reference = collection(db, ...collectionPath);
    let snapshot = await getDocs(reference);
    return snapshot.docs;
  }
}

async function deleteCollection(collectionPath) {
  let collectionReference = collection(db, collectionPath);
  let snapshot = await getDocs(collectionReference);

  if (snapshot.docs.length > 0) {
    snapshot.forEach((document) => {
      let documentReference = doc(db, collectionPath, document.id);
      deleteDoc(documentReference)
        .then(() => {})
        .catch((error) => {});
    });
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
