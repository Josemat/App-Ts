import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { AuthContext } from '../context/setAuth';
import {
  actualizarDatosUsuario,
  obtenerDatosUsuario,
} from '../config/Firebase';
import { Link } from 'wouter';
import Alertas from './Alertas';

interface Prop {
  variante: 'success' | 'warning' | 'info' | 'error';
  texto: string;
}

const Perfil = () => {
  const context = React.useContext(AuthContext);
  const [user, setUser] = React.useState({
    nombre: '',
    apellido: '',
    avatar: '',
    uid: '',
  });
  if (!user.nombre) {
    obtenerDatosUsuario(context?.user.uid).then((evt) => {
      if (evt) {
        setUser(evt);
      }
    });
  }

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
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    actualizarDatosUsuario(user.uid, user);
    context?.login(user);

    setComponenteAlerta({
      variante: 'success',
      texto: 'Modificaste tu perfil correctamente!',
    });
    setTimeout(() => {
      setComponenteAlerta({
        variante: 'success',
        texto: '',
      });
    }, 3000);
  }

  return (
    <>
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
            id="nombre"
            variant="filled"
            type="nombre"
            name="nombre"
            label="Nombre"
            value={user.nombre || ''}
            onChange={handleChange}
          />
          <TextField
            sx={InputStyle}
            variant="filled"
            id="apellido"
            type="apellido"
            name="apellido"
            label="Apellido"
            value={user.apellido || ''}
            onChange={handleChange}
          />
          <TextField
            sx={InputStyle}
            variant="filled"
            id="avatar"
            type="avatar"
            name="avatar"
            label="Avatar"
            value={user.avatar || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button
            variant="contained"
            type="submit"
            // disabled={user.password !== user.repPass}
            color="primary"
            sx={{ margin: '5px' }}
          >
            Guardar cambios
          </Button>
          <Link href="/">
            <Button
              variant="contained"
              // disabled={user.password !== user.repPass}
              color="primary"
              sx={{ margin: '5px' }}
            >
              Cancelar
            </Button>
          </Link>
        </div>
      </Box>
    </>
  );
};

export default Perfil;
