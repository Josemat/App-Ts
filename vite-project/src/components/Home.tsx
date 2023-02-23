import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  db,
  obtenerAsistenciaCoche,
  todosUsuarios,
  retorno,
} from '../config/Firebase';
import Empleado from './Empleado';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import dayjs from 'dayjs';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { CollectionData, CollectionData2, Perfil } from '../vite-env';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type EmpOrden = {
  empl: string | undefined;
  posi: number;
};
const Home = () => {
  const [res, setRes] = React.useState<Perfil[]>([]);
  const [asistencias, setAsistencias] = React.useState<CollectionData2[]>([]);
  const [empleados, setEmpleados] = React.useState<string[]>([]);
  const [empleadoPos, setEmpleadoPos] = React.useState<EmpOrden[]>([]);
  const [open, setOpen] = React.useState(true);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [infoAlerta, setInfoAlerta] = React.useState({
    apellido: '',
    numCoche: '',
    empresa: '',
    creada: 0,
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  React.useEffect(() => {
    const llamadaFirebase = async () => {
      const response = await todosUsuarios();
      setRes(response);
      const data: Array<string> = [];
      response.forEach((el) => data.push(el.uid as string));
      setEmpleados(data);
      // const datos = await obtenerAsistenciaCoche(); // Desact esto
      // setAsistencias(datos); //
    };
    llamadaFirebase();
    const q = query(
      collection(db, 'Asistencias'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dato: CollectionData[] = [];
      querySnapshot.forEach((doc) => {
        dato.push(retorno(doc.data(), doc.id) as CollectionData);
      });
      setAsistencias(dato);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  function ordenn() {
    if (empleados.length) {
      const asistLenght = empleados
        .map((emp) => {
          return asistencias.filter((el) => el.uid === emp);
        })
        .sort((a, b) => a.length - b.length);
      const datosOrdenados = asistLenght.sort((a, b) => a.length - b.length);
      for (let pos = 0; datosOrdenados.length > pos; pos++) {
        const empleado = datosOrdenados[pos].find((arr) => arr.uid);
        setEmpleadoPos((prevState) => [
          ...prevState,
          { empl: empleado?.uid, posi: pos + 1 },
        ]);
      }
    }
  }
  React.useEffect(() => {
    if (asistencias.length) {
      const infoEmpleado = res.filter((el) => el.uid === asistencias[0].uid);
      setInfoAlerta({
        apellido: infoEmpleado[0].apellido,
        numCoche: asistencias[0].numCoche,
        empresa: asistencias[0].empresa,
        creada: asistencias[0].createdAt || 0,
      });
      setOpenAlert(true);
      setEmpleadoPos([]);
      ordenn();
    }
  }, [asistencias]);
  const arraysEmpleados = empleados.map((emp) =>
    asistencias.filter((el) => el.uid === emp)
  );
  const menor = Math.min(...arraysEmpleados.map((arr) => arr.length));
  const mayor = Math.max(...arraysEmpleados.map((arr) => arr.length));
  function filtrado(empUID: string) {
    const user = empleadoPos.filter((el) => el.empl === empUID);
    if (user.length) {
      const { empl, posi } = user[0];
      return posi;
    }
    return 1;
  }
  return (
    <>
      <Container>
        <Box sx={{}}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
          >
            {asistencias.length ? (
              empleados.map((emp) => (
                <Empleado
                  key={emp}
                  empleado={res.filter((el) => el.uid === emp)}
                  array={asistencias.filter((el) => el.uid === emp)}
                  orden={mayor}
                  menor={menor}
                />
              ))
            ) : (
              <Backdrop
                sx={{
                  color: '#fff',
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
            {asistencias.length ? (
              <Snackbar
                open={openAlert}
                autoHideDuration={15000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              >
                <Alert
                  onClose={handleClose}
                  severity="info"
                  sx={{ width: '100%' }}
                >
                  Última asistencia creada por {infoAlerta.apellido},{' '}
                  {infoAlerta.numCoche} de {infoAlerta.empresa} el{' '}
                  {dayjs(infoAlerta.creada).format('DD/MM/YY HH:mm:ss')}
                </Alert>
              </Snackbar>
            ) : null}
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Home;
