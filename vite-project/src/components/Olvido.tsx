import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link, useLocation } from 'wouter';
import { AuthContext } from '../context/setAuth';

export default function Olvido() {
  const context = React.useContext(AuthContext);
  const [user, setUser] = React.useState({ email: '' });
  const [location, setLocation] = useLocation();
  const auth = getAuth();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        context?.setAlerta(
          'success',
          `Se te envió un correo con las indicaciones`
        );
        setTimeout(() => {
          setLocation('/');
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        context?.setAlerta('error', errorMessage);
      });
  }
  return (
    <>
      <h1>Recuperar contraseña</h1>
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
            aria-required
            name="email"
            label="usuario@ejemplo.com"
            value={user.email}
            helperText={
              'Ingrese su correo electrónico para recuperar la contraseña'
            }
            onChange={handleChange}
          />
        </div>
        <div>
          <Button variant="contained" type="submit" sx={{ margin: '5px' }}>
            Recuperar
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
