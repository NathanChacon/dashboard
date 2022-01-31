import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable(props) {
 const {rows, columns} = props
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableSelectionOnClick
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
}