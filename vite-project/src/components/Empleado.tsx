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
  orden: number;
  menor: number;
  array: Array<CollectionData>;
}

const Empleado: React.FC<PropsEmpleado> = ({
  empleado,
  array,
  orden,
  menor,
}) => {
  const context = React.useContext(AuthContext);
  const user = empleado[0];
  const asist = array.sort((a, b) => Number(b.fecha) - Number(a.fecha));
  //.reverse() //Ordenando el array por fechas se puede invertrir el orden
  function nombre(nombre: string) {
    if (nombre.length > 13) return `${nombre.slice(0, 8)}...`;
    else return nombre;
  }
  const color =
    user.vacaciones === 'Si'
      ? menor === array.length
        ? 'error'
        : 'success'
      : menor + 1 === array.length
      ? 'error'
      : 'success';
  function diferencia(num: number) {
    return orden - num;
  }
  return (
    <Stack
      direction="column"
      justifyContent="flex-end"
      alignItems="center"
      spacing={1}
    >
      <div style={{ width: '150px', height: 200 }}>
        <Badge
          badgeContent={
            user.vacaciones === 'Si'
              ? menor === array.length
                ? 'Siguiente'
                : '✔'
              : menor + 1 === array.length
              ? 'Siguiente'
              : '✔'
          }
          invisible={user.vacaciones === 'i'}
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
        <h3>
          {nombre(`${user.apellido}`)}
          <small> ({array.length})</small>
        </h3>
      </div>
      {user.vacaciones !== 'S' ? (
        asist
          .slice(0, 6 - diferencia(array.length) || 6)
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
          descripcion={'No disponible'}
          numCoche={'🌴🌴🌴🌴'}
          borrar={false}
        />
      )}
    </Stack>
  );
};

export default Empleado;
