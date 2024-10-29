
import {app} from "../firebase/app.js";
import {getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

const storage = getStorage(app);

const subirDoc=document.getElementById("subirDoc");
const fileInput= document.getElementById("fileInput");


function uploadFile() {
  const file = document.getElementById('fileInput').files[0];
  // const storageRef = ref(storage, 'some-child');
  function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    };

   const storageRef =ref(storage, `documentos/${generateUniqueId()}.${file.name.split('.').pop()}`);
 

  uploadBytes(storageRef,file)
      .then((snapshot) => {
          alert('Archivo subido correctamente');
      })
      .catch((error) => {
          console.error('Error al subir el archivo', error);
      });
}


subirDoc.addEventListener("click",()=>{
  uploadFile();
});







