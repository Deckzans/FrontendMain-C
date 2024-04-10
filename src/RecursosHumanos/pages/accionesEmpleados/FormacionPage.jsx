import { Box, Button, Container, Paper, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { agregarFormacion } from "../../hooks/useAgregarFormacion";
import { cargarFormacion } from "../../helpers";
import { DataTableEmpleado } from "../../components";
import { FormacionForm } from "../../components/formsCompletos/FormacionForm";
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado";
import PdfModal from "../../components/PdfModal";
import { eliminarDocFormacion, eliminarFormacionm } from "../../hooks";
import { DeleteForever, Description } from "@mui/icons-material";

export const FormacionPage = () => {
  const { control, handleSubmit, reset } = useForm();
  const { cl } = useParams();
  const [Datos, setDatos] = useState({})
  const [Formacion, setFormacion] = useState([])
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [Mensaje, setMensaje] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    cargarFormacion(cl, setDatos, setFormacion)
  }, [cl]);

  const handleEliminarVacacion = async (id, nombre) => {
    try {

      const responseDocEliminado = await eliminarDocFormacion(nombre)
      if (responseDocEliminado.status === 200) {

        const response = await eliminarFormacionm(id);
        if (response) {
          setMensaje("Formacion eliminada correctamente");
          setOpen(true);
          await cargarDatos();
        }
      }
    } catch (error) {
      console.error(`Error al intentar eliminar el día: ${error.message}`);
    }
  };

  const handleEditarDia = (id) => {
    navigate(`/home/editarFormacion/${id}`)

  }

  const nuevosDatos = Formacion.map(forma => {
    const fecha = new Date(forma.fechaCarga);
    fecha.setDate(fecha.getDate() + 1); // Sumar un día
    const fechaFormateada = fecha.toLocaleDateString('es-ES'); // Formatear la fecha
    return {
      id: forma.id,
      observaciones: forma.observaciones,
      fechaCarga: fechaFormateada,
      nombreDoc: forma.nombreArchivo,
    };
  });

  const columns = [
    { name: 'id', label: 'id' },
    { name: 'observaciones', label: 'observaciones' },
    { name: 'fechaCarga', label: 'Fecha de carga' },
    { name: 'nombreDoc', label: 'Nombre archivo' },
    {
      name: 'descargar',
      label: 'Descargar Documento',
      options: {
        customBodyRender: (_, tableMeta) => (
          <Button
            onClick={() => openPdfModal(`http://localhost:3000/descargar/formacion/${tableMeta.rowData[3]}`)}
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
            <Button endIcon={<Description />} sx={{ mb: 1 }} fullWidth size="small" variant="contained" onClick={() => handleEditarDia(tableMeta.rowData[0])}>
              Editar
            </Button>
            <Button endIcon={<DeleteForever />} size="small" fullWidth color="error" variant="contained" onClick={() => handleEliminarVacacion(tableMeta.rowData[0],tableMeta.rowData[3])}>
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
    datos.append('archivo', data.nombreArchivo[0])
    datos.append('nombreArchivo', data.nombreArchivo[0].name)
    datos.append('empleadoId', Datos.id)
    datos.append('observaciones', data.observaciones)
    datos.append('fechaCarga', `${data.fechaCarga}T00:00:00.000Z`)

    try {
      const response = await agregarFormacion(datos);

      if (response) {
        setMensaje("Formacion agregada correctamente");
        setOpen(true);
      }

    } catch (error) {
      if (error.message === 'Error al ingresar empleado') {
        // setOpenError(true); // Mostrar Snackbar de error (usuario duplicado)
      } else {
        console.error('Error al registrar usuario:', error);
      }
    }
  }

  const handleReset = () => {
    reset();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" gutterBottom>
          Formación
        </Typography>
      </Box>
      <FormacionForm onSubmit={onSubmit} handleReset={handleReset} Datos={Datos} />
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
  )
}
