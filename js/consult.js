import  "../firebase/app.js";
import { 
    getFirestore,collection,  getDocs, where, query ,onSnapshot} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

 const db= getFirestore();

//  const ongetEmployer= (callback)=> onSnapshot(collection(db,"employers"),callback);


const buscador = document.getElementById("buscador");
const cedula=document.getElementById("cedula");
const formC=document.getElementById("form");
const contenedor = document.getElementById("containerresult");

formC.addEventListener("submit",(e)=>{
    e.preventDefault();
});

  buscador.addEventListener('click', async() => {
    ongetEmployer((querySnapshot) => {
        contenedor.innerHTML = ""; // Limpiamos el contenedor antes de cada búsqueda

        let htmlContent = ""; // Variable para almacenar el HTML de todos los resultados

        querySnapshot.forEach((doc) => {
            const employer = doc.data();
            htmlContent += `
                <h2>Datos de la Persona</h2>
                <p><strong>Nombre:</strong> ${employer.name}</p>
                <p><strong>Cedula:</strong> ${employer.ci}</p>
                <p><strong>Departamento:</strong> ${employer.departament}</p>
            `;
        });

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