import { FC } from 'react';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../redux/store';
import {
  blockUsersThunk,
  deleteUsersThunk,
  unblockUsersThunk
} from '../../redux/actions/users-action';

export const ToolBar: FC<any> = function ({ selectedRows }) {
  const dispatch = useAppDispatch();

  const handleBlockUsers = async () => {
    await dispatch(blockUsersThunk(selectedRows));
  };

  const handleUnblockUsers = async () => {
    await dispatch(unblockUsersThunk(selectedRows));
  };

  const handleDeleteUsers = async () => {
    await dispatch(deleteUsersThunk(selectedRows));
  };

  return (
    <ButtonGroup
      sx={{ position: 'absolute', top: 5 }}
      variant="text"
      aria-label="text button group"
    >
      {selectedRows.length && (
        <>
          <Button color="secondary" onClick={handleBlockUsers}>
            Block
          </Button>
          <IconButton onClick={handleUnblockUsers} aria-label="Unblock">
            <LockOpenIcon />
          </IconButton>
          <IconButton onClick={handleDeleteUsers} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </ButtonGroup>
  );
};
