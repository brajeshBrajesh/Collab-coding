// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCH5yl_Kv6yUi6ZAQSSz_A3G2RzWmHjJQI",
//   authDomain: "my-first-project-3fbf8.firebaseapp.com",
//   databaseURL: "https://my-first-project-3fbf8.firebaseio.com",
//   projectId: "my-first-project-3fbf8",
//   storageBucket: "my-first-project-3fbf8.appspot.com",
//   messagingSenderId: "834526276106",
//   appId: "1:834526276106:web:885d8a640d78b4dd3f0df3",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH5yl_Kv6yUi6ZAQSSz_A3G2RzWmHjJQI",
  authDomain: "my-first-project-3fbf8.firebaseapp.com",
  databaseURL: "https://my-first-project-3fbf8.firebaseio.com",
  projectId: "my-first-project-3fbf8",
  storageBucket: "my-first-project-3fbf8.appspot.com",
  messagingSenderId: "834526276106",
  appId: "1:834526276106:web:885d8a640d78b4dd3f0df3",
  measurementId: "G-S06DJ2F3JX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
