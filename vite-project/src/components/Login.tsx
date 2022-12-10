import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { crearUser, ingresarUser } from '../helpers/firebaseActions';
import { Link } from 'wouter';

export default function Login() {
  const [user, setUser] = React.useState({ email: '', password: '' });
  const [usuario, setUsuario] = React.useState<string | void>('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    ingresarUser(user).then((evt) => setUsuario(evt));
    if (usuario) {
      console.log(usuario);
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
