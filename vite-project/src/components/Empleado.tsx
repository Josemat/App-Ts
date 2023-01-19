import React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import BasicCard from './Card';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { CollectionData, Perfil } from '../vite-env';
import { obtenerAsistenciaUID, obtenerDatosUsuario } from '../config/Firebase';
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
    .sort((a, b) => Number(a.fecha) - Number(b.fecha))
    .reverse(); //Ordenando el array por fechas
  console.log(array);
  console.log(asist);
  function nombre(nombre: string) {
    if (nombre.length > 13) return `${nombre.slice(0, 13)}...`;
    else return nombre;
  }
  const color = menor === array.length ? 'error' : 'success';
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1.5}
    >
      <div style={{ width: '150px' }}>
        <Badge
          badgeContent={menor === array.length ? 'Siguiente' : '✔'}
          invisible={user.vacaciones === 'Si'}
          color={color}
        >
          <Avatar
            alt={user.nombre}
            src={user.avatar || user.nombre}
            sx={{
              width: 56,
              height: 56,
            }}
          />
        </Badge>
        <h3>{nombre(`${user.nombre}`)}</h3>
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
                fecha={dayjs(element.fecha).format('DD-MM-YYYY')}
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
