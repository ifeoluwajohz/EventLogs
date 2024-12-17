// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXy9bzXFjedqguZI-OuQo5Xm78c_IpXuc",
    authDomain: "theevent-77725.firebaseapp.com",
    projectId: "theevent-77725",
    storageBucket: "theevent-77725.firebasestorage.app",
    messagingSenderId: "275890980519",
    appId: "1:275890980519:web:8f4038355fb144531bbd82",
    measurementId: "G-RR2E3SJF47"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export { auth };