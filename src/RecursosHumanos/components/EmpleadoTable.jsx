// EmpleadoTable.js
import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Paper } from '@mui/material';

const EmpleadoTable = ({ data, onRowSelectionChange, selectedRows }) => {
  const options = {
    filter:false,
    print: false,
    responsive: 'standard',
    elevation: 4,
    selectableRows: 'single',
    selectableRowsOnClick: true,
    rowsPerPageOptions: [5],
    rowsPerPage:5,
    pagination: true,
    download: true,
    selectableRowsHideCheckboxes: true,
    setRowProps: (rowData, dataIndex) => {
      const isSelected = selectedRows.includes(dataIndex);
      return {
        style: {
          background: isSelected ? '#e0f7fa' : 'inherit',
          fontWeight: isSelected ? 'bold' : 'normal',
          cursor: 'pointer',
        },
      };
    },
    onRowSelectionChange: (currentRowsSelected, allRowsSelected) => {
      onRowSelectionChange(currentRowsSelected, allRowsSelected);
    },
  };

  const columns = [
    { name: 'id', label: 'id' },
    { name: 'nombre', label: 'Nombre' },
    { name: 'apmaterno', label: 'Apellido Materno' },
    { name: 'appaterno', label: 'Apellido Paterno' },
    { name: 'area', label: 'Area' },
    { name: 'cargo', label: 'Cargo' },
    { name: 'regimenlab', label: 'Regimen Laboral' },
    { name: 'status', label: 'Status' },
  ];

  return (
    <Paper sx={{ overflowX: 'auto', mt: 3, marginBottom: '60px' }}>
      <MUIDataTable title={'Lista de Empleados'} data={data} columns={columns} options={options} />
    </Paper>
  );
};

export default EmpleadoTable;
