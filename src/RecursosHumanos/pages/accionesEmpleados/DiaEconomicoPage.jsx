import { Box, Button, Container, Paper, Typography } from "@mui/material"
import {useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { agregarDia } from "../../hooks/useAgregarDia";
import { cargarDatosDia } from "../../helpers";
import { DataTableEmpleado, DiaForm } from "../../components";
import { SnackbarPersonalizado } from "../../../layout/Components/SnackBarPersonalizado";
import { eliminarDia, eliminarDocDia } from "../../hooks";
import { DeleteForever,Description } from "@mui/icons-material";
import PdfModal from "../../components/PdfModal";


export const DiaEconomicoPage = () => {
  const { cl } = useParams();
  const [Datos, setDatos] = useState({})
  const [DiaEconomico, setDiaEconomico] = useState([])
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [Mensaje, setMensaje] = useState()
  const navigate = useNavigate();
  
  useEffect(() => {
    cargarDatosDia(cl, setDatos, setDiaEconomico)
  }, [cl]);

  const cargarDatos = async () => {
    await cargarDatosDia(cl, setDatos, setDiaEconomico);
  };

  const handleEliminarDia = async (id,nombre) => {
    try {

      const responseDocEliminado = await eliminarDocDia(nombre)
      if(responseDocEliminado.status === 200){ 
        const response = await eliminarDia(id);
        if (response) {
          setOpen(true);
          setMensaje("Día eliminado correctamente");
          await cargarDatos();
        }
      }

    } catch (error) {
      console.error(`Error al intentar eliminar el día: ${error.message}`);
    }
  };

  const handleEditarDia = (id) => { 
        navigate(`/home/editardocdia/${id}`)
        
  }

  const nuevosDatos = DiaEconomico.map(dia => ({
    id: dia.id,
    observaciones: dia.observaciones,
    diasTotales: dia.diasTotales,
    fechaDiasRestantes: dia.fechaDiasRestantes,
    nombreDoc: dia.nombreImagen,
  }))

  const columns = [
    { name: 'id', label: 'id' },
    { name: 'observaciones', label: 'observaciones' },
    { name: 'diasTotales', label: 'dias Totales' },
    { name: 'fechaDiasRestantes', label: 'Dias Restantes' },
    { name: 'nombreDoc', label: 'Nombre archivo' },
    {
      name: 'descargar',
      label: 'Documento',
      options: {
        customBodyRender: (_, tableMeta) => (
          <Button
          onClick={() => openPdfModal(`http://localhost:3000/descargar/dia/${tableMeta.rowData[4]}`)}
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
          <Button endIcon={<DeleteForever />} size="small" fullWidth color="error"  variant="contained" onClick={() => handleEliminarDia(tableMeta.rowData[0],tableMeta.rowData[4])}>
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
    datos.append('archivo', data.nombreImagen[0])
    datos.append('nombreImagen', data.nombreImagen[0].name)
    datos.append('empleadoId', Datos.id)
    datos.append('observaciones', data.observaciones)
    datos.append('fechaDiasRestantes', parseInt(data.fechaDiasRestantes))
    datos.append('diasTotales', parseInt(data.diasTotales))
    datos.append('fechaDias', `${data.fechaDias}T00:00:00.000Z`)
    try {
      const response = await agregarDia(datos);

      if(response ) {     
            setMensaje("Dia agregado correctamente");
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

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 5 }}>
      <Box textAlign="center" mt={5}>
        <Typography variant="h5" gutterBottom>
          Día economico
        </Typography>
      </Box>
      <DiaForm onSubmit={onSubmit} Datos={Datos} />
      <Paper  sx={{ mt: 5, padding: 2 }}>
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
