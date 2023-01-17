import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
import { AuthContext } from '../context/setAuth';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import {
  actualizarDatosUsuario,
  obtenerDatosUsuario,
} from '../config/Firebase';
import { Link, useLocation } from 'wouter';
type Perfil = {
  nombre: string;
  apellido?: string;
  avatar?: string;
  uid?: string;
  vacaciones: string;
  posicion?: number;
  email?: string | null | undefined;
};
function parser(user: Perfil[]): Perfil {
  const { nombre, apellido, avatar, uid, vacaciones, posicion } = user[0];
  return { nombre, apellido, avatar, uid, vacaciones };
}
const Perfil = () => {
  const [location, navigate] = useLocation();
  const context = React.useContext(AuthContext);
  const auth = getAuth();
  const [user, setUser] = React.useState<Perfil>({
    nombre: '',
    apellido: '',
    avatar: '',
    uid: '',
    vacaciones: '',
    email: auth.currentUser?.email,
  });
  if (!context?.user.nombre) navigate('/');
  // const [vacas, setVacas] = React.useState(user.vacaciones);
  // console.log(user);
  if (!user.nombre) {
    obtenerDatosUsuario(context?.user.uid).then((evt) => {
      if (Boolean(evt)) {
        setUser(parser(evt));
      }
    });
  }

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
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    actualizarDatosUsuario(user.uid, user);
    context?.login(user);
    if (user.email && auth.currentUser?.email !== user.email) {
      auth.currentUser?.email
        ? updateEmail(auth.currentUser, user.email)
        : null;
    }
    context?.setAlerta('success', 'Modificaste tu perfil correctamente!');
  }

  return (
    <>
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
            helperText={
              'Ingresa la URL de tu imagen que quieres para tu avatar'
            }
          />
          <TextField
            sx={InputStyle}
            variant="filled"
            id="email"
            type="email"
            name="email"
            label={`Tu actual correo es: ${
              auth.currentUser?.email || 'cargando...'
            }`}
            value={user.email || ''}
            onChange={handleChange}
          />
          <FormControl sx={{ width: '70vw' }}>
            <InputLabel id="demo-simple-select-label">
              Vacaciones o licencia
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="vacaciones"
              value={user.vacaciones || 'No'}
              // disabled
              label="Vacaciones o licencia"
              onChange={handleChange}
            >
              <MenuItem value={'No'}>No</MenuItem>
              <MenuItem value={'Si'}>Si</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField // Acá podemos usar algun tipo de posicionamiento a futuro
            sx={InputStyle}
            variant="filled"
            id="posicion"
            type="posicion"
            name="posicion"
            // disabled
            label={`Tu posición actual es: ${context?.pos}`}
            value={context?.pos || '0'}
            onChange={handleChange}
          /> */}
        </div>
        <small>Deseas cambiar la contraseña</small>
        <Link href="/nuevacontrasena">
          <Button variant="text">cambiar aquí</Button>
        </Link>
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

export default Perfil;
