
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


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

    console.log('signIn');
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
  /*async signOut() {
    // ...
  } */
};
