
import  "../firebase/app.js";
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
    where, 
    query
     } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

 const db= getFirestore();
 export const saveEmployer=(name, ci, departament, cargo, date,ubicacionExp)=>
  addDoc(collection(db, "employers"),{name, ci, departament, cargo, date,ubicacionExp})

  export const getEmployers= ()=> getDocs(collection(db, "employers"));

  export const ongetEmployer= (callback)=> onSnapshot(collection(db,"employers"),callback);

  export const deleteEmployer= (id) => deleteDoc(doc(db, "employers", id));

  export const getEmployer = (id) => getDoc(doc(db, "employers", id));

  export const updateEmployer= (id, newFields)=>
  updateDoc(doc(db,"employers",id),newFields);


const employerForm= document.getElementById('employer-form');
const employersContainer= document.getElementById("employer-container");



let editStatus= false;

let id="";

window.addEventListener('DOMContentLoaded', async() => {
  ongetEmployer((querySnapshot)=>{
    employersContainer.innerHTML="";

    querySnapshot.forEach((dc)=>{

    const employer = dc.data();

      employersContainer.innerHTML += `

     
      <div>
         <tr class="">
                <td scope="row">
                <button class="btn btn-danger btn-delete" data-id="${dc.id}"><i class="fa-solid fa-trash-can m-1"></i></button>
                <button class="btn btn-secondary btn-edit" data-id="${dc.id}"><i class="fa-solid fa-pen-to-square m-1"></i></button> 
                </td>
                <td>${employer.name}</td>
                <td>${employer.ci}</td>
                <td>${employer.departament}</td>
                <td>${employer.cargo}</td>
                <td>${employer.date}</td>
                <td>${employer.ubicacionExp}</td>
                
        </tr> 
     </div>`;
  });


  const buscador = document.getElementById('inputBusqueda');

// Función para filtrar los empleados en tiempo real
function filtrarEmpleados() {
  const terminoBusqueda = buscador.value.toLowerCase();
  const filas = employersContainer.querySelectorAll('tr');

  filas.forEach(fila => {
    const nombreCelda = fila.querySelector('td:nth-child(2)'); // Asumiendo que el nombre está en la segunda celda
    const nombre = nombreCelda.textContent.toLowerCase();
    fila.style.display = nombre.includes(terminoBusqueda) ? '' : 'none';
  });
}

// Evento para filtrar al escribir en el buscador
buscador.addEventListener('input', filtrarEmpleados);


    const btnsDelete= employersContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach(btn=>{
      btn.addEventListener('click',({target:{dataset}})=>{
       deleteEmployer(dataset.id);
      });
    });

    const btnsEdit= employersContainer.querySelectorAll(".btn-edit");

    btnsEdit.forEach(btn=>{
      btn.addEventListener('click', async({target:{dataset}})=>{
       const doc = await getEmployer(dataset.id);
       const employer= doc.data();
       employerForm["nombre_completo"].value=employer.name;
       employerForm["cedula"].value=employer.ci;
       employerForm["departamento"].value=employer.departament;
       employerForm["cargo"].value=employer.cargo;
       employerForm["fecha_ingreso"].value= employer.date;
       employerForm["ubicacion_expediente"].value=employer.ubicacionExp;
       editStatus=true;
       id=doc.id;
       employerForm['btn-employer-save'].innerText="Actualizar";
     });
    });
 });

});


employerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name= employerForm['nombre_completo'];
  const ci= employerForm['cedula'];
  const departament= employerForm['departamento'];
  const cargo= employerForm['cargo'];
  const date= employerForm['fecha_ingreso'];
  const ubicacionExp= employerForm['ubicacion_expediente']
  if (!editStatus) {
    alert("datos guardados");
    saveEmployer(name.value, ci.value, departament.value, cargo.value, date.value,ubicacionExp.value);
  } else {
    updateEmployer( id,{
      name:name.value,
      ci:ci.value,
      departament:departament.value,
      date:date.value,
      ubicacionExp:ubicacionExp.value
      
    });
    editStatus=false;
    employerForm['btn-employer-save'].innerText="Guardar";
  }
   employerForm.reset();
});








  