import React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import BasicCard from './Card';

import Stack from '@mui/material/Stack';
import { Props } from '../vite-env';
import { obtenerDatosUsuario } from '../config/Firebase';
import { AuthContext } from '../context/setAuth';

interface NumList {
  empleado: string;
  array: Array<Props>;
  menor: number;
}
interface Perfil {
  nombre: string;
  avatar?: string;
}

const Empleado: React.FC<NumList> = ({ empleado, array, menor }) => {
  const context = React.useContext(AuthContext);
  const [user, setUser] = React.useState<Perfil>({ nombre: '' });
  React.useEffect(() => {
    obtenerDatosUsuario(empleado).then((evt: Perfil | any) => {
      setUser(evt[0]);
    });
  }, []);
  const color = menor === array.length ? 'error' : 'success';
  function nombre(nombre: string) {
    if (nombre.length > 13) return `${user.nombre.slice(0, 13)}...`;
    else return user.nombre;
  }
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1.5}
    >
      <Badge badgeContent={color === 'error' ? 'Siguiente' : '✔'} color={color}>
        <Avatar
          alt={user.nombre}
          src={user.avatar || user.nombre}
          sx={{
            width: 56,
            height: 56,
          }}
        />
      </Badge>
      <h3>{nombre(user.nombre)}</h3>
      {array.map((element) => (
        <BasicCard
          key={element.id}
          id={element.id}
          empresa={element.empresa.slice(0, 9)}
          fecha={element.fecha}
          descripcion={element.descripcion.slice(0, 30)} //Limitando 30 caracteres
          numCoche={element.numCoche}
          borrar={context?.user.uid === empleado}
        />
      ))}
    </Stack>
  );
};

export default Empleado;
