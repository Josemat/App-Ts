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
} from 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Props, CollectionData, Perfil, CollectionData2 } from '../vite-env';

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

  return perfil.filter((el) => el.uid !== '7wMLEtiwdGfJjxxeNbuzQkcqnJ13');
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
export const retorno = (el1: any, el2: any): {} => {
  let objeto: Props = {
    fecha: el1.fecha,
    empresa: el1.empresa,
    descripcion: el1.descripcion,
    numCoche: el1.numCoche,
    uid: el1.uid,
    createdAt: el1.createdAt,
    id: el2,
  };
  return objeto;
};

export async function Borrar(params: string) {
  try {
    await deleteDoc(doc(db, 'Asistencias', params));
  } catch (error) {
    console.log(error);
  }
}

// ------------------------------------------------------------------

export async function obtenerAsistenciaCoche() {
  const q = query(collection(db, 'Asistencias'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const data: CollectionData2[] = [];
  querySnapshot.forEach((doc) => {
    data.push(retorno(doc.data(), doc.id) as CollectionData);
  });
  return data;
}
