import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BasicCard from './Card';
import { Props } from '../vite-env';

const Empleado = (props: Props) => {
  // console.log(props);
  const mapFromASD = (res: Array<any>): Array<Props> => {
    return res.map((evt) => {
      const { fecha, empresa, numCoche, descripcion } = evt;

      return {
        fecha,
        empresa,
        numCoche,
        descripcion,
      };
    });
  };
  const { empresa, fecha, numCoche, descripcion } = props;
  return (
    <Box sx={{ flexGrow: 1, mb: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <BasicCard
            empresa={empresa}
            fecha={fecha}
            descripcion={descripcion}
            numCoche={numCoche}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Empleado;
