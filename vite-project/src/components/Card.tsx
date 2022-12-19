import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { Props } from '../vite-env';
import { Borrar } from '../config/Firebase';
import { useLocation } from 'wouter';
export default function BasicCard(props: Props) {
  const [borrado, setBorrado] = React.useState(true);
  const handleDelete = () => {
    Borrar(props.id);
    setBorrado(false);
  };
  return (
    <>
      {borrado && (
        <Card sx={{ width: 150, height: 175 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 13 }}
              fontWeight="800"
              color="text.secondary"
              gutterBottom
            >
              {props.fecha}
            </Typography>
            <Typography variant="h6" noWrap={false} component="div">
              {props.empresa.toUpperCase()}
            </Typography>
            <Typography color="text.secondary">{props.numCoche}</Typography>
            <Typography variant="body2">{props.descripcion}</Typography>
            {props.borrar && (
              <Tooltip title="Borrar" placement="top-start">
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
