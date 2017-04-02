import * as firebase from "firebase";

const APIKEY = "AIzaSyB-gqqdDosrWdWwPNPUpEkX1eL3ddM_PEM";
const AUTHDOMAIN = "tilrcontacts.firebaseapp.com";
const DATABASEURL = "https://tilrcontacts.firebaseio.com/";
const STORAGEBUCKET = "tilrcontacts.appspot.com";

const FIREBASECONFIG = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASEURL,
  storageBucket: STORAGEBUCKET
}

firebase.initializeApp(FIREBASECONFIG);