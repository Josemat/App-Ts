import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { AuthContext } from '../context/setAuth';
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { Link, useLocation } from 'wouter';

export default function NuevaContrasena() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [pass, newPass] = React.useState('');
  const [pass2, newPass2] = React.useState('');
  const context = React.useContext(AuthContext);
  const [location, setLocation] = useLocation();
  if (!context?.user.nombre) setLocation('/');
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
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (user)
      updatePassword(user, pass)
        .then(() => {
          // Update successful.
          context?.setAlerta(
            'success',
            'La contraseña se actualizó correctamente'
          );
        })
        .catch((error) => {
          context?.setAlerta(
            'error',
            error.message + ' serás redirigido a la página de login'
          );
          setTimeout(() => {
            setLocation('/login');
            context?.logOut();
          }, 3000);
        });
  }
  return (
    <>
      <h1>Cambiar Contraseña</h1>
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
            variant="filled"
            id="passNuevo"
            type="password"
            name="passNuevo"
            helperText={
              pass.length < 6
                ? 'La contraseña debe ser de al menos 6 caracteres'
                : 'Recuerda utilizar por lo menos una mayúscula y numeros'
            }
            label={`Cambiar contraseña`}
            value={pass || ''}
            onChange={(e) => newPass(e.target.value)}
          />
          <TextField
            sx={InputStyle}
            variant="filled"
            id="passNuevo2"
            type="password"
            name="passNuevo2"
            label={`Repite contraseña`}
            value={pass2 || ''}
            error={pass !== pass2}
            helperText={pass !== pass2 ? 'La contraseñas no coinciden' : null}
            onChange={(e) => newPass2(e.target.value)}
          />
        </div>
        <div>
          <Link href="/perfil">
            <Button
              variant="contained"
              type="submit"
              color={'primary'}
              sx={{ margin: '5px' }}
            >
              Cancelar
            </Button>
          </Link>
          <Button
            variant="contained"
            type="submit"
            disabled={pass !== pass2}
            color={pass !== pass2 ? 'error' : 'success'}
            sx={{ margin: '5px' }}
          >
            Cambiar Contraseña
          </Button>
        </div>
      </Box>
    </>
  );
}
