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
  array: Props;
}
