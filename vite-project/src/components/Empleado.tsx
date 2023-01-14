import React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import BasicCard from './Card';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { Props } from '../vite-env';
import { obtenerAsistenciaUID, obtenerDatosUsuario } from '../config/Firebase';
import { AuthContext } from '../context/setAuth';

interface PropsEmpleado {
  empleado: Array<Perfil>;
  posicion?: string | number;
  array: Array<CollectionData>;
}
interface Perfil {
  nombre: string;
  apellido?: string;
  avatar?: string;
  vacaciones?: string;
  posicion?: number;
  uid: string;
}
type CollectionData = {
  fecha: string;
  empresa: string;
  descripcion: string;
  numCoche: string;
  uid: string;
  id: string;
};

const Empleado: React.FC<PropsEmpleado> = ({ empleado, array, posicion }) => {
  const [asistencias, setAsistencias] = React.useState<CollectionData[]>(array);
  const context = React.useContext(AuthContext);
  const user = empleado[0];
  const asist = array.sort((a, b) => Number(a.fecha) - Number(b.fecha)); //Ordenando el array por fechas
  // React.useEffect(() => {
  //   setAsistencias(asist);
  // }, [array]);
  // const color = menor === array.length ? 'error' : 'success';
  function nombre(nombre: string) {
    if (nombre.length > 13) return `${nombre.slice(0, 13)}...`;
    else return nombre;
  }
  const color = posicion === array.length ? 'error' : 'success';
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1.5}
    >
      <div style={{ width: '150px' }}>
        <Badge badgeContent={posicion} color={'primary'}>
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
        asist.slice(0, 6).map((element) => (
          <BasicCard
            key={element.id}
            id={element.id}
            empresa={element.empresa.slice(0, 9)}
            fecha={dayjs(element.fecha).format('DD-MM-YYYY')}
            descripcion={element.descripcion.slice(0, 25)} //Limitando 25 caracteres
            numCoche={element.numCoche}
            borrar={context?.user.uid === user.uid}
          />
        ))
      ) : (
        <BasicCard
          key={Math.random()}
          id={'vacacionesPagas(?'}
          empresa={'Vacaciones'}
          fecha={'vacaciones'}
          descripcion={'Vacaciones'} //Limitando 30 caracteres
          numCoche={'0000'}
          borrar={false}
        />
      )}
    </Stack>
  );
};

export default Empleado;
