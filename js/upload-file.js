
import {app} from "../firebase/app.js";
import {getStorage, ref, uploadBytes,getDownloadURL,deleteObject} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
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

const storage = getStorage(app);

const formDocument= document.getElementById('formDocument');
const documentContainer= document.getElementById("documentContainer");

const db= getFirestore();
export const saveInfoDocument=(title, date, type,downloadURL)=>
addDoc(collection(db, "documents"),{title,date, type,downloadURL})

export const getInfoDocuments= ()=> getDocs(collection(db, "documents"));

export const ongetInfoDocuments= (callback)=> onSnapshot(collection(db,"documents"),callback);

// export const deleteDocument= (id) => deleteDoc(doc(db, "documents", id));

async function eliminarDocumentoAndFile(documentId) {
  try {
    // Obtener la URL de descarga del documento eliminado
    const docSnapshot = await getDoc(doc(db, "documents", documentId));
    const { downloadURL } = docSnapshot.data();

    // Eliminar el archivo de Storage (si existe)
    if (downloadURL) {
      const storageRef = ref(storage, downloadURL);
      await deleteObject(storageRef);
      console.log(`Archivo con URL ${downloadURL} eliminado correctamente de Storage.`);
    }

    // Eliminar el documento de Firestore
    await deleteDoc(doc(db, "documents", documentId));
    console.log(`Documento con ID ${documentId} eliminado correctamente de Firestore.`);
  } catch (error) {
    console.error("Error al eliminar el documento o el archivo:", error);
  }
}

export const getInfoDoc = (id) => getDoc(doc(db, "documents", id));

export const updateInfoDocument= (id, newFields)=>
updateDoc(doc(db,"documents",id),newFields);


let editStatus= false;

let id="";

window.addEventListener('DOMContentLoaded', async() => {
  ongetInfoDocuments((querySnapshot)=>{
  documentContainer.innerHTML="";

  querySnapshot.forEach((dc)=>{

  const document = dc.data();



    documentContainer.innerHTML += `

   
    <div>
       <tr class="">
              <td scope="row">
              <button class="btn btn-secondary btn-vista" data-id="${dc.id}"><i class="fa-regular fa-eye m-1 text-black"></i></button> 
              
              <button class="btn btn-danger btn-delete" data-id="${dc.id}"><i class="fa-solid fa-trash-can m-1"></i></button>
              <button class="btn btn-secondary btn-edit" data-id="${dc.id}"><i class="fa-solid fa-pen-to-square m-1"></i></button> 
              </td>
              <td>${document.title}</td>
              <td>${document.type}</td>
              <td>${document.date}</td>
             
              
      </tr> 
   </div>`;
});

const btnsDelete = documentContainer.querySelectorAll(".btn-delete");
btnsDelete.forEach((btn) => {
  btn.addEventListener("click", async ({ target: { dataset } }) => {
    const documentId = dataset.id;
    await eliminarDocumentoAndFile(documentId);
  });
});




  const btnsEdit= documentContainer.querySelectorAll(".btn-edit");

  btnsEdit.forEach(btn=>{
    btn.addEventListener('click', async({target:{dataset}})=>{
     const doc = await getInfoDoc(dataset.id);
     const docInfo= doc.data();
     formDocument["title"].value=docInfo.title;
     formDocument["type"].value=docInfo.type;
     formDocument["date"].value=docInfo.date;
     
     editStatus=true;
     id=doc.id;
     formDocument['subirDoc'].innerText="Actualizar";
   });
  });
});

});


formDocument.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = formDocument["title"];
  const type = formDocument["type"];
  const date = formDocument["date"];


  if (!editStatus) {
    try {
      // 1. Upload file to Storage (if a file is selected):
      const file = document.getElementById("fileInput").files[0];
      let downloadURL = null;
      if (file) {
        const storageRef = ref(storage, `documentos/${generateUniqueId()}.${file.name.split(".").pop()}`);
        await uploadBytes(storageRef, file);
        downloadURL = await getDownloadURL(storageRef);
      }
  
      // 2. Save data to Firestore (including downloadURL if uploaded):
      await saveInfoDocument(title.value, type.value, date.value, downloadURL);
      alert("Datos guardados exitosamente");
  
      formDocument.reset();
    } catch (error) {
      console.error("Error al guardar datos:", error);
      alert("Ocurrió un error. Intente nuevamente más tarde.");
    }
}else {
    updateInfoDocument( id,{
      title:title.value,
      type:type.value,
      date:date.value
      
      
    });
    editStatus=false;
    formDocument['subirDoc'].innerText="Guardar";
  }

 
});





function generateUniqueId() {
      return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
      };

const buscador = document.getElementById('inputBusqueda');

      // Función para filtrar los documentos en tiempo real
function filtrarDocumentos() {
        const terminoBusqueda = buscador.value.toLowerCase();
        const filas = documentContainer.querySelectorAll('tr');
      
        filas.forEach(fila => {
          const nombreCelda = fila.querySelector('td:nth-child(2)'); // Asumiendo que el nombre está en la segunda celda
          const nombre = nombreCelda.textContent.toLowerCase();
          fila.style.display = nombre.includes(terminoBusqueda) ? '' : 'none';
        });
      }
      
      // Evento para filtrar al escribir en el buscador
      buscador.addEventListener('input', filtrarDocumentos);