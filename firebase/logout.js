import {auth} from "./app.js";

const cerrar= document.getElementById("cerrarSession");
cerrar.addEventListener("click",()=>{
    closeSession()
});



function closeSession(){
    auth.signOut().then(()=>{
        alert('Sesión cerrada');
        location.href="../index.html";
    }).catch((error)=>{
        alert('Error al cerrar sesión');
    })
}


  
