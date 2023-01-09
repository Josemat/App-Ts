import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { db, obtenerAsistencias, todosUsuarios } from '../config/Firebase';
import Empleado from './Empleado';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type Perfil = {
  nombre: string;
  apellido?: string;
  avatar?: string;
  vacaciones?: string;
  posicion?: number;
  uid: string;
};

const Home = () => {
  const [res, setRes] = React.useState<Perfil[]>([]);
  const [empleados, setEmpleados] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(true);
  const [arr, setArr] = React.useState([]);
  // console.log(arr);
  React.useEffect(() => {
    const llamadaFirebase = async () => {
      const response = await todosUsuarios();
      setRes(response);
      const data: Array<string> = [];
      response.forEach((el) => data.push(el.uid as string));
      setEmpleados(data);
    };
    llamadaFirebase();
  }, []);
  // const arraysEmpleados = empleados.map((emp) =>
  //   res.filter((el) => el.uid === emp)
  // );
  // const menor = Math.min(...arraysEmpleados.map((arr) => arr.length));
  // const mayor = Math.max(...arraysEmpleados.map((arr) => arr.length));

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Stack
          direction="column-reverse"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          {true ? (
            empleados.map((emp) => (
              <Empleado
                key={emp}
                empleado={res.filter((el) => el.uid === emp)}
                mayor={setArr}
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
