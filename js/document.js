//Como todas las paginas necesitan esto puedes hacerlo en una sola y las llamas en todas.
import { app } from "../firebase/app.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,

} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const db = getFirestore();
//por si la necesitamos
var listaEmpleados = [];
async function getListEmployers() {
  const querySnapshot = await getDocs(collection(db, "employers"));
  querySnapshot.forEach((doc) => {
    //por si la necesitamos
    listaEmpleados.push(doc.data())
    //pero voy a pintar de una vez
    document.getElementById('employer').innerHTML+=`
    <option value="${doc.data().name}">${doc.data().name}</option>
    `;
  });
  console.log(listaEmpleados);
}

window.addEventListener('DOMContentLoaded', async () => {
  getListEmployers();
});