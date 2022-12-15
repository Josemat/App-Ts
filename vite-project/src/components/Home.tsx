import * as React from 'react';
import BasicCard from './Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { db, obtenerAsistencias } from '../config/Firebase';
import Empleado from './Empleado';
import { Props } from '../vite-env';

const Home = () => {
  const [res, setRes] = React.useState<object[]>([]);
  const [empleados, setEmpleados] = React.useState<string[]>([]);
  React.useEffect(() => {
    const llamadaFirebase = async () => {
      const response = await obtenerAsistencias();
      setRes(response);
    };
    llamadaFirebase();
  }, []);
  if (res.length) {
    const eso = res.map((el: Props | any) => el.uid);
    const empleadosUnicos = [...new Set(eso)];
  }
  console.log(empleados);
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: '20px' }}>
        {Boolean(res.length) && (
          <Empleado
            key={'as'}
            empresa={'e.empresa'}
            fecha={'asd'}
            numCoche={'asd'}
            descripcion={'asd'}
          />
        )}
      </Box>
    </>
  );
};

export default Home;
