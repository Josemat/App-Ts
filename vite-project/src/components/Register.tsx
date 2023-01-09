import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { crearUser } from '../helpers/firebaseActions';
import { AuthContext } from '../context/setAuth';
import { crearUsuario } from '../config/Firebase';
import { Link, useLocation } from 'wouter';
import Alertas from './Alertas';
interface Prop {
  variante: 'success' | 'warning' | 'info' | 'error';
  texto: string;
}
export default function Register() {
  const [user, setUser] = React.useState({
    email: '',
    nombre: '',
    apellido: '',
    password: '',
    repPass: '',
    uid: '',
    vacaciones: 'No',
  });

  const context = React.useContext(AuthContext);
  const [componenteAlerta, setComponenteAlerta] = React.useState<Prop>({
    variante: 'info',
    texto: '',
  });
  const [location, setLocation] = useLocation();
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
    const usuarioCreado = await crearUser(user);
    if (usuarioCreado) {
      setUser({ ...user, uid: usuarioCreado });
      crearUsuario({
        nombre: user.nombre,
        apellido: user.apellido,
        uid: usuarioCreado,
        avatar: '',
      });
      setComponenteAlerta({
        variante: 'success',
        texto:
          'Te registraste correctamente! serás redirigido a la página de login',
      });
      setTimeout(() => {
        setLocation('/login');
      }, 3000);
    }
  }
  return (
    <>
      {componenteAlerta.texto ? (
        <Alertas
          variante={componenteAlerta.variante}
          texto={componenteAlerta.texto}
        />
      ) : null}
      <h1>Registro de usuario nuevo</h1>
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
            value={user.nombre}
            onChange={handleChange}
          />
          <TextField
            sx={InputStyle}
            required
            variant="filled"
            id="apellido"
            type="apellido"
            name="apellido"
            label="Apellido"
            value={user.apellido}
            onChange={handleChange}
          />
          <TextField
            sx={InputStyle}
            required
            variant="filled"
            id="user"
            type="email"
            name="email"
            label="Correo electrónico"
            value={user.email}
            onChange={handleChange}
          />
          <TextField
            sx={InputStyle}
            id="outlined-password"
            label="Password"
            name="password"
            variant="filled"
            required
            value={user.password}
            helperText={
              user.password.length < 6
                ? 'Debe contener al menos 6 carácteres'
                : 'Perfecto!'
            }
            onChange={handleChange}
            type="password"
            autoComplete="current-password"
          />
          <TextField
            sx={InputStyle}
            id="outlined-repPass-input"
            label="Repita password"
            name="repPass"
            variant="filled"
            required
            defaultValue={user.repPass}
            onChange={handleChange}
            type="password"
            error={user.password !== user.repPass}
            helperText={
              user.password !== user.repPass ? 'El password no coincide.' : null
            }
          />
        </div>
        <div>
          <Button
            variant="contained"
            type="submit"
            // disabled={user.password !== user.repPass}
            color={user.password !== user.repPass ? 'error' : 'primary'}
            sx={{ margin: '5px' }}
          >
            Registrarse
          </Button>
        </div>
        <small>Si ya tienes cuenta</small>
        <Link href="/login">
          <Button variant="text">Ingresa aquí</Button>
        </Link>
      </Box>
    </>
  );
}
