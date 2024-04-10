import React, { useEffect, useState, useRef } from 'react';
import { useEmpleadoStore } from '../hooks/useEmpleadoStore';
import { Container, Typography, Paper, Box } from '@mui/material';
import EmpleadoButtons from '../components/EmpleadoButtons';
import EmpleadoTable from '../components/EmpleadoTable';
import { useNavigate } from 'react-router-dom';
import { eliminarEmpleado } from '../hooks/useEliminarEmpleado';

export const EmpleadoPage = () => {
  const { datos, traerEmpleados } = useEmpleadoStore();
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  const paperRef = useRef(null);

  const handleAdd = () => {
    navigate(`/home/agregar`);
  };

  const handleNavigation = (path) => {
    if (selectedRows.length === 1) {
      const idSeleccionado = datosFiltrados[selectedRows[0]].id;
      navigate(`/home/${path}/${idSeleccionado}`);
    }
  };

  const handleDelete = async () => {
    if (selectedRows.length === 1) {
      const idSeleccionado = datosFiltrados[selectedRows[0]].id;
      try {
        const response = await eliminarEmpleado(idSeleccionado);
        if (response) {
          traerEmpleados();
        } else {
          // Lógica en caso de error o success: false
        }
      } catch (error) {
        console.error("Error al intentar eliminar un empleado:", error.message);
        // Manejar el error según tus necesidades
      }
    }
  };

  const datosFiltrados = datos.map((empleado) => ({
    id: empleado.id,
    nombre: empleado.nombre,
    apmaterno: empleado.aMaterno,
    appaterno: empleado.aPaterno,
    area: empleado.area ? empleado.area.descripcion : 'Sin área asignada',
    cargo: empleado.cargo,
    regimenlab: empleado.regimen,
    fechaingreso: new Date(empleado.fechaIngreso).toLocaleDateString(),
    status: empleado.status,
  }));

  useEffect(() => {
    traerEmpleados();
  }, [traerEmpleados]);

  useEffect(() => {
    const clearSelection = () => {
      setSelectedRows([]);
    };

    const handleClickOutside = (event) => {
      if (paperRef.current && !paperRef.current.contains(event.target)) {
        clearSelection();
      }
    };

    const handleDocumentClick = (event) => {
      handleClickOutside(event);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [paperRef]);

  return (
    <Container maxWidth="lg">
      <Paper ref={paperRef} sx={{ mt: 5, marginBottom: '60px', boxShadow: 10, padding: 2, backgroundColor: "#F5F5F5" }}>
        <EmpleadoButtons
          onAdd={handleAdd}
          onEdit={() => handleNavigation('editar')}
          onDelete={handleDelete}
          onVacaciones={() => handleNavigation('vacaciones')}
          onPermiso={() => handleNavigation('permiso')}
          onIncapacidad={() => handleNavigation('incapacidad')}
          onDiaEconomico={() => handleNavigation('dia')}
          onFormacion={() => handleNavigation('formacion')}
          isEditDisabled={selectedRows.length !== 1}
          isDeleteDisabled={selectedRows.length === 0}
          isVacacionesDisabled={selectedRows.length === 0}
          isPermisoDisabled={selectedRows.length === 0}
          isIncapacidadDisabled={selectedRows.length === 0}
          isDiaEconomicoDisabled={selectedRows.length === 0}
          isFormacionDisabled={selectedRows.length === 0}
        />
        {selectedRows.length > 0 && (
          <Box mt={2} textAlign="center">
            <Typography variant="subtitle1">
              Empleado Seleccionado: {datosFiltrados[selectedRows[0]].nombre} {datosFiltrados[selectedRows[0]].appaterno} {datosFiltrados[selectedRows[0]].apmaterno}
            </Typography>
          </Box>
        )}
        <EmpleadoTable
          data={datosFiltrados}
          onRowSelectionChange={(currentRowsSelected, allRowsSelected) => {
            setSelectedRows(allRowsSelected.map((row) => row.dataIndex));
            console.log('Datos de la fila seleccionada:', datosFiltrados[allRowsSelected[0].dataIndex]);
          }}
          selectedRows={selectedRows}
        />
      </Paper>
    </Container>
  );
};

