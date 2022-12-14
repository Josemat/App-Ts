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
import { Button } from '@mui/material';

function createData(
  numCoche: string,
  descripcion: string,
  empresa: string,
  fecha: string,
  uid: string
) {
  return { numCoche, descripcion, empresa, fecha, uid };
}
type CollectionData = {
  fecha: string;
  empresa: string;
  descripcion: string;
  numCoche: string;
  uid: string;
  id: string;
};
interface Perfil {
  nombre: string;
  avatar?: string;
  uid?: string;
}

export default function BuscarCoche() {
  const [coches, setCoches] = React.useState<CollectionData[]>([]);
  const [cocheBuscador, setCochebuscador] = React.useState<CollectionData[]>(
    []
  );
  const [empleado, setEmpleado] = React.useState<Perfil[]>([]);
  const [busca, setBusca] = React.useState<string>();
  React.useEffect(() => {
    async function datosCoche() {
      const datos = await obtenerAsistenciaCoche('1209');
      setCoches(datos);
      const res = await todosUsuarios();
      setEmpleado(res);
    }
    datosCoche();
  }, []);
  function empleadoNombre(uid: string) {
    const pepe = empleado?.filter((emp) => emp.uid === uid);
    if (pepe[0]) {
      const { nombre } = pepe[0];
      return nombre;
    } else {
      return 'Cargando...';
    }
  }
  function buscando(numero: string) {
    const resultado = coches.filter((col) => col.numCoche === numero);
    setCochebuscador(resultado);
  }
  return (
    <TableContainer component={Paper}>
      <TextField
        id="filled-basic"
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
            <TableCell align="right">Descripci??n</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Nombre y apellido</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!busca
            ? coches.map((row) => (
                <TableRow
                  key={row.descripcion}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.numCoche}
                  </TableCell>
                  <TableCell align="right">{row.descripcion}</TableCell>
                  <TableCell align="right">{row.fecha}</TableCell>
                  <TableCell align="right">
                    {empleado ? empleadoNombre(row.uid) : 'Sin nombre'}
                  </TableCell>
                </TableRow>
              ))
            : cocheBuscador.map((row) => (
                <TableRow
                  key={row.descripcion}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.numCoche}
                  </TableCell>
                  <TableCell align="right">{row.descripcion}</TableCell>
                  <TableCell align="right">{row.fecha}</TableCell>
                  <TableCell align="right">
                    {empleado ? empleadoNombre(row.uid) : 'Sin nombre'}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
