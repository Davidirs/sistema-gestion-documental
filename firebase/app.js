// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCxwk4OemZJXVDXLQa13ZBGTd4m7P3lvDY",
//   authDomain: "yd-tesis.firebaseapp.com",
//   projectId: "yd-tesis",
//   storageBucket: "yd-tesis.appspot.com",
//   messagingSenderId: "103659674948",
//   appId: "1:103659674948:web:3b1ee90665e0e3d4d0cb11"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// console.log(app)
// console.log(auth)


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBIzfGRKb-kDbw5UeG3pfA_IVMlP2rVJUc",
    authDomain: "sistema-gestion-documental.firebaseapp.com",
    projectId: "sistema-gestion-documental",
    storageBucket: "sistema-gestion-documental.appspot.com",
    messagingSenderId: "719389423609",
    appId: "1:719389423609:web:03488a0c8b693e73906f28"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
