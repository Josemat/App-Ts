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
import { Button, Container } from '@mui/material';
import {
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
type PieTy = { name: string; value: number };

export default function BuscarCoche() {
  let fecha = new Intl.DateTimeFormat('en-US').format(Date.now());
  const [nCoche, setNcoche] = React.useState<number | undefined>();
  const [protoPaginacion, setProtoPaginacion] = React.useState<number>(25);
  const [disabled, setDisabled] = React.useState(true);
  const [cargando, setCargando] = React.useState<boolean>(true);
  const [coches, setCoches] = React.useState<CollectionData2[]>([]);
  const [location, navigate] = useLocation();
  const [cocheBuscador, setCochebuscador] = React.useState<CollectionData2[]>(
    []
  );
  const [pie, setPie] = React.useState<PieTy[]>([]);
  const [resultado, setResultado] = React.useState(['']);
  const [resultadoCoche, setResultadoCoche] = React.useState(['']);
  const [empleado, setEmpleado] = React.useState<Perfil[]>([]);
  const [busca, setBusca] = React.useState<boolean>(false);
  const [buscaMes, setBuscaMes] = React.useState<Number>(1);
  const [fech1, setFech1] = React.useState<Dayjs | null>(dayjs(fecha));
  const [fech2, setFech2] = React.useState<Dayjs | null>(dayjs(fecha));
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
    // console.log('Usando DB!');
  }, []);
  React.useEffect(() => {
    setCargando(false);
    setTimeout(() => {
      setCargando(true);
    }, 2000);
  }, [nCoche]);
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
    // console.log(resultado);
    setTimeout(() => {
      setCochebuscador(resultado);
    }, 1000);
  }
  // console.log(coches);
  const handleChangeFechaInicio = (newValue: Dayjs | null) => {
    setFech1(newValue);
  };
  const handleChangeFechaFin = (newValue: Dayjs | null) => {
    setFech2(newValue);
  };
  // console.log(fech1?.format('YYYYMMDD'));
  // console.log(fech2?.format('YYYYMMDD'));
  function buscandoMes() {
    if (fech1 && fech2) {
      setBusca(!busca);
      setBuscaMes(0);
      const resultado: CollectionData2[] = coches.filter(
        (a) =>
          a.fecha >= fech1.format('YYYYMMDD') &&
          a.fecha <= fech2.format('YYYYMMDD')
      );

      const cochesTotales = resultado
        .map((a) => Number.parseInt(a.numCoche))
        .sort();
      const empresasTotales = resultado.map((a) => a.empresa);
      // const cochesUnicos = [...new Set(cochesTotales)];

      const countCoches: { [key: number]: number } = {};
      cochesTotales.forEach(function (i) {
        countCoches[i] = (countCoches[i] || 0) + 1;
      });
      const countEmpresas: { [key: string]: number } = {};
      empresasTotales.forEach(function (i) {
        countEmpresas[i] = (countEmpresas[i] || 0) + 1;
      });
      if (cochesTotales.length) mostrarDatos(countEmpresas);
      if (empresasTotales.length) mostrarDatosCoche(countCoches);
      // console.log(countCoches);

      setCochebuscador(resultado);
    }
  }
  function mostrarDatosCoche(objeto: { [key: number]: number }) {
    const sortable = Object.entries(objeto)
      .filter(([a]) => a !== '0')
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    const pruebamcia = sortable.map((a) => {
      return { name: a[0], value: a[1] };
    });
    setPie(pruebamcia);
    sortable.map((a) => resultadoCoche.push(`${a[0]}: ${a[1]}`));
    // for (const propiedad in objeto) {
    //   resultadoCoche.push(`${propiedad}: ${objeto[propiedad]}`);
    // }
  }
  function mostrarDatos(objeto: { [key: number | string]: number }) {
    for (const propiedad in objeto) {
      resultado.push(`${propiedad}: ${objeto[propiedad]}`);
    }
  }
  function reset() {
    setNcoche(0);
    setBusca(false), setResultado([]), setResultadoCoche([]);
    setFech1(dayjs(Date.now())), setFech2(dayjs(Date.now()));
    setDisabled(!disabled);
    setBuscaMes(1);
  }
  return (
    <>
      {/* <h2>Asistencias 2023</h2>
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
      </Container> */}
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
      <h2>Búsqueda por período</h2>
      <h3>{`Desde:${fech1?.format('DD/MM/YY')} Hasta:${fech2?.format(
        'DD/MM/YY'
      )}`}</h3>
      <Container sx={{ backgroundColor: '', minHeight: '40vh' }}>
        <div
          style={{
            backgroundColor: '',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <div
            style={{
              padding: '10px',
              backgroundColor: '',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  minDate={dayjs('2023')}
                  maxDate={dayjs(fecha)}
                  label={'Mes y año'}
                  inputFormat="DD/MM/YYYY"
                  value={fech1}
                  onChange={handleChangeFechaInicio}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  minDate={dayjs(fech1)}
                  maxDate={dayjs(fecha)}
                  label={'Mes y año'}
                  inputFormat="DD/MM/YYYY"
                  value={fech2}
                  onChange={handleChangeFechaFin}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div style={{ display: 'flex' }}>
              <Button onClick={() => reset()}>Resetear</Button>
              <Button
                onClick={() => {
                  buscandoMes(), setDisabled(!disabled);
                }}
                disabled={
                  fech2?.format('DDMMYY') == fech1?.format('DDMMYY') ||
                  !disabled
                }
              >
                Aplicar filtro
              </Button>
            </div>
          </div>
          <div>
            <h2>Empresas:</h2>
            {resultado.length ? (
              <ul style={{ textAlign: 'left' }}>
                {resultado.map((a) => (
                  <li key={a.toString()}>{a}</li>
                ))}
              </ul>
            ) : (
              <></>
            )}
          </div>
          <div>
            <h2>Colectivos:</h2>
            {resultadoCoche.length ? (
              <ul style={{ textAlign: 'left' }}>
                {resultadoCoche.map((a) => (
                  <li>{a}</li>
                ))}
              </ul>
            ) : (
              <></>
            )}
          </div>
          <div
            style={{
              backgroundColor: '',
            }}
          >
            {' '}
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                data={pie}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                label
                labelLine={false}
              />
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </Container>
      <h2>Búsqueda e historial de asistencias</h2>
      <TableContainer component={Paper}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5px',
          }}
        >
          <TextField
            id="filled-basic"
            type="number"
            label="Buscar coche"
            variant="outlined"
            disabled={!buscaMes}
            value={nCoche}
            onChange={(e) => {
              setBusca(!busca);
              buscando(e.target.value);
              setNcoche(Number(e.target.value));
            }}
          />
          <Button onClick={() => reset()}>Resetear</Button>
        </div>

        {cargando ? (
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
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
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
                    .slice(0, protoPaginacion)
                : cocheBuscador.map((row) => (
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
                  ))}
            </TableBody>
          </Table>
        ) : (
          'Cargando...'
        )}
      </TableContainer>
      <Button onClick={() => setProtoPaginacion(protoPaginacion + 25)}>
        Ver mas
      </Button>
    </>
  );
}
