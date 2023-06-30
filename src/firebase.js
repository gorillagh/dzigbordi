import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB4iFiNr2ooqSN2R0cimeTtTKofl4bKJpU",
  authDomain: "dzigbordi-oms.firebaseapp.com",
  projectId: "dzigbordi-oms",
  storageBucket: "dzigbordi-oms.appspot.com",
  messagingSenderId: "315459528129",
  appId: "1:315459528129:web:8941975e209a1de8e8fb40",
  measurementId: "G-4QJWFF7ZKE",
  auth: {
    tokenExpirationTime: 600,
  },
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
