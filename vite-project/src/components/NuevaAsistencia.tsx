import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from '@mui/material';
import { AuthContext } from '../context/setAuth';
import { Link, useLocation } from 'wouter';
import Alertas from './Alertas';
import { crearAsistencia } from '../config/Firebase';
import { LocalizationProvider } from '@mui/x-date-pickers';

interface Prop {
  variante: 'success' | 'warning' | 'info' | 'error';
  texto: string;
}

const NuevaAsistencia = () => {
  let fecha = new Intl.DateTimeFormat('en-US').format(Date.now());
  const context = React.useContext(AuthContext);
  const [location, navigate] = useLocation();
  const [fech, setFech] = React.useState<Dayjs | null>(dayjs(fecha));
  const [asistencia, setAsistencia] = React.useState({
    fecha: '' || fech?.format('YYYYMMDD'),
    empresa: '',
    descripcion: '',
    numCoche: '',
    uid: '' || context?.user.uid,
  });
  if (!context?.user.nombre) navigate('/');
  const [componenteAlerta, setComponenteAlerta] = React.useState<Prop>({
    variante: 'info',
    texto: '',
  });
  const InputStyle = {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
    backgroundColor: 'white',
    borderRadius: '5px',
  };
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setAsistencia({ ...asistencia, [e.target.name]: e.target.value });
  }
  const handleChangeFecha = (newValue: Dayjs | null) => {
    setFech(newValue);
    setAsistencia({ ...asistencia, fecha: newValue?.format('YYYYMMDD') });
  };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    crearAsistencia(asistencia);

    setComponenteAlerta({
      variante: 'success',
      texto: 'Se guardó exitosamente!',
    });
    setAsistencia({
      fecha: fecha,
      empresa: '',
      descripcion: '',
      numCoche: '',
      uid: '' || context?.user.uid,
    });
    setTimeout(() => {
      setComponenteAlerta({
        variante: 'success',
        texto: '',
      });
    }, 4000);
  }

  return (
    <>
      <h2>Creación de asistencias</h2>
      {componenteAlerta.texto ? (
        <Alertas
          variante={componenteAlerta.variante}
          texto={componenteAlerta.texto}
        />
      ) : null}
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            width: '70vw',
          },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="DD/MM/YYYY"
              value={fech}
              onChange={handleChangeFecha}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            sx={InputStyle}
            variant="filled"
            id="empresa"
            type="empresa"
            name="empresa"
            label="Empresa"
            value={asistencia.empresa.toUpperCase() || ''}
            onChange={handleChange}
          />
          <TextField
            sx={InputStyle}
            variant="filled"
            id="numCoche"
            type="number"
            name="numCoche"
            label="Número de coche"
            value={asistencia.numCoche || ''}
            onChange={handleChange}
          />
          <TextField
            sx={InputStyle}
            variant="filled"
            id="descripcion"
            type="descripcion"
            name="descripcion"
            label="Descripcion"
            value={asistencia.descripcion || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{ margin: '5px' }}
          >
            Guardar cambios
          </Button>
          <Link href="/">
            <Button variant="contained" color="primary" sx={{ margin: '5px' }}>
              Cancelar
            </Button>
          </Link>
        </div>
      </Box>
    </>
  );
};
export default NuevaAsistencia;
