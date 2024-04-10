import { useState, useEffect } from "react";
import { format } from 'date-fns';
import { obtenerTodasLasRequisiciones, editarRequisicion } from "../hooks";
import { Alert, Box, Container, Snackbar, Typography, Paper, Stack, FormControl, MenuItem, Select } from "@mui/material";
import { DataTableEmpleado } from "../components";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

export const RequisicionesTable = () => {
  const [open, setOpen] = useState(false);
  const [requisiciones, setRequisiciones] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    cargarRequisiciones();
  }, []);

  const cargarRequisiciones = async () => {
    try {
      const requisicionesTodas = await obtenerTodasLasRequisiciones();
      console.log('Respuesta de obtenerTodasLasRequisiciones:', requisicionesTodas);
      if (requisicionesTodas) {
        setRequisiciones(requisicionesTodas);
      } else {
        console.error("No se recibieron requisiciones");
      }
    } catch (error) {
      console.error("Error al obtener requisiciones:", error);
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const data = { status: nuevoEstado };
      await editarRequisicion(id, data);
      setOpen(true);
      setAlertMessage("Estado de la requisición actualizado correctamente");
      cargarRequisiciones();
    } catch (error) {
      console.error("Error al actualizar el estado de la requisición:", error);
    }
  };

  const customOptions = {
    responsive: 'standard',
    selectableRows: 'none',
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box textAlign="center" mt={2}>
        <Typography variant="h5" gutterBottom>
          Requisiciones
        </Typography>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
      <Paper sx={{ mt: 5, padding: 2 }}>
        <DataTableEmpleado
          data={requisiciones} 
          columns={columns(actualizarEstado)}
          title="Tabla de requisiciones"
          options={customOptions}
        />
      </Paper>
    </Container>
  );
};

const columns = (actualizarEstado) => [
  { name: 'id', label: 'Identificador' },
  { name: 'material', label: 'Material' },
  { name: 'nivelImportancia', label: 'Nivel de importancia' },
  { 
    name: 'usuario', 
    label: 'Nombre del Requisidor',
    options: {
      customBodyRender: (value) => value.nombre
    }
  },
  { 
    name: 'usuario', 
    label: 'Área del Requisidor',
    options: {
      customBodyRender: (value) => value.area
    }
  },
  { 
    name: 'createAt', 
    label: 'Fecha de pedido',
    options: {
      customBodyRender: (value) => format(new Date(value), 'dd/MM/yyyy')
    }
  },
  { 
    name: 'status', 
    label: 'Status',
    options: {
      customBodyRender: (value, tableMeta) => (
        <FormControl>
          <Select
            value={value || "No realizada"} 
            onChange={(event) => actualizarEstado(tableMeta.rowData[0], event.target.value)}
          >
            <MenuItem value="No realizada"><ClearIcon /> No realizada</MenuItem>
            <MenuItem value="Realizada"><DoneIcon /> Realizada</MenuItem>
          </Select>
        </FormControl>
      )
    }
  }
];
