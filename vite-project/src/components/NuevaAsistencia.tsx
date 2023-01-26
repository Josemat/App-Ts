import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from '@mui/material';
import { AuthContext } from '../context/setAuth';
import { Link, useLocation } from 'wouter';
import { crearAsistencia } from '../config/Firebase';
import { LocalizationProvider } from '@mui/x-date-pickers';

const NuevaAsistencia = () => {
  let fecha = new Intl.DateTimeFormat('en-US').format(Date.now());
  const context = React.useContext(AuthContext);
  const [location, navigate] = useLocation();
  const [fech, setFech] = React.useState<Dayjs | null>(dayjs(fecha));
  const [asistencia, setAsistencia] = React.useState({
    fecha: '' || fech?.format('YYYYMMDD'),
    empresa: 'Otra',
    descripcion: '',
    numCoche: '',
    uid: '' || context?.user.uid,
    createdAt: Date.now(),
  });

  if (!context?.user.nombre) navigate('/');

  const InputStyle = {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
    backgroundColor: 'white',
    borderRadius: '5px',
  };
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setAsistencia({
      ...asistencia,
      [e.target.name]: e.target.value,
      createdAt: Date.now(),
    });
  }
  const handleChangeFecha = (newValue: Dayjs | null) => {
    setFech(newValue);
    setAsistencia({ ...asistencia, fecha: newValue?.format('YYYYMMDD') });
  };
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    crearAsistencia(asistencia);

    context?.setAlerta('success', 'Se guardó exitosamente!');
    setAsistencia({
      fecha: fecha,
      empresa: '',
      descripcion: '',
      numCoche: '',
      uid: '' || context?.user.uid,
      createdAt: 0,
    });
  }

  return (
    <>
      <h2>Creación de asistencias</h2>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            width: '70vw',
          },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="DD/MM/YYYY"
              value={fech}
              onChange={handleChangeFecha}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <div>
            <FormControl>
              <FormLabel id="empresa">Empresa</FormLabel>
              <RadioGroup
                sx={{ mt: 2, mb: 2 }}
                aria-labelledby="empresa"
                row
                name="empresa"
                value={asistencia.empresa}
                defaultValue={'Otra'}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="ERSA"
                  control={<Radio />}
                  label="ERSA"
                />
                <FormControlLabel
                  value="TAMSE"
                  control={<Radio />}
                  label="TAMSE"
                />
                <FormControlLabel
                  value="CONIFERAL"
                  control={<Radio />}
                  label="CONIFERAL"
                />
                <FormControlLabel
                  value="Otra"
                  control={<Radio />}
                  label="Otra"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {/* <TextField
            sx={InputStyle}
            variant="filled"
            id="empresa"
            required
            type="empresa"
            name="empresa"
            label="Empresa"
            value={asistencia.empresa.toUpperCase() || ''}
            onChange={handleChange}
          /> */}
          <TextField
            sx={InputStyle}
            variant="filled"
            required
            id="numCoche"
            type="number"
            name="numCoche"
            label="Número de coche"
            value={asistencia.numCoche || ''}
            onChange={handleChange}
          />
          <TextField
            sx={InputStyle}
            variant="filled"
            id="descripcion"
            type="descripcion"
            name="descripcion"
            label="Descripcion"
            value={asistencia.descripcion || ''}
            onChange={handleChange}
            multiline
          />
        </div>
        <div>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{ margin: '5px' }}
          >
            Guardar cambios
          </Button>
          <Link href="/">
            <Button variant="contained" color="primary" sx={{ margin: '5px' }}>
              Cancelar
            </Button>
          </Link>
        </div>
      </Box>
    </>
  );
};
export default NuevaAsistencia;
