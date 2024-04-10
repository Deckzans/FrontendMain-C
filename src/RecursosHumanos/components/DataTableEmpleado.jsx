import MUIDataTable from "mui-datatables";


export const DataTableEmpleado = ({ data, columns, title, options = {} }) => {

  const customOptions = {
    responsive: 'standard',
    selectableRows: 'none',
    ...options,
  };

  return (
    <div>
      <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={customOptions}
      />
    </div>
  );
};
