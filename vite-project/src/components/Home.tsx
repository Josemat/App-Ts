import * as React from 'react';
import BasicCard from './Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { db } from '../config/Firebase';
import Empleado from './Empleado';
import { collection, doc, getDocs } from 'firebase/firestore';
import { Props } from '../vite-env';

const Home = () => {
  const resultados: Array<Object> = [];
  if (resultados) {
    obtenerAsistencias();
  }
  async function obtenerAsistencias() {
    const obtenerAsistencia = await getDocs(collection(db, 'Asistencias'));
    obtenerAsistencia.forEach((doc) => resultados.push(doc.data()));
    // console.log();
  }
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: '20px' }}>
        {resultados.map((e: Props | any) => (
          <Empleado
            key={e.fecha}
            empresa={e.empresa}
            fecha={e.fecha}
            numCoche={e.numCoche}
            descripcion={e.descripcion}
          />
        ))}
      </Box>
    </>
  );
};

export default Home;
