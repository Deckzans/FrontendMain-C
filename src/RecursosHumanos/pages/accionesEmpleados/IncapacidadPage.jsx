import { useEffect, useState } from "react";
import { Box, Container, Paper, Typography, Modal, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { cargarDatosEmpleadoInca } from "../../helpers";
import { agregarIncapacidad, eliminarDocIncapacidad, eliminarIncapacidad } from "../../hooks/";
import { DataTableEmpleado, IncapacidadForm } from "../../components";
import { useForm } from "react-hook-form";
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado";
import PdfModal from "../../components/PdfModal";
import { DeleteForever, Description } from "@mui/icons-material";

export const IncapacidadPage = () => {
  console.log('me renderizo')
  const { reset } = useForm();
  const { cl } = useParams();
  const [Datos, setDatos] = useState({});
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [Mensaje, setMensaje] = useState()
  const [Incapacidades, setIncapacidades] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarDatosEmpleadoInca(cl, setDatos, setIncapacidades);
  }, [cl]);

  const handleEliminarVacacion = async (id,nombre) => {
    try {

      const responseDocEliminado = await eliminarDocIncapacidad(nombre)
      if(responseDocEliminado.status === 200){
        const response = await eliminarIncapacidad(id);
        if (response) {
          setOpen(true);
          setMensaje("Incapacidad eliminada correctamente");
          await cargarDatos();
        }
      }
    } catch (error) {
      console.error(`Error al intentar eliminar el día: ${error.message}`);
    }
  };

  const handleEditarDia = (id) => { 
        navigate(`/home/editarIncapacidad/${id}`)
        
  }

  const nuevosDatos = Incapacidades.map((incapacidad) => ({
    id: incapacidad.id,
    incapacidad: incapacidad.observaciones,
    tipo: incapacidad.tipo,
    nombre: incapacidad.empleado.nombre,
    nombreDoc: incapacidad.nombreImagen,
  }));

  const columns = [
    { name: 'id', label: 'id' },
    { name: 'incapacidad', label: 'incapacidad' },
    { name: 'tipo', label: 'tipo' },
    { name: 'nombreDoc', label: 'Nombre archivo' },
    {
      name: 'previsualizar',
      label: 'Documento',
      options: {
        customBodyRender: (_, tableMeta) => (
          <Button
            onClick={() => openPdfModal(`http://localhost:3000/descargar/incapacidad/${tableMeta.rowData[3]}`)}
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
          <Button endIcon={<DeleteForever />} size="small" fullWidth color="error"  variant="contained" onClick={() => handleEliminarVacacion(tableMeta.rowData[0],tableMeta.rowData[3])}>
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

  const onSubmit = async (data) => {
    const datos = new FormData();
    datos.append('archivo', data.nombreImagen[0]);
    datos.append('nombreImagen', data.nombreImagen[0].name);
    datos.append('empleadoId', Datos.id);
    datos.append('observaciones', data.observaciones);
    datos.append('tipo', data.tipo);
    datos.append('diasIncapacitado', parseInt(data.diasIncapacitado));
    datos.append('fechaIncapacidad', `${data.fechaIncapacidad}T00:00:00.000Z`);

    try {
      const response = await agregarIncapacidad(datos);
      if (response) {
        setMensaje("Incapacidad Agregada correctamente");
        setOpen(true);
      }
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

  const openPdfModal = (pdfUrl) => {
    setSelectedPdfUrl(pdfUrl);
    setOpen2(true);
  };

  const closePdfModal = () => {
    setSelectedPdfUrl('');
    setOpen2(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" gutterBottom>
          Incapacidad
        </Typography>
      </Box>
      <IncapacidadForm onSubmit={onSubmit} handleReset={handleReset} Datos={Datos} />
      <Paper sx={{ mt: 5, padding: 2 }}>
        <DataTableEmpleado data={nuevosDatos} columns={columns} title="Mi Tabla" options={customOptions} />
      </Paper>
      <SnackbarPersonalizado open={open} onClose={handleSnackbarClose} mensaje={Mensaje} />

      {/* Modal para la previsualización del PDF */}
      <PdfModal open={open2} pdfUrl={selectedPdfUrl} onClose={closePdfModal} />
    </Container>
  );
};
