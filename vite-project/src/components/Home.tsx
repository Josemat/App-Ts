import React from 'react';
import BasicCard from './Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Home = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, mb: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <BasicCard
              empresa="ERSA"
              numCoche="1234"
              fecha="12/12/22"
              descripcion="Que loco esto que se escriba acá"
            />
          </Grid>
          <Grid item xs={2}>
            <BasicCard
              empresa="ERSA"
              numCoche="1234"
              fecha="12/12/22"
              descripcion="Que loco esto que se escriba acá"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
