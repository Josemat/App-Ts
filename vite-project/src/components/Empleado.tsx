import React from 'react';
import Avatar from '@mui/material/Avatar';
import BasicCard from './Card';

import Stack from '@mui/material/Stack';
import { Props } from '../vite-env';
import { obtenerDatosUsuario } from '../config/Firebase';
import { AuthContext } from '../context/setAuth';

interface NumList {
  empleado: string;
  array: Array<object>;
}
interface Perfil {
  nombre?: string;
  avatar?: string;
}

const Empleado: React.FC<NumList> = ({ empleado, array }) => {
  const context = React.useContext(AuthContext);
  const [user, setUser] = React.useState({
    nombre: '',
    avatar: '',
  });
  React.useEffect(() => {
    obtenerDatosUsuario(empleado).then((evt: Perfil | any) => {
      setUser(evt);
    });
  }, []);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      sx={{ backgroundColor: '#333', paddingTop: 0.5, borderRadius: 2 }}
    >
      <Avatar alt={user.nombre} src={user.avatar} />
      <h3>{user.nombre}</h3>
      {array.map((element: any) => (
        <BasicCard
          key={element.id}
          id={element.id}
          empresa={element.empresa}
          fecha={element.fecha}
          descripcion={element.descripcion}
          numCoche={element.numCoche}
          borrar={context?.user.uid === empleado}
        />
      ))}
    </Stack>
  );
};

export default Empleado;
