import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { AuthContext } from '../context/setAuth';
import { Link } from 'wouter';
import Alertas from './Alertas';
import { crearAsistencia } from '../config/Firebase';

interface Prop {
  variante: 'success' | 'warning' | 'info' | 'error';
  texto: string;
}

const NuevaAsistencia = () => {
  const context = React.useContext(AuthContext);
  let fecha = new Intl.DateTimeFormat('es-AR').format(Date.now());
  const [asistencia, setAsistencia] = React.useState({
    fecha: '' || fecha,
    empresa: '',
    descripcion: '',
    numCoche: '',
    uid: '' || context?.user.uid,
  });

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
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    crearAsistencia(asistencia);

    setComponenteAlerta({
      variante: 'success',
      texto: 'Se guardó exitosamente!',
    });
    setTimeout(() => {
      setComponenteAlerta({
        variante: 'success',
        texto: '',
      });
      setAsistencia({
        fecha: '' || fecha,
        empresa: '',
        descripcion: '',
        numCoche: '',
        uid: '' || context?.user.uid,
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
          <TextField
            sx={InputStyle}
            id="fecha"
            variant="filled"
            type="fecha"
            name="fecha"
            label="Fecha"
            value={asistencia.fecha || ''}
            onChange={handleChange}
          />
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
