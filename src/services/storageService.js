

import { getStorage,getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
/*
//crear usauario en la base de datos con las credenciales que se registró
import User from '@/models/user';
import Department from '@/models/departament';
import Employee from '@/models/employee'; */
//import Document from '@/models/document';
//import { doc, deleteDoc } from 'firebase/firestore';
import dbService from '@/services/dbService';

import Swal from 'sweetalert2'



export default {

  async deleteDocument(href) {
    // Referencia al archivo a eliminar
    const storage = getStorage();
    const desertRef = ref(storage, href);
    // Elimina el archivo
    deleteObject(desertRef)
      .then(() => {
        console.log('Archivo eliminado de storage correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar el archivo de storage:', error);
        // Aquí puedes agregar lógica adicional para manejar el error, como mostrar un mensaje al usuario
      });
  },

  async uploadFile(selectedFile, document) {
    if (!selectedFile) {
      alert('Por favor, seleccione un archivo.');
      return;
    }

    const downloadURL = false;
    const storage = getStorage();
    const storageRef = ref(storage, document.href);
    console.log('document.href:', document.href);
    console.log('storageRef:', storageRef);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //uploadProgress.value = progress; 
        console.log(progress);

      },
      (error) => {
        console.error('Error al subir el archivo:', error);
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "Error al subir el archivo!",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          //downloadURL.value = downloadURL; 
          console.log('URL de descarga:', downloadURL);
          // Aquí puedes hacer algo con la URL de descarga, 
          // como guardarla en la base de datos 
          document.url = downloadURL;
          let documentCreated = await dbService.addDocument(document)
          if (documentCreated) {
            Swal.fire({
              icon: "success",
              title: "Documento creado!",
              showConfirmButton: false,
              timer: 1500
            });
            console.log('Documento Creado');
          } else {
            Swal.fire({
              icon: "error",
              title: "Ups...",
              text: "Algo ha salido mal!",
            });
            console.log('Algo salió mal');
          }

          console.log('documentCreated:', documentCreated);
        });
      }
    );
    return downloadURL;
  },
  async uploadImagProfile(selectedFile, employee) {
    if (!selectedFile) {
      alert('Por favor, seleccione una imagen.');
      return;
    }

    const downloadURL = false;
    const storage = getStorage();
    const storageRef = ref(storage, employee.href);
    console.log('employee.href:', employee.href);
    console.log('storageRef:', storageRef);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //uploadProgress.value = progress; 
        console.log(progress);

      },
      (error) => {
        console.error('Error al subir la imagen:', error);
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "Error al subir la imagen!",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          //downloadURL.value = downloadURL; 
          console.log('URL de descarga:', downloadURL);
          // Aquí puedes hacer algo con la URL de descarga, 
          // como guardarla en la base de datos 
          employee.url = downloadURL;
          
          let employeeCreated = await dbService.addEmployee(employee)
          
          console.log('employeeCreated con imagen:', employeeCreated);
        });
      }
    );
    return downloadURL;
  }

}