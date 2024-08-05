import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({ rows, columns, height, page = 4 }) => {

   const rowsWithId = Array.isArray(rows) ? rows.map((row, index) => ({ ...row, id: index })) : [];

   return (
      <DataGrid
         autoHeight
         rows={rowsWithId}
         columns={columns}
         getRowId={row => row.id}
         getRowHeight={() => height ?? 100}
         initialState={{
            pagination: {
               paginationModel: { pageSize: page, page: 0 },
            }
         }}
         pageSizeOptions={[page]}
      />
   )
}

export default DataTable