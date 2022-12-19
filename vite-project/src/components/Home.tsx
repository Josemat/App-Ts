import * as React from 'react';
import BasicCard from './Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { db, obtenerAsistencias } from '../config/Firebase';
import Empleado from './Empleado';
import { Pipo, Props } from '../vite-env';

const Home = () => {
  const [res, setRes] = React.useState<object[]>([]);
  const [empleados, setEmpleados] = React.useState<string[]>([]);
  React.useEffect(() => {
    const llamadaFirebase = async () => {
      const response = await obtenerAsistencias();
      setRes(response);
      const eso = response.map((el: Props | any) => el.uid);
      const empleadosUnicos = [...new Set(eso)];
      setEmpleados(empleadosUnicos);
    };
    llamadaFirebase();
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          {Boolean(res.length) &&
            empleados.map((emp) => (
              <Empleado
                key={emp}
                empleado={emp}
                array={res.filter((el: any) => el.uid === emp)}
              />
            ))}
        </Stack>
      </Box>
    </>
  );
};

export default Home;
