import "../firebase/app.js";
import {
  getFirestore, collection, getDocs, where, query
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const db = getFirestore();

const buscador = document.getElementById("buscador");
const cedula = document.getElementById("cedula");
const formC = document.getElementById("form");
const contenedor = document.getElementById("containerresult");

formC.addEventListener("submit", (e) => {
  e.preventDefault();
});

buscador.addEventListener('click', async () => {
  ongetEmployer((querySnapshot) => {
    contenedor.innerHTML = ""; // Limpiamos el contenedor antes de cada búsqueda

    let htmlContent = ""; // Variable para almacenar el HTML de todos los resultados

    querySnapshot.forEach((doc) => {
      const employer = doc.data();
      console.log (doc.data());
      htmlContent += `
                <div class="col-12 py-3 d-flex justify-content-center align-items-center bg-blue950 rounded-4">
                    <h4>Datos del empleado</h4>
                </div>
                <div class="p-4 m-3 border border-top-0 rounded-3 shadow-p vh-70 d-flex flex-column justify-content-between bg-white">
                
                <p><strong class="bg-blue950 p-1 rounded">Nombre:</strong><span class="text-blue950"> ${employer.name}</span></p>
                <p><strong class="bg-blue950 p-1 rounded">Cedula:</strong><span class="text-blue950">${employer.ci}</span> </p>
                <p><strong class="bg-blue950 p-1 rounded">Departamento:</strong><span class="text-blue950">${employer.departament}</span> </p>
                <p><strong class="bg-blue950 p-1 rounded">Cargo:</strong><span class="text-blue950">${employer.cargo}</span> </p>
                <p><strong class="bg-blue950 p-1 rounded">Fecha de Ingreso:</strong><span class="text-blue950">${employer.date}</span> </p>
                </div>
            `;
            
          });
          if (htmlContent=='') {
      Swal.fire("¡Lo sentimos!", "La cédula ingresada no pertenece a ningun empleado", "error");
              
    }
    contenedor.innerHTML = htmlContent;
  });
});

function ongetEmployer(callback) {

  // Obtén una referencia a la colección "employers"
  const employersRef = collection(db, "employers");

  // Crea una consulta para buscar por la cédula
  const q = query(employersRef, where("ci", "==", cedula.value));

  // Ejecuta la consulta y maneja los resultados
  getDocs(q)
    .then((querySnapshot) => {
      callback(querySnapshot); // Pasa los resultados al callback
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}