import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { crearUser } from '../helpers/firebaseActions';
import { AuthContext } from '../context/setAuth';
import { crearUsuario } from '../config/Firebase';

export default function Register() {
  const [user, setUser] = React.useState({
    email: '',
    nombre: '',
    apellido: '',
    password: '',
    repPass: '',
    uid: '',
  });

  const context = React.useContext(AuthContext);
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
  //   React.useEffect(() => {
  //     console.log(user);
  //   }, [user.uid]);
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
      });
    }
  }
  return (
    <>
      <h1>Registro de usuario</h1>
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
            id="outlined-password-input"
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
              user.password !== user.repPass
                ? 'El password debe ser el mismo.'
                : null
            }
          />
        </div>
        <div>
          <Button variant="contained" type="submit" sx={{ margin: '5px' }}>
            Registrarse
          </Button>
        </div>
        <small>Si ya tienes cuenta</small>
        <Button
          variant="text"
          onClick={() => {
            const usuarioprueba = {
              nombre: 'Chichi',
              apellido: 'delgado',
              uid: '2Rp1XW5icocUprorTnMp7pBKegT2',
            };
            crearUsuario(usuarioprueba);
          }}
        >
          Ingresa aquí
        </Button>
      </Box>
    </>
  );
}
