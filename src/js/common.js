import { add, multiply, subtract, divide } from "./testModule.js";
import {
  initializeApp,
  getApp,
} from "../node_modules/firebase/app/dist/esm/index.esm.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
} from "../node_modules/firebase/firestore/dist/esm/index.esm.js";
import { getAuth } from "../node_modules/firebase/auth/dist/esm/index.esm.js";
import { getStorage } from "../node_modules/firebase/storage/dist/esm/index.esm.js";

window.onload = function () {
  startUp();
  testFirebase();
};

function startUp() {
  showWidthHeight();

  window.addEventListener("resize", () => {
    showWidthHeight();
  });
  console.log("In common.js");
  console.log(add(3, 4));
}

function testFirebase() {
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
  console.log(getApp().name);
  const db = getFirestore(app);
  return;
  const defaultStorage = getStorage();

  const defaultFirestore = getFirestore();
  const auth = getAuth();

  let topLevelCollection = "vehicles";
}

function showWidthHeight() {
  let windowInnerWidth = window.innerWidth;
  let windowInnerHeight = window.innerHeight;
  let elementClientWidth = document.documentElement.clientWidth;
  let elementClientHeight = document.documentElement.clientHeight;
  let elementOffsetWidth = document.documentElement.offsetWidth;
  let elementOffsetHeight = document.documentElement.offsetHeight;

  let vh = windowInnerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  let vw = elementClientWidth * 0.01;
  document.documentElement.style.setProperty("--vw", `${vw}px`);
}
