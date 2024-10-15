
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
    updateDoc 
     } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

 const db= getFirestore();
 export const saveDepartament=(departamentTitle)=>
  addDoc(collection(db, "departaments"),{departamentTitle})

  export const getdepartaments= ()=> getDocs(collection(db, "departaments"));

  export const ongetDepartament= (callback)=> onSnapshot(collection(db,"departaments"),callback);

//   export const deleteDepartament= (id) => deleteDoc(doc(db, "departaments", id));

//   export const getDepartament = (id) => getDoc(doc(db, "departaments", id));

//   export const updateDepartament= (id, newFields)=>
//   updateDoc(doc(db,"departaments",id),newFields);


const departamentForm= document.getElementById('departament-form');
const departamentsContainer= document.getElementById("departament-container");

// let editStatus= false;

// let id="";

window.addEventListener('DOMContentLoaded', async() => {
  ongetDepartament((querySnapshot)=>{
    departamentsContainer.innerHTML="";

    querySnapshot.forEach((dc)=>{

    const departament = dc.data();

      departamentsContainer.innerHTML += `

     
      <div>
         <tr class="">
                <td scope="row">
                <button class="btn btn-danger btn-delete" data-id="${dc.id}"><i class="fa-solid fa-trash-can m-1"></i></button>
                <button class="btn btn-secondary btn-edit" data-id="${dc.id}"><i class="fa-solid fa-pen-to-square m-1"></i></button> 
                </td>
                <td>${departament.departamentTitle}</td>
        </tr> 
     </div>`;
  });


    const btnsDelete= departamentsContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach(btn=>{
      btn.addEventListener('click',({target:{dataset}})=>{
       deleteTask(dataset.id);
      });
    });

    const btnsEdit= departamentsContainer.querySelectorAll(".btn-edit");

    btnsEdit.forEach(btn=>{
      btn.addEventListener('click', async({target:{dataset}})=>{
       const doc = await getTask(dataset.id);
       const task= doc.data();
       taskForm["task-title"].value=task.title;
       taskForm["task-description"].value=task.description;
       editStatus=true;
       id=doc.id;
       taskForm['btn-departament-save'].innerText="Actualizar";
     });
    });
 });

});

departamentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const departamentTitle= departamentForm['departamentTitle'];

  alert("datos guardados");
  saveDepartament(departamentTitle.value);
   departamentForm.reset();
// console.log("guardar");
});






  