import React, { useEffect, useState } from 'react';
import { DataTableEmpleado } from '../components/DataTableEmpleado';
import { Button, Container, Paper } from '@mui/material';
import { cargarUsuario, eliminarUsuario, traerUsuarios } from '../hooks/useTraerUsuarios';
import { DeleteForever, Description } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAppState from '../../auth/hooks/estado';
import { SnackbarPersonalizado } from '../../layout/Components/SnackBarPersonalizado';


export const AdministradorPage = () => {

  const [Usuarios, setUsuarios] = useState([])
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [Mensaje, setMensaje] = useState();
  const [severiti, setSeverity] = useState('success');
  const { id } = useAppState();

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const response = await traerUsuarios();
        const { success, data } = response;
        if (success) {
          setUsuarios(data);
        }
      } catch (error) {
        console.error(`Error al intentar cargar un empleado: ${error.message}`);
      }
    };
    cargarUsuarios();
  }, []);

  const handleSnackbarClose = () => {
    setOpen(false);
    setOpenError(false);
  };

  const handleEliminarUsuario = async (id) => {
    try {
      const response = await eliminarUsuario(id);
      console.log(response);
      if (response.success) {
        setMensaje('Usuario eliminado correctamente');
        setOpen(true);
        // Recargar la lista de usuarios después de eliminar uno con éxito
        await cargarUsuarios();
      } else {
        console.log('No se pudo eliminar el usuario. Error:', response.message);
      }
    } catch (error) {
      if (error.message === 'No se puede realizar la acción debido a restricciones de clave externa.') {
        setSeverity('error');
        setMensaje('No se puede eliminar el usuario debido a que está ligado a empleados.');
        setOpenError(true);
      } else {
        console.error(`Error al intentar borrar usuario: ${error.message}`);
      }
    }
  };

  const handleEditarDia = (id) => {
    navigate(`editarUsuario/${id}`)

  }

  const nuevosDatos = Usuarios.map(usuario => ({
    id: usuario.id,
    nombre: usuario.nombre,
    usuario: usuario.usuario,
    rol: usuario.rol,
  }));


  const columns = [
    { name: 'id', label: 'id' },
    { name: 'nombre', label: 'nombre' },
    { name: 'usuario', label: 'usuario' },
    { name: 'rol', label: 'rol' },
    {
      name: "acciones",
      label: "acciones",
      options: {
        customBodyRender: (_, tableMeta) => (
          <>
            <Button endIcon={<Description />} sx={{ mr: 1 }} size="small" variant="contained" onClick={() => handleEditarDia(tableMeta.rowData[0])}>
              Editar
            </Button>
            <Button
              endIcon={<DeleteForever />}
              size="small"
              color="error"
              variant="contained"
              onClick={() => {
                // Verificar si el ID del usuario es igual al ID del usuario actualmente autenticado
                if (tableMeta.rowData[0] === id) {
                  return; // No realizar la eliminación si el ID coincide
                }
                handleEliminarUsuario(tableMeta.rowData[0]);
              }}
              disabled={tableMeta.rowData[0] === id} // Deshabilitar el botón si el ID coincide
            >
              Eliminar
            </Button>
          </>
        ),
      },
    },
  ];

  // Opciones personalizadas para el DataTableEmpleado
  const customOptions = {
    responsive: 'vertical',
    selectableRows: 'none',
    print: false,
    filter: false,
    download: false,
    pagination: true, // Habilita la paginación
    rowsPerPage: 5, // Número de filas por página
    rowsPerPageOptions: [5, 10, 20] // Opciones para cambiar el número de filas por página
    // Agrega otras opciones personalizadas según sea necesario
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Paper sx={{ mt: 5, padding: 2 }}>
        <DataTableEmpleado
          data={nuevosDatos}
          columns={columns}
          title="Usuarios"
          options={customOptions}
        />
      </Paper>
      <SnackbarPersonalizado open={openError} onClose={handleSnackbarClose} mensaje={Mensaje} severity={severiti} time={2000} />
      <SnackbarPersonalizado open={open} onClose={handleSnackbarClose} mensaje={Mensaje} time={2000} />
    </Container>
  );
};
