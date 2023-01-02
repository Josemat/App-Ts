import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { db, obtenerAsistencias } from '../config/Firebase';
import Empleado from './Empleado';

type CollectionData = {
  fecha: string;
  empresa: string;
  descripcion: string;
  numCoche: string;
  uid: string;
  id: string;
};

const Home = () => {
  const [res, setRes] = React.useState<CollectionData[]>([]);
  const [empleados, setEmpleados] = React.useState<string[]>([]);
  React.useEffect(() => {
    const llamadaFirebase = async () => {
      const response = await obtenerAsistencias();
      setRes(response);
      const eso = response.map((el) => el.uid);
      const empleadosUnicos = [...new Set(eso)];
      setEmpleados(empleadosUnicos);
    };
    llamadaFirebase();
  }, []);
  const arraysEmpleados = empleados.map((emp) =>
    res.filter((el) => el.uid === emp)
  );
  const menor = Math.min(...arraysEmpleados.map((arr) => arr.length));
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
                array={res.filter((el) => el.uid === emp)}
                menor={menor}
              />
            ))}
        </Stack>
      </Box>
    </>
  );
};

export default Home;
