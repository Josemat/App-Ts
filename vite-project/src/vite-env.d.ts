/// <reference types="vite/client" />

export interface Props {
  fecha: string;
  empresa: string;
  descripcion: string;
  numCoche: string;
  uid?: string;
  borrar?: boolean;
  id: string;
}
export interface Pipo {
  []: Props;
}
export type CollectionDat = {
  fecha: string;
  empresa: string;
  descripcion: string;
  numCoche: string;
  uid: string;
  id: string;
};
type CollectionData = {
  fecha: string;
  empresa: string;
  descripcion: string;
  numCoche: string;
  uid: string;
  id: string;
};
type Perfil = {
  nombre: string;
  apellido?: string;
  avatar?: string;
  uid?: string;
  vacaciones?: string;
};
