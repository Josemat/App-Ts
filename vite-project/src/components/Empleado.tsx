import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BasicCard from './Card';
const Empleado = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <BasicCard
            empresa="ERSA"
            fecha="12/12/22"
            descripcion="Que loco esto que se escriba acá"
            numCoche="1234"
          />
        </Grid>
        <Grid item xs={2}>
          <BasicCard
            empresa="ERSA"
            fecha="12/12/22"
            descripcion="Que loco esto que se escriba acá"
            numCoche="1234"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Empleado;
