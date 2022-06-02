import React, { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Table: FC<any> = function ({ users, setSelectRows }) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'registerDate', headerName: 'Registration date', width: 130 },
    { field: 'loginDate', headerName: 'Login date', width: 130 },
    { field: 'state', headerName: 'Status', width: 130 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onStateChange={(e) => setSelectRows(e.selection)}
      />
    </div>
  );
};

export default Table;
