import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyCyfdGfYxhlXFJaQGcvuoALVOz1ngh314Q",
    authDomain: "shop-23a70.firebaseapp.com",
    projectId: "shop-23a70",
    storageBucket: "shop-23a70.appspot.com",
    messagingSenderId: "122533057108",
    appId: "1:122533057108:web:7e404ed152024770d813c1"
  };
//   const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
// var storage=app.storage();
export default storage;