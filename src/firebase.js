// Firebase 
import { initializeApp } from 'firebase/app';  
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
};

console.log(firebaseConfig.apiKey);
console.log(firebaseConfig.authDomain);
console.log(firebaseConfig.projectId);
console.log(firebaseConfig.storageBucket);
console.log(firebaseConfig.messagingSenderId);
console.log(firebaseConfig.appId);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* // Export the initialized Firebase app (optional)
export default firebase; */

// Export specific Firebase services (optional)
export const auth = getAuth(app);
export const db = getFirestore(app);
// ... export other services as needed
/* 
const auth = getAuth(app); 
const db = getFirestore(app);  */