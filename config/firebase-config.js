import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD38nYSRLduHTIq-LerrN49iu_-48NiWG4",
  authDomain: "react-project-6843b.firebaseapp.com",
  projectId: "react-project-6843b",
  storageBucket: "react-project-6843b.appspot.com",
  messagingSenderId: "945122719159",
  appId: "1:945122719159:web:d1cc6766992cbacff36432",
  measurementId: "G-L3J0QZMV2L",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase;
