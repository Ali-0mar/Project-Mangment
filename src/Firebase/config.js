import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
        apiKey: "AIzaSyAWOSMIZ1xc8OMN8KwlMpTvzvwEcAChFnA",
        authDomain: "project-mangment-27191.firebaseapp.com",
        projectId: "project-mangment-27191",
        storageBucket: "project-mangment-27191.appspot.com",
        messagingSenderId: "191435739565",
        appId: "1:191435739565:web:fd5836ea4fd95cff3d9124",
};

//Init fireBase
firebase.initializeApp(firebaseConfig);

//Init servicesc
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timeStamp = firebase.firestore.Timestamp;
export { projectFirestore, timeStamp, projectAuth, projectStorage };
