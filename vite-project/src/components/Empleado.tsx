import React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import BasicCard from './Card';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { Props } from '../vite-env';
import { obtenerAsistenciaUID, obtenerDatosUsuario } from '../config/Firebase';
import { AuthContext } from '../context/setAuth';

interface NumList {
  empleado: Array<Perfil>;
  posicion?: Array<string>;
  mayor: Function;
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

const Empleado: React.FC<NumList> = ({ empleado, posicion, mayor }) => {
  const [asistencias, setAsistencias] = React.useState<CollectionData[]>([]);
  const context = React.useContext(AuthContext);
  const user = empleado[0];
  console.log(asistencias.length);
  mayor(asistencias.length);
  React.useEffect(() => {
    async function asistencias() {
      const q = await obtenerAsistenciaUID(user.uid);
      q.sort((a, b) => Number(a.fecha) - Number(b.fecha)); //Ordenando el array por fechas

      setAsistencias(q);
    }
    asistencias();
  }, []);
  // const color = menor === array.length ? 'error' : 'success';
  function nombre(nombre: string) {
    if (nombre.length > 13) return `${nombre.slice(0, 13)}...`;
    else return nombre;
  }
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1.5}
    >
      <div style={{ width: '150px' }}>
        <Badge badgeContent={'1'} color={'primary'}>
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
        asistencias.slice(0, 6).map((element) => (
          <BasicCard
            key={element.id}
            id={element.id}
            empresa={element.empresa.slice(0, 9)}
            fecha={dayjs(element.fecha).format('DD-MM-YYYY')}
            descripcion={element.descripcion.slice(0, 30)} //Limitando 30 caracteres
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
