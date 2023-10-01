import firebase from 'firebase/app';
import "firebase/auth";

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyBxB2FttM8D_gMyl-axBHOGisQAe4hPI2s",
  authDomain: "medgram-af81b.firebaseapp.com",
  projectId: "medgram-af81b",
  storageBucket: "medgram-af81b.appspot.com",
  messagingSenderId: "284882629073",
  appId: "1:284882629073:web:5c2c1ba908f100c55930f0"
}).auth();

