import * as React from 'react';
import BasicCard from './Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { db } from '../config/Firebase';
import Empleado from './Empleado';
import { collection, doc, getDocs } from 'firebase/firestore';

interface Props {
  fecha: string;
  empresa: string;
  descripcion: string;
  numCoche: string;
}

const Home = () => {
  const resultados: Array<Object> = [];
  if (resultados) {
    obtenerAsistencias();
  }
  async function obtenerAsistencias() {
    const obtenerAsistencia = await getDocs(collection(db, 'Asistencias'));
    obtenerAsistencia.forEach((doc) => resultados.push(doc.data()));
  }
  console.log(resultados.length);

  return (
    <>
      <Box sx={{ flexGrow: 1, mb: '20px' }}>
        {/* {resultados &&
          resultados.map((e) => (
            <Empleado
              key={'10-10-10'}
              empresa={'' || e.empresa}
              fecha={'10-10-10'}
              numCoche={'6541'}
              descripcion={'se incencio'}
            />
          ))} */}
      </Box>
    </>
  );
};

export default Home;
