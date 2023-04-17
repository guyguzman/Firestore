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

window.onload = function () {
  startUp();
  testFirebase();
};

function startUp() {
  showWidthHeight();

  window.addEventListener("resize", () => {
    showWidthHeight();
  });
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

  const defaultStorage = getStorage();
  const db = getFirestore(app);

  const defaultFirestore = getFirestore();
  const auth = getAuth();

  let topLevelCollection = "vehicles";
  console.log("..." + getApp().name);
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
