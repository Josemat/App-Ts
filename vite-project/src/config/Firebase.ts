// Import the functions you need from the SDKs you need
import * as React from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD4iqWkndZ7XCQkGqNsJo6k3eyToh8zZEs',
  authDomain: 'asistencias-869c5.firebaseapp.com',
  projectId: 'asistencias-869c5',
  storageBucket: 'asistencias-869c5.appspot.com',
  messagingSenderId: '1009214080992',
  appId: '1:1009214080992:web:5b809c593871946be38d85',
  measurementId: 'G-Q6QHDXHKK3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export async function obtenerDatosUsuario(uid: string | void) {
  const q = query(collection(db, 'personal'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  let datosUsuario;
  querySnapshot.forEach((doc) => (datosUsuario = doc.data()));
  return datosUsuario;
}
export async function actualizarDatosUsuario(uid: string | void, user: object) {
  const q = query(collection(db, 'personal'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  let datosUsuario: string = '';
  querySnapshot.forEach((doc) => (datosUsuario = doc.id));
  guardaDatos(datosUsuario, user);
}

async function guardaDatos(id: string, user: object) {
  const userRef = doc(db, 'personal', id);
  await updateDoc(userRef, user);
}

//Crea un user en la coleccion con los datos del registro
export async function crearUsuario(usuario: Object) {
  const personalRef = collection(db, 'personal');
  await setDoc(doc(personalRef), usuario);
}
//Crea un user en la coleccion con los datos del registro
export async function crearAsistencia(asistencia: Object) {
  const personalRef = collection(db, 'Asistencias');
  await setDoc(doc(personalRef), asistencia);
}

export async function obtenerAsistencias() {
  const obtenerAsistencia = await getDocs(collection(db, 'Asistencias'));
  const resultados = obtenerAsistencia.docs.map((evt) => evt.data());
  return resultados;
}
