import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BasicCard from './Card';
import { Avatar } from '@mui/material';
interface Prop {
  empresa: string;
  fecha: string;
  numCoche: string;
  descripcion: string;
}
const Empleado = (props: Prop) => {
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
