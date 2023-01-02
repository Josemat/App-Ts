import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { crearUser, ingresarUser } from '../helpers/firebaseActions';
import { Link, useLocation } from 'wouter';
import { obtenerDatosUsuario } from '../config/Firebase';
import { AuthContext } from '../context/setAuth';
import Alertas from './Alertas';

interface Prop {
  variante: 'success' | 'warning' | 'info' | 'error';
  texto: string;
}

export default function Login() {
  const [user, setUser] = React.useState({ email: '', password: '' });
  const context = React.useContext(AuthContext);
  const [location, setLocation] = useLocation();
  const [componenteAlerta, setComponenteAlerta] = React.useState<Prop>({
    variante: 'info',
    texto: '',
  });

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
      setComponenteAlerta({
        variante: 'success',
        texto: `Te logueaste correctamente! se te redigirá a la pagina principal`,
      });
      setTimeout(() => {
        setLocation('/');
      }, 3000);
    } else {
      setComponenteAlerta({
        variante: 'error',
        texto: `Usuario o contraseña incorrecta`,
      });
      setTimeout(() => {
        setComponenteAlerta({ variante: 'error', texto: '' });
      }, 3000);
    }
  }
  return (
    <>
      <h1>Ingresar al sistema</h1>
      {componenteAlerta.texto ? (
        <Alertas
          variante={componenteAlerta.variante}
          texto={componenteAlerta.texto}
        />
      ) : null}
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
            label="Usuario"
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
      </Box>
    </>
  );
}
