import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import useAppState from "../../auth/hooks/estado";
import { commonValidationRules } from "../helpers/rules";
import { AgregarRequisicion, trarRequisiciones, editarRequisicion, eliminarRequisicion } from "../hooks";
import { Alert, Box, Button, Container, Grid, Snackbar, Typography, Paper, Stack, IconButton  } from "@mui/material";
import { useForm } from "react-hook-form";
import { DataTableEmpleado} from "../components";
import { InputField } from "../components/formularios/InpuetField";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Requisiciones = () => {
  const { usuario, id } = useAppState();
  const { control, handleSubmit, reset, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [requisiciones, setRequisiciones] = useState([]);
  const [editingRequisitionId, setEditingRequisitionId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    cargarRequisiciones();
  }, [id]);

  const cargarRequisiciones = async () => {
    try {
      const requisicionesUsuario = await trarRequisiciones(id);
      setRequisiciones(requisicionesUsuario.data);
    } catch (error) {
      console.error("Error al obtener requisiciones:", error);
    }
  };

  const eliminarRequisicionComponente = async (id) => {
    try {
      await eliminarRequisicion(id);
      setOpen(true);
      setAlertMessage("Requisición eliminada correctamente");
      cargarRequisiciones();
    } catch (error) {
      console.error("Error al eliminar la requisición:", error);
    }
  };

  const handleEditRequisition = async (id) => {
    try {
      setEditingRequisitionId(id);
      const requisicion = requisiciones.find(requisicion => requisicion.id === id);
      if (requisicion) {
        setEditData(requisicion);
        // Establecer los valores predeterminados en los campos del formulario
        setValue("material", requisicion.material);
        setValue("nivelImportancia", requisicion.nivelImportancia);
      } else {
        console.error(`No se encontró la requisición con ID ${id}`);
      }
    } catch (error) {
      console.error("Error al editar la requisición:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingRequisitionId(null);
    setEditData(null);
    // Limpiar los valores en los campos del formulario
    reset();
  };

  const handleFormSubmit = async (data) => {
    try {
      const jsonData = {
        material: data.material,
        nivelImportancia: data.nivelImportancia,
        usuarioId: id 
      };
  
      if (editingRequisitionId) {
        await editarRequisicion(editingRequisitionId, jsonData);
        setAlertMessage("Requisición editada correctamente");
      } else {
        await AgregarRequisicion(jsonData);
        setAlertMessage("Requisición agregada correctamente");
      }
      setOpen(true);
      cargarRequisiciones();
      setEditingRequisitionId(null);
      setEditData(null);
      reset(); // Limpiar los valores en los campos del formulario
    } catch (error) {
      console.error("Error al agregar/editar requisición:", error);
    }
  };
  const columns = [
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
      name: 'createAt', 
      label: 'Fecha de pedido',
      options: {
        customBodyRender: (value) => format(new Date(value), 'dd/MM/yyyy')
      }
    },
    { name: 'status', label: 'Status' },
    {
      name: 'actions',
      label: 'Acciones',
      options: {
        customBodyRender: (value, tableMeta) => (
          <Stack direction="column" spacing={1}>
            <IconButton 
                aria-label="editar" 
                size="small" 
                onClick={() => handleEditRequisition(tableMeta.rowData[0])} // Corregir el índice aquí
                sx={{ color: 'success.main' }} 
                >
                <EditIcon />
                </IconButton>
                <IconButton 
                aria-label="eliminar" 
                size="small" 
                onClick={() => eliminarRequisicionComponente(tableMeta.rowData[0])}
                sx={{ color: 'error.main' }}
                >
                <DeleteIcon />
                </IconButton>
          </Stack>
        )
      }
    }
  ];

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
          Datos de Requisición
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <InputField name="material" label="Material" rules={commonValidationRules} control={control} defaultValue={editData ? editData.material : ""} />
          <InputField name="nivelImportancia" label="Nivel de Importancia" rules={commonValidationRules} control={control} defaultValue={editData ? editData.nivelImportancia : ""} />
          <InputField name="usuario" disabled={true} label="Usuario" defaultValue={usuario} control={control} />
        </Grid>
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
            {editingRequisitionId ? "Editar" : "Enviar"}
          </Button>
          <Button type="button" onClick={handleCancelEdit} sx={{ mr: 2 }} variant="contained" color="secondary">
            Cancelar
          </Button>
          <Link to="/home">
            <Button type="button" variant="contained" color="secondary">
              Regresar
            </Button>
          </Link>
        </Box>
      </form>
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
          columns={columns}
          title="Mis requisiciones"
          options={customOptions}
        />
      </Paper>
    </Container>
  );
};
