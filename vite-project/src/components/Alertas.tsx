import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { jsx } from '@emotion/react';

interface Prop {
  variante: 'success' | 'warning' | 'info' | 'error';
  texto: string;
}
export default function Alertas(variables: Prop) {
  const { variante, texto } = variables;
  const [tipoAlerta, setTipoAlerta] = React.useState(variante);
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={tipoAlerta}>{texto}</Alert>
    </Stack>
  );
}
