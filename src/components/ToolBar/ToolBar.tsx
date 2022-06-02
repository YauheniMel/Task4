import React, { FC } from 'react';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';

const ToolBar: FC<any> = function () {
  return (
    <ButtonGroup variant="text" aria-label="text button group">
      <Button>Block</Button>
      <IconButton aria-label="Unblock">
        <LockOpenIcon />
      </IconButton>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ButtonGroup>
  );
};

export default ToolBar;
