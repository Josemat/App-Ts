// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
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
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export async function usuariologueado() {
  console.log('aca entra');
  const usuarioCol = collection(db, 'personal');
  const usuarioSnapshot = await getDocs(usuarioCol);
  const usuarioList = usuarioSnapshot.docs.forEach((doc) => doc.data());
  return usuarioList;
}
export async function obtenerDatosUsuario(uid: string) {
  const docRef = doc(db, 'personal', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
}
export async function crearUsuario(usuario: Object) {
  console.log('Creando...');
  const personalRef = collection(db, 'personal');
  await setDoc(doc(personalRef), usuario);
}
