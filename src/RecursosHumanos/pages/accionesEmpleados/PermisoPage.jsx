import { useState, useEffect } from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import {useNavigate, useParams } from "react-router-dom";
import { agregarPermiso, eliminarDocPermiso, eliminarPermiso } from '../../hooks';
import { cargarDatosEmpleado } from '../../helpers';
import { DataTableEmpleado, PermisoForm } from "../../components";
import { useForm } from "react-hook-form";
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado";
import PdfModal from "../../components/PdfModal";
import { DeleteForever, Description } from "@mui/icons-material";

export const PermisoPage = () => {
  const {reset } = useForm();
  const { cl } = useParams();
  const [Datos, setDatos] = useState({});
  const [Permisos, setPermisos] = useState([]);
  const [open, setOpen] = useState(false);
  const [Mensaje, setMensaje] = useState()
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [open2, setOpen2] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    cargarDatosEmpleado(cl, setDatos, setPermisos);
  }, [cl]);

  const handleEliminarVacacion = async (id,nombre) => {
    try {

      const responseDocEliminado = await eliminarDocPermiso(nombre)

      if(responseDocEliminado.status === 200){ 
        const response = await eliminarPermiso(id);
        if (response) {
          setMensaje("Permiso eliminado correctamente");
          setOpen(true);
          await cargarDatos();
        }
      }

    } catch (error) {
      console.error(`Error al intentar eliminar el día: ${error.message}`);
    }
  };

  const handleEditarDia = (id) => { 
        navigate(`/home/editarPermiso/${id}`)
        
  }

  const nuevosDatos = Permisos.map(permiso => ({
    id: permiso.id,
    observaciones: permiso.observaciones,
    nombre: permiso.empleado.nombre,
    nombreDoc: permiso.nombreImagen,
  }));

  const columns = [
    { name: 'id', label: 'id' },
    { name: 'observaciones', label: 'Observaciones' },
    { name: 'nombreDoc', label: 'Nombre archivo' },
    {
      name: 'descargar',
      label: 'Descargar Documento',
      options: {
        customBodyRender: (_, tableMeta) => (
          <Button
          onClick={() => openPdfModal(`http://localhost:3000/descargar/permisos/${tableMeta.rowData[2]}`)}
          style={{ textTransform: 'none' }} // Desactivar la transformación a mayúsculas
        >
          Ver documento
        </Button>
        ),
      },
    },
    {
      name: "acciones",
      label: "acciones",
      options: {
        customBodyRender: (_, tableMeta) => (
          <>
          <Button endIcon={<Description />}  sx={{mb:1}} fullWidth size="small"  variant="contained" onClick={() => handleEditarDia(tableMeta.rowData[0])}>
            Editar
          </Button>
          <Button endIcon={<DeleteForever />} size="small" fullWidth color="error"  variant="contained" onClick={() => handleEliminarVacacion(tableMeta.rowData[0],tableMeta.rowData[2])}>
            Eliminar
          </Button>
        </>
        ),
      },
    },
  ];

  const customOptions = {
    responsive: 'standard',
    selectableRows: 'none',
  };

  
  const handleSnackbarClose = () => {
    setOpen(false); 
    window.location.reload();
  };

  const openPdfModal = (pdfUrl) => {
    setSelectedPdfUrl(pdfUrl);
    setOpen2(true);
  };
  
  const closePdfModal = () => {
    setSelectedPdfUrl('');
    setOpen2(false);
  };


  const onSubmit = async (data) => {
    const datos = new FormData();
    datos.append('archivo', data.nombreImagen[0]);
    datos.append('nombreImagen', data.nombreImagen[0].name);
    datos.append('empleadoId', Datos.id);
    datos.append('observaciones', data.observaciones);
    datos.append('fechaPermiso', `${data.fechaPermiso}T00:00:00.000Z`);
    datos.append('fechaRegreso', `${data.fechaRegreso}T00:00:00.000Z`);

    try {
     const response = await agregarPermiso(datos);
     if(response ) {     
      setOpen(true);
      setMensaje("Permiso agregado correctamente");
  }
      // setOpen(true); // Mostrar Snackbar de éxito
    } catch (error) {
      if (error.message === 'Error al ingresar empleado') {
        // setOpenError(true); // Mostrar Snackbar de error (usuario duplicado)
      } else {
        console.error('Error al registrar usuario:', error);
      }
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" gutterBottom>
          Permisos
        </Typography>
      </Box>
      <PermisoForm onSubmit={onSubmit} handleReset={handleReset} Datos={Datos} />
      <Paper sx={{ mt: 5, padding: 2 }}>
        <DataTableEmpleado
          data={nuevosDatos}
          columns={columns}
          title="Mi Tabla"
          options={customOptions}
        />
      </Paper>
      <SnackbarPersonalizado open={open} onClose={handleSnackbarClose} mensaje={Mensaje} />
      <PdfModal open={open2} pdfUrl={selectedPdfUrl} onClose={closePdfModal} />
    </Container>
  );
};


