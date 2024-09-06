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
  const color = menor === array.length ? 'error' : 'success';
  function diferencia(num: number) {
    const difer = Math.abs(orden - num);

    // console.log(
    //   empleado[0].nombre,
    //   difer > 5 ? 1 : `difer: ${difer ? 7 - difer : difer}`
    // );
    return difer >= 6 ? 1 : difer ? 7 - difer : difer;

    // return orden - num;
  }
  let ventana = window.innerWidth > 800 ? 0 : 2;
  let badgeHeight = window.innerWidth > 800 ? 250 : 200;
  return (
    <Stack
      direction={{ sm: 'column', xs: 'row' }}
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
      sx={{
        backgroundColor: '#c3c3c3',
        marginTop: ventana,
        borderRadius: 5,
        padding: 1,
      }}
    >
      <div
        style={{
          width: 150,
          height: badgeHeight,
          marginTop: 5,
        }}
      >
        <Badge
          badgeContent={
            menor === array.length
              ? dayjs(asist[0].fecha).format('DD / MMM ')
              : `${dayjs(asist[0].fecha).format('DD / MMM')} ✔`
          }
          invisible={user.vacaciones === 'Si'}
          color={color}
        >
          <Avatar
            alt={user.nombre}
            src={user.avatar || user.nombre}
            sx={{
              width: 100,
              height: 100,
              mb: 0,
              mt: 1,
            }}
          />
        </Badge>
        <h2 style={{ marginTop: '10px', marginBottom: '3px' }}>
          {nombre(`${user.nombre}`)}
        </h2>
        {window.screen.width > 800 ? (
          <h3 style={{ margin: '10px' }}>
            Asistencias
            <h4 style={{ margin: '10px' }}>
              {`${dayjs().year()} `}(
              {
                array.filter(
                  (a) =>
                    Number(dayjs(a.fecha).format('YYYY')) ===
                    Number(dayjs().year())
                ).length
              }
              )
            </h4>
            <h4 style={{ margin: '10px' }}>Total:{array.length} </h4>
          </h3>
        ) : (
          <>
            <h4 style={{ margin: '10px' }}>Total:{array.length} </h4>
          </>
        )}
      </div>
      {window.screen.width > 600 ? (
        user.vacaciones !== 'Si' ? (
          asist
            .slice(0, diferencia(array.length) || 7)
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
        )
      ) : (
        ''
      )}
    </Stack>
  );
};

export default Empleado;
