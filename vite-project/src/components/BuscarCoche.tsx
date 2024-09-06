import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { obtenerAsistenciaCoche, todosUsuarios } from '../config/Firebase';
import dayjs from 'dayjs';
import { useLocation } from 'wouter';
import { AuthContext } from '../context/setAuth';
import { CollectionData2, Perfil } from '../vite-env';
import { Container } from '@mui/material';

export default function BuscarCoche() {
  const [coches, setCoches] = React.useState<CollectionData2[]>([]);
  const [location, navigate] = useLocation();
  const [cocheBuscador, setCochebuscador] = React.useState<CollectionData2[]>(
    []
  );
  const [empleado, setEmpleado] = React.useState<Perfil[]>([]);
  const [busca, setBusca] = React.useState<string>();
  const context = React.useContext(AuthContext);

  if (!context?.user.nombre) navigate('/');
  React.useEffect(() => {
    async function datosCoche() {
      const datos = await obtenerAsistenciaCoche();
      setCoches(datos);
      const res = await todosUsuarios();
      setEmpleado(res);
    }
    datosCoche();
  }, []);
  function empleadoNombre(uid: string) {
    const pepe = empleado?.filter((emp) => emp.uid === uid);
    if (pepe[0]) {
      const { nombre, apellido } = pepe[0];
      return `${nombre},${apellido}`;
    } else {
      return 'Cargando...';
    }
  }
  function buscando(numero: string) {
    const resultado: CollectionData2[] = coches
      .filter((a) => a.numCoche.includes(numero))
      .sort((a, b) => Number(a.numCoche) - Number(b.numCoche));
    console.log(resultado);
    setCochebuscador(resultado);
  }
  return (
    <>
      {/* <Container sx={{ backgroundColor: 'green', height: '50vh' }}>
        {' '}
        probando la wea cosmica
      </Container> */}
      <h2>Búsqueda e historial de asistencias</h2>
      <TableContainer component={Paper}>
        <TextField
          id="filled-basic"
          type="number"
          label="Buscar coche"
          variant="standard"
          value={busca || ''}
          onChange={(e) => {
            setBusca(e.target.value);
            buscando(e.target.value);
          }}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Coche</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Empresa</TableCell>
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="center">Creado el</TableCell>
              <TableCell align="right">Nombre y apellido</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!busca
              ? coches.map((row) => (
                  <TableRow
                    key={Math.random()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.numCoche}
                    </TableCell>
                    <TableCell align="left">{row.descripcion}</TableCell>
                    <TableCell align="left">{row.empresa}</TableCell>
                    <TableCell align="right">
                      {dayjs(row.fecha).format('DD/MM/YY')}
                    </TableCell>
                    <TableCell align="center">
                      {dayjs(row.createdAt).format('DD/MM HH:mm')}
                    </TableCell>
                    <TableCell align="right">
                      {empleado ? empleadoNombre(row.uid) : 'Sin nombre'}
                    </TableCell>
                  </TableRow>
                ))
              : cocheBuscador.map((row) => (
                  <TableRow
                    key={Math.random()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.numCoche}
                    </TableCell>
                    <TableCell align="right">{row.descripcion}</TableCell>
                    <TableCell align="right">
                      {dayjs(row.fecha).format('DD/MM/YY')}
                    </TableCell>
                    <TableCell align="right">
                      {empleado ? empleadoNombre(row.uid) : 'Sin nombre'}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
