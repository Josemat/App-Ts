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
  orderBy,
  deleteDoc,
  limit,
} from 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Pipo, Props } from '../vite-env';
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

type CollectionData = {
  id: string;
  fecha: string;
  empresa: string;
  descripcion: string;
  numCoche: string;
  uid: string;
};

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

const retorno = (el1: any, el2: any): {} => {
  let objeto: Props = {
    fecha: el1.fecha,
    empresa: el1.empresa,
    descripcion: el1.descripcion,
    numCoche: el1.numCoche,
    uid: el1.uid,
    id: el2,
  };
  return objeto;
};

// interface Props extends Array<Props>{}
export async function obtenerAsistencias() {
  const q = query(
    collection(db, 'Asistencias'),
    orderBy('fecha', 'desc'),
    limit(20)
  );
  const querySnapshot = await getDocs(q);
  const data: CollectionData[] = [];
  querySnapshot.forEach((doc) => {
    data.push(retorno(doc.data(), doc.id) as CollectionData);
  });

  return data;
}

export async function Borrar(params: string) {
  try {
    await deleteDoc(doc(db, 'Asistencias', params));
  } catch (error) {
    console.log(error);
  }
}

// ------------------------------------------------------------------

export async function obtenerAsistenciaCoche(numero: string) {
  const q = query(
    collection(db, 'Asistencias'),
    where('numCoche', '==', numero)
  );
  const querySnapshot = await getDocs(q);
  const data: CollectionData[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data() as CollectionData);
  });
  return data;
}
obtenerAsistenciaCoche('1209');
