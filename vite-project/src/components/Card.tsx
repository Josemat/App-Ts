import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
interface Props {
  fecha: string;
  empresa: string;
  descripcion: string;
  numCoche: string;
}
export default function BasicCard(props: Props) {
  return (
    <Card sx={{ minWidth: 100 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Fecha: {props.fecha}
        </Typography>
        <Typography variant="h5" component="div">
          {props.empresa}
        </Typography>
        <Typography color="text.secondary">{props.numCoche}</Typography>
        <Typography variant="body2">{props.descripcion}</Typography>
      </CardContent>
    </Card>
  );
}
