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
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

export default function BuscarCoche() {
  const [coches, setCoches] = React.useState<CollectionData2[]>([]);
  const [location, navigate] = useLocation();
  const [cocheBuscador, setCochebuscador] = React.useState<CollectionData2[]>(
    []
  );
  const [empleado, setEmpleado] = React.useState<Perfil[]>([]);
  const [busca, setBusca] = React.useState<string>();
  const context = React.useContext(AuthContext);

  const asistenciasAnioPasado = coches.filter(
    (asis) => Number(dayjs(asis.fecha).format('YYYY')) === 2023
  );
  function buscarCocheGrafico2023(empresa: string, mes: number): number {
    let coche = asistenciasAnioPasado.filter(
      (asi) =>
        asi.empresa == empresa && Number(dayjs(asi.fecha).format('MM')) == mes
    ).length;
    return coche;
  }
  function buscarCocheGrafico(empresa: string, mes: number): number {
    let coche = coches
      .filter(
        (asis) =>
          Number(dayjs(asis.fecha).format('YYYY')) === Number(dayjs().year())
      )
      .filter(
        (asi) =>
          asi.empresa == empresa && Number(dayjs(asi.fecha).format('MM')) == mes
      ).length;
    return coche;
  }
  const data2023 = [
    {
      name: 'Enero',
      Ersa: buscarCocheGrafico2023('ERSA', 0o1),
      Tamse: buscarCocheGrafico2023('TAMSE', 0o1),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 0o1),
    },
    {
      name: 'Febrero',
      Ersa: buscarCocheGrafico2023('ERSA', 0o2),
      Tamse: buscarCocheGrafico2023('TAMSE', 0o2),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 0o2),
    },
    {
      name: 'Marzo',
      Ersa: buscarCocheGrafico2023('ERSA', 0o3),
      Tamse: buscarCocheGrafico2023('TAMSE', 0o3),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 0o3),
    },
    {
      name: 'Abril',
      Ersa: buscarCocheGrafico2023('ERSA', 0o4),
      Tamse: buscarCocheGrafico2023('TAMSE', 0o4),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 0o4),
    },
    {
      name: 'Mayo',
      Ersa: buscarCocheGrafico2023('ERSA', 0o5),
      Tamse: buscarCocheGrafico2023('TAMSE', 0o5),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 0o5),
    },
    {
      name: 'Junio',
      Ersa: buscarCocheGrafico2023('ERSA', 0o6),
      Tamse: buscarCocheGrafico2023('TAMSE', 0o6),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 0o6),
    },
    {
      name: 'Julio',
      Ersa: buscarCocheGrafico2023('ERSA', 0o7),
      Tamse: buscarCocheGrafico2023('TAMSE', 0o7),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 0o7),
    },
    {
      name: 'Agosto',
      Ersa: buscarCocheGrafico2023('ERSA', 8),
      Tamse: buscarCocheGrafico2023('TAMSE', 8),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 8),
    },
    {
      name: 'Septiembre',
      Ersa: buscarCocheGrafico2023('ERSA', 9),
      Tamse: buscarCocheGrafico2023('TAMSE', 9),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 9),
    },
    {
      name: 'Octubre',
      Ersa: buscarCocheGrafico2023('ERSA', 10),
      Tamse: buscarCocheGrafico2023('TAMSE', 10),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 10),
    },
    {
      name: 'Noviembre',
      Ersa: buscarCocheGrafico2023('ERSA', 11),
      Tamse: buscarCocheGrafico2023('TAMSE', 11),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 11),
    },
    {
      name: 'Diciembre',
      Ersa: buscarCocheGrafico2023('ERSA', 12),
      Tamse: buscarCocheGrafico2023('TAMSE', 12),
      Coniferal: buscarCocheGrafico2023('CONIFERAL', 12),
    },
  ];
  const data = [
    {
      name: 'Enero',
      Ersa: buscarCocheGrafico('ERSA', 0o1),
      Tamse: buscarCocheGrafico('TAMSE', 0o1),
      Coniferal: buscarCocheGrafico('CONIFERAL', 0o1),
    },
    {
      name: 'Febrero',
      Ersa: buscarCocheGrafico('ERSA', 0o2),
      Tamse: buscarCocheGrafico('TAMSE', 0o2),
      Coniferal: buscarCocheGrafico('CONIFERAL', 0o2),
    },
    {
      name: 'Marzo',
      Ersa: buscarCocheGrafico('ERSA', 0o3),
      Tamse: buscarCocheGrafico('TAMSE', 0o3),
      Coniferal: buscarCocheGrafico('CONIFERAL', 0o3),
    },
    {
      name: 'Abril',
      Ersa: buscarCocheGrafico('ERSA', 0o4),
      Tamse: buscarCocheGrafico('TAMSE', 0o4),
      Coniferal: buscarCocheGrafico('CONIFERAL', 0o4),
    },
    {
      name: 'Mayo',
      Ersa: buscarCocheGrafico('ERSA', 0o5),
      Tamse: buscarCocheGrafico('TAMSE', 0o5),
      Coniferal: buscarCocheGrafico('CONIFERAL', 0o5),
    },
    {
      name: 'Junio',
      Ersa: buscarCocheGrafico('ERSA', 0o6),
      Tamse: buscarCocheGrafico('TAMSE', 0o6),
      Coniferal: buscarCocheGrafico('CONIFERAL', 0o6),
    },
    {
      name: 'Julio',
      Ersa: buscarCocheGrafico('ERSA', 0o7),
      Tamse: buscarCocheGrafico('TAMSE', 0o7),
      Coniferal: buscarCocheGrafico('CONIFERAL', 0o7),
    },
    {
      name: 'Agosto',
      Ersa: buscarCocheGrafico('ERSA', 8),
      Tamse: buscarCocheGrafico('TAMSE', 8),
      Coniferal: buscarCocheGrafico('CONIFERAL', 8),
    },
    {
      name: 'Septiembre',
      Ersa: buscarCocheGrafico('ERSA', 9),
      Tamse: buscarCocheGrafico('TAMSE', 9),
      Coniferal: buscarCocheGrafico('CONIFERAL', 9),
    },
    {
      name: 'Octubre',
      Ersa: buscarCocheGrafico('ERSA', 10),
      Tamse: buscarCocheGrafico('TAMSE', 10),
      Coniferal: buscarCocheGrafico('CONIFERAL', 10),
    },
    {
      name: 'Noviembre',
      Ersa: buscarCocheGrafico('ERSA', 11),
      Tamse: buscarCocheGrafico('TAMSE', 11),
      Coniferal: buscarCocheGrafico('CONIFERAL', 11),
    },
    {
      name: 'Diciembre',
      Ersa: buscarCocheGrafico('ERSA', 12),
      Tamse: buscarCocheGrafico('TAMSE', 12),
      Coniferal: buscarCocheGrafico('CONIFERAL', 12),
    },
  ];

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
      <h2>Asistencias 2023</h2>
      <Container sx={{ backgroundColor: '', height: '40vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={500}
            data={data2023}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={'Ersa'} stroke={'#ff0000'} />
            <Line type="monotone" dataKey="Tamse" stroke="#00eeff" />
            <Line type="monotone" dataKey="Coniferal" stroke="#aca139" />
          </LineChart>
        </ResponsiveContainer>
      </Container>
      <h2>Asistencias 2024</h2>
      <Container sx={{ backgroundColor: '', height: '40vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={500}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={'Ersa'} stroke={'#ff0000'} />
            <Line type="monotone" dataKey="Tamse" stroke="#00eeff" />
            <Line type="monotone" dataKey="Coniferal" stroke="#aca139" />
          </LineChart>
        </ResponsiveContainer>
      </Container>
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
              ? coches
                  .map((row) => (
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
                  .slice(0, 50)
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
