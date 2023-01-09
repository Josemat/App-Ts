import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import { Props } from '../vite-env';
import { Borrar } from '../config/Firebase';

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
                <Chip
                  sx={{ mt: 0.5 }}
                  label="Eliminar"
                  onClick={handleDelete}
                  onDelete={handleDelete}
                  deleteIcon={<DeleteIcon />}
                />
              </Tooltip>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
