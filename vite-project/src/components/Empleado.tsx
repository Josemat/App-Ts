import React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import BasicCard from './Card';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { CollectionData, Perfil } from '../vite-env';
import { AuthContext } from '../context/setAuth';

interface PropsEmpleado {
  empleado: Array<Perfil>;
  mayor: number;
  menor: number;
  array: Array<CollectionData>;
}

const Empleado: React.FC<PropsEmpleado> = ({
  empleado,
  array,
  mayor,
  menor,
}) => {
  const context = React.useContext(AuthContext);
  const user = empleado[0];
  const asist = array
    .sort((a, b) => Number(b.fecha) - Number(a.fecha))
    .reverse(); //Ordenando el array por fechas
  function nombre(nombre: string) {
    if (nombre.length > 13) return `${nombre.slice(0, 8)}...`;
    else return nombre;
  }
  const color = menor === array.length ? 'error' : 'success';
  return (
    <Stack
      direction="column"
      justifyContent="flex-end"
      alignItems="center"
      spacing={1}
    >
      <div style={{ width: '150px', height: 200 }}>
        <Badge
          badgeContent={menor === array.length ? 'Siguiente' : '✔'}
          invisible={user.vacaciones === 'Si'}
          color={color}
        >
          <Avatar
            alt={user.nombre}
            src={
              user.avatar ||
              'http://ambiel.adv.br/wp-content/uploads/2021/07/avatar-user-1.jpg' ||
              user.nombre
            }
            sx={{
              width: 100,
              height: 100,
              mb: 0,
            }}
          />
        </Badge>
        <h2>{nombre(`${user.nombre}`)}</h2>
        <h3>{nombre(`${user.apellido}`)}</h3>
      </div>
      {user.vacaciones !== 'Si' ? (
        asist
          .slice(0, 6)
          .reverse()
          .map(
            (
              element // reemplazando el 6 por (array.length - menor + 1)
            ) => (
              <BasicCard
                key={element.id}
                id={element.id}
                empresa={element.empresa.slice(0, 9)}
                fecha={dayjs(element.fecha).format('DD/MM/YYYY')}
                descripcion={element.descripcion.slice(0, 25)} //Limitando 25 caracteres
                numCoche={element.numCoche}
                borrar={context?.user.uid === user.uid}
              />
            )
          )
      ) : (
        <BasicCard
          key={Math.random()}
          id={'vacacionesPagas(?'}
          empresa={'licencia'}
          fecha={'vacaciones'}
          descripcion={'No disponible'} //Limitando 30 caracteres
          numCoche={'🌴'}
          borrar={false}
        />
      )}
    </Stack>
  );
};

export default Empleado;
