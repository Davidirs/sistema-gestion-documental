
import { auth, signOut } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from "firebase/auth";


export default {
  async signUp(email, password) {
    console.log('signUp');

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code == 'auth/email-already-in-use') {
          console.log(error.message);

        }
      });

  },
  async signIn(email, password) {

    console.log('signIn'+email + ' ' + password);
    let userCredential = await signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.log(error.code);
        if (error.code == 'auth/email-already-in-use') {
          console.log(error.message);
        }
        if (error.code == 'auth/invalid-credential') {
          console.log(error.message);

        }
      });
    return userCredential;
  },
  async signOut() {
    console.log('signOut');

    signOut(auth)
    // ...
  },
  async getCurrentUser() {
    console.log('getCurrentUser ' + auth.currentUser);
    return auth.currentUser;
  },
  async updatePassword(newPassword) {
    console.log('actualizando contraseña');
    const user = auth.currentUser;
    updatePassword(user, newPassword).then(() => {
      // Update successful.
    }).catch((error) => {
      // An error ocurred
      console.error('Error al actualizar la contraseña:', error);
      // ...
    });

  }
  
};
