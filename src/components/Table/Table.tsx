import React, { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Table: FC<any> = function ({ users, setSelectRows }) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First name', flex: 3 },
    { field: 'lastName', headerName: 'Last name', flex: 3 },
    { field: 'email', headerName: 'Email', flex: 3 },
    { field: 'registerDate', headerName: 'Registration date', flex: 3 },
    { field: 'loginDate', headerName: 'Login date', flex: 2 },
    { field: 'state', headerName: 'Status', flex: 2 },
  ];

  function fff(e: any) {
    const start = e.pagination.page * e.pagination.pageSize;
    e.selection = e.selection.filter(
      (_: any, idx: any) => idx >= start && idx < start + e.pagination.pageSize,
    );

    // if (JSON.stringify(e.selection) === JSON.stringify(selectRows)) {
    setSelectRows(e.selection);
    // }
  }

  return (
    <DataGrid
      style={{ height: 'inherit', width: '100%' }}
      rows={users}
      columns={columns}
      autoPageSize
      rowsPerPageOptions={[5]}
      checkboxSelection
      onStateChange={fff}
    />
  );
};

export default Table;
