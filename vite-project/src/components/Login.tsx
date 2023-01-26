import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { crearUser, ingresarUser } from '../helpers/firebaseActions';
import { Link, useLocation } from 'wouter';
import { obtenerDatosUsuario } from '../config/Firebase';
import { AuthContext } from '../context/setAuth';

export default function Login() {
  const [user, setUser] = React.useState({ email: '', password: '' });
  const context = React.useContext(AuthContext);
  const [location, setLocation] = useLocation();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const usuarioLogueado = await ingresarUser(user).then((evt) =>
      obtenerDatosUsuario(evt)
    );
    if (usuarioLogueado[0]) {
      context?.login(usuarioLogueado[0]);
      context?.setAlerta(
        'success',
        `Te logueaste correctamente! se te redigirá a la pagina principal`
      );
      setTimeout(() => {
        setLocation('/');
      }, 3000);
    } else {
      context?.setAlerta('error', `Usuario o contraseña incorrecta`);
    }
  }
  return (
    <>
      <h1>Ingresar al sistema</h1>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            required
            id="emailLogin"
            type="email"
            name="email"
            label="Correo"
            value={user.email}
            onChange={handleChange}
          />
          <TextField
            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
            id="outlined-password-input"
            label="Password"
            name="password"
            required
            value={user.password}
            onChange={handleChange}
            type="password"
            autoComplete="current-password"
          />
        </div>
        <div>
          <Button variant="contained" type="submit" sx={{ margin: '5px' }}>
            Login
          </Button>
        </div>
        <small>Si no tienes cuenta</small>
        <Link href="/register">
          <Button variant="text">Registrate aquí</Button>
        </Link>
        <br />
        <small>¿Olvidaste la contraseña?</small>
        <Link href="/olvido">
          <Button variant="text">Recuperar contraseña</Button>
        </Link>
      </Box>
    </>
  );
}
