import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const formLogin = document.getElementById("formLogin");
const formRegister = document.getElementById("formRegister");

formLogin.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    iniciarSesion();
})
formRegister.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    //si contraseñas coinciden crear usuario sino no
  /*  if (contraseñasoniguales) {
      //crear el usuario
    }else{
      //anuncia que estan mal las contraseñas
    } */
    crearUsuario();
})


function crearUsuario(){
  
  //guardame en la variable email el valor del input name email
  //que esta dentro del formulario formRegister
  let email = formRegister['email'].value;
  let password = formRegister['password'].value;
  console.log('email');
  console.log(email);
  console.log('password');
  console.log(password);
  
const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  //despues de ejecutar lo anterior entonces
  .then((userCredential) => {
    console.log('userCredential');
    console.log(userCredential);
    
    // Signed up
    const user = userCredential.user;
    console.log('user');
    console.log(user);
    
    // ...
  })

  //cacturamos los errores y los guardamos en una variable
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('errorCode');
    console.error(errorCode);
    console.log('errorMessage');
    console.error(errorMessage);
    //selecciona el caso  de que sea segun la clave
    switch (errorCode) {
      case 'auth/email-already-in-use': //if errorCode === 'auth/email-already-in-use'
        console.error('Este correo  ya existe');
        break;
      case 'auth/missing-password': //if errorCode === 'auth/missing-password'
        console.error('Contraseña erronea');
        break;
      case 'auth/invalid-email': 
        console.error('Correo Invalido');
        break;
      case 'auth/weak-password': 
        console.error('Contraseña muy debil');
        break;
    
      default:

        break;
    }
    // ..
  });
}
function iniciarSesion(){

  //guardame en la variable email el valor del input name email
  //que esta dentro del formulario formRegister
  let email = formLogin['email'].value;
  let password = formLogin['password'].value;
  console.log('email');
  console.log(email);
  console.log('password');
  console.log(password);
  
const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  //despues de ejecutar lo anterior entonces
  .then((userCredential) => {
    console.log('userCredential');
    console.log(userCredential);
    
    // Signed up
    const user = userCredential.user;
    console.log('user');
    console.log(user);
    
    //guardar los datos del usuario iniciado
    let dataUser = {
      email: user.email,
      uid: user.uid
    }
    //se guarda con set item le dices con que nombre guardar y que contenido
    // lo guardamos como string
    localStorage.setItem('dataUser', JSON.stringify(dataUser))
    //se obtiene con get item le dices con que nombre esta guardado
    //para recuperarlo lo pasamos a json de nuevo
    console.log(
      JSON.parse(localStorage.getItem('dataUser'))
    );

  })

  //cacturamos los errores y los guardamos en una variable
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('errorCode');
    console.error(errorCode);
    console.log('errorMessage');
    console.error(errorMessage);
    //selecciona el caso  de que sea segun la clave
    switch (errorCode) {
      //cuales son los errores
      case 'auth/email-already-in-use': //if errorCode === 'auth/email-already-in-use'
        console.error('Este correo  ya existe');
        break;
    
      default:

        break;
    }
    // ..
  });
}