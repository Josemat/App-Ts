import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { db, obtenerAsistencias } from '../config/Firebase';
import Empleado from './Empleado';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

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
  const [open, setOpen] = React.useState(true);
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
          direction="column-reverse"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          {Boolean(res.length) ? (
            empleados.map((emp) => (
              <Empleado
                key={emp}
                empleado={emp}
                array={res.filter((el) => el.uid === emp)}
                menor={menor}
              />
            ))
          ) : (
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default Home;
