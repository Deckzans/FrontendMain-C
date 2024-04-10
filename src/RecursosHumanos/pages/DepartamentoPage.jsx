import { useEffect } from 'react';
import { useAreaStore } from '../hooks/useAreaStore';
import { useEmpleadoStore } from '../hooks/useEmpleadoStore';
import MUIDataTable from 'mui-datatables';
import { Container, Typography, Paper } from '@mui/material';

export const DepartamentoPage = () => {
  const { datos: areas, traerAreas } = useAreaStore();
  const { datos: empleados, traerEmpleados, contadoresPorArea } = useEmpleadoStore();

  useEffect(() => {
    traerAreas();
    traerEmpleados();
  }, [traerAreas, traerEmpleados]);

  console.log("Áreas:", areas);
console.log("Empleados:", empleados);

  const columns = [
    // Define aquí las columnas de tu tabla
    { name: "id", label: "ID" },
    { name: "descripcion", label: "Descripción" },
    { name: "numEmpleados", label: "Número de Empleados" },
  ];


  const options = {
    filterType: 'checkbox',
    filter: false,
    print: false,
    responsive: "standard",
    elevation: 4,
    selectableRowsOnClick: false,
    selectableRows: "none",
    rowsPerPage: 5,
    rowsPerPageOptions: [],
    download: true,
  }

  const data = areas.map(area => ({
    id: area.id,
    descripcion: area.descripcion,
    numEmpleados: contadoresPorArea[area.id] || 0,
  }));


  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" sx={{ mt: 5, mb: 5 }}>
        Lista de Departamentos
      </Typography>
      <Paper sx={{ overflowX: 'auto', mt: 3, marginBottom: '60px' }}>
        <MUIDataTable
          title={"Lista de Departamentos"}
          data={data}
          columns={columns}
          options={options}
        />
      </Paper>
    </Container>
  );
};

