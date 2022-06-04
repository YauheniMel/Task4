import React, { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Table: FC<any> = function ({ users, setSelectRows, isFetching }) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First name', flex: 3 },
    { field: 'lastName', headerName: 'Last name', flex: 3 },
    { field: 'email', headerName: 'Email', flex: 3 },
    { field: 'registerDate', headerName: 'Registration date', flex: 3 },
    { field: 'loginDate', headerName: 'Login date', flex: 2 },
    { field: 'state', headerName: 'Status', flex: 2 },
  ];

  function handleSelectRows(e: any) {
    setSelectRows(e.selection);
  }

  return (
    <DataGrid
      style={{ height: 'inherit', width: '100%' }}
      rows={users}
      columns={columns}
      autoPageSize
      loading={isFetching}
      rowsPerPageOptions={[5]}
      checkboxSelection
      onStateChange={handleSelectRows}
    />
  );
};

export default Table;
