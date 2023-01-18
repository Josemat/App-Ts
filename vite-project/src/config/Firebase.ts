// Import the functions you need from the SDKs you need
import * as React from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
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
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_SORAGE_BUDGET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
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
type Perfil = {
  nombre: string;
  apellido?: string;
  avatar?: string;
  uid: string;
  vacaciones: string;
  posicion?: number;
};
function parsePerfil(perfil: any): Perfil {
  //No se esta usando
  const usuario: Perfil = {
    nombre: `${perfil.nombre}, ${perfil.apellido}`,
    avatar: perfil.avatar,
    uid: perfil.uid,
    vacaciones: perfil.vacaciones,
  };
  return usuario;
}

export async function obtenerDatosUsuario(uid: string | void) {
  const q = query(collection(db, 'personal'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  const perfil: Perfil[] = [];
  querySnapshot.forEach((doc) => perfil.push(doc.data() as Perfil));

  return perfil;
}
export async function todosUsuarios() {
  const q = query(collection(db, 'personal'));
  const querySnapshot = await getDocs(q);
  const perfil: Perfil[] = [];
  querySnapshot.forEach((doc) => perfil.push(doc.data() as Perfil));
  return perfil;
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
export async function obtenerAsistenciaUID(uid: string) {
  const q = query(collection(db, 'Asistencias'), where('uid', '==', uid));
  const data: CollectionData[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((evt) =>
    data.push(retorno(evt.data(), evt.id) as CollectionData)
  );
  return data;
}
obtenerAsistenciaUID('umpvXDzxQxTr3BMR6IMmyyNyaNg2');

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

export async function obtenerAsistenciaCoche() {
  const q = query(collection(db, 'Asistencias'), orderBy('fecha', 'desc'));
  const querySnapshot = await getDocs(q);
  const data: CollectionData[] = [];
  querySnapshot.forEach((doc) => {
    data.push(retorno(doc.data(), doc.id) as CollectionData);
  });
  return data;
}
