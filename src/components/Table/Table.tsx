import { FC, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { usersSelector } from '../../redux/selectors/users-selector';
import { getUsersThunk } from '../../redux/actions/users-action';
import moment from 'moment';
import { IUser } from '../../types';

interface ITable {
  setSelectedRows: (selectedRows: number[]) => void;
}

export const Table: FC<ITable> = ({ setSelectedRows }) => {
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
    { field: 'firstName', headerName: 'First name', flex: 2 },
    { field: 'lastName', headerName: 'Last name', flex: 2 },
    { field: 'sex', headerName: 'sex', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 3 },
    { field: 'createdAt', headerName: 'Registration date', flex: 3 },
    { field: 'updatedAt', headerName: 'Login date', flex: 3 },
    { field: 'state', headerName: 'Status', flex: 2 }
  ];

  function handleSelectRows(e: any) {
    setSelectedRows(e.selection);
  }

  return (
    <DataGrid
      style={{ height: 'inherit', width: '100%', marginBottom: '10px' }}
      rows={users.map((user: IUser) => ({
        ...user,
        updatedAt: moment(user.updatedAt).format('MMMM Do YYYY, h:mm:ss'),
        createdAt: moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss')
      }))}
      columns={columns}
      autoPageSize
      loading={isFetching}
      rowsPerPageOptions={[5]}
      checkboxSelection
      onStateChange={handleSelectRows}
    />
  );
};
