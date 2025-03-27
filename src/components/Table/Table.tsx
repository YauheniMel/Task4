import { FC, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { usersSelector } from '../../redux/selectors/users-selector';
import { getUsersThunk } from '../../redux/actions/users-action';

export const Table: FC<any> = ({ setSelectedRows }) => {
  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      await dispatch(getUsersThunk());
      setIsFetching(false);
    })();
  }, []);

  const users = useAppSelector(usersSelector);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'firstName', headerName: 'First name', flex: 3 },
    { field: 'lastName', headerName: 'Last name', flex: 3 },
    { field: 'email', headerName: 'Email', flex: 3 },
    { field: 'createdAt', headerName: 'Registration date', flex: 3 },
    { field: 'updatedAt', headerName: 'Login date', flex: 2 },
    { field: 'state', headerName: 'Status', flex: 2 }
  ];

  function handleSelectRows(e: any) {
    setSelectedRows(e.selection);
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
