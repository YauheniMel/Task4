import React, { FC } from 'react';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';

const ToolBar: FC<any> = function ({
  blockUsers,
  selectRows,
  deleteUsers,
  unblockUsers,
}) {
  return (
    <ButtonGroup
      sx={{ position: 'absolute', top: 5 }}
      variant="text"
      aria-label="text button group"
    >
      {selectRows[0] ? (
        <>
          <Button color="secondary" onClick={() => blockUsers(selectRows)}>
            Block
          </Button>
          <IconButton
            onClick={() => unblockUsers(selectRows)}
            aria-label="Unblock"
          >
            <LockOpenIcon />
          </IconButton>
          <IconButton
            onClick={() => deleteUsers(selectRows)}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ) : null}
    </ButtonGroup>
  );
};

export default ToolBar;
