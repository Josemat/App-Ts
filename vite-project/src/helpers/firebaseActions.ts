import * as React from 'react';
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { db } from '../config/Firebase';
interface Props {
  email: string;
  password: string;
  nombre?: string;
  apellido?: string;
}
db;
export const auth = getAuth();

export const crearUser = async ({ email, password }: Props) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user.uid;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
      // ..
    });
};
export const ingresarUser = async ({ email, password }: Props) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user.uid;

      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
      return errorMessage;
    });
};
export function logout() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
}
