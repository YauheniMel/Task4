import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import classNames from 'classnames';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import logout from '../../services/logout';
import styles from './MainPage.module.scss';
import ToolBar from '../../components/ToolBar/ToolBar';
import Table from '../../components/Table/Table';

const MainPage: FC<any> = function ({
  id,
  users,
  firstName,
  lastName,
  blockMe,
  deleteMe,
  deleteUserInfo,
  deleteUsers,
  blockUsers,
  unblockUsers,
  logoutUser,
  isFetching,
  setIsFetching,
}) {
  const [selectRows, setSelectRows] = useState([]);

  async function handleClick() {
    try {
      await logout();

      logoutUser();

      deleteUserInfo();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function handleBlockMe() {
    try {
      await blockMe(id);

      await logout();

      logoutUser();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function handleDeleteMe() {
    try {
      await deleteMe(id);

      await logout();

      logoutUser();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function handleBlockUsers() {
    try {
      await blockUsers(selectRows);

      setIsFetching(true);
    } catch (err: any) {
      toast.error(err.message);
    }
  }
  async function handleUnblockUsers() {
    try {
      await unblockUsers(selectRows);

      setIsFetching(true);
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function handleDeleteUsers() {
    try {
      await deleteUsers(selectRows);

      setIsFetching(true);
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <div className={classNames(styles.container, 'container')}>
          <strong>{`${firstName} ${lastName}`}</strong>
          <div>
            <Tooltip title="Add" arrow>
              <Button
                sx={{ marginRight: 4 }}
                variant="contained"
                onClick={handleBlockMe}
              >
                Block me
              </Button>
            </Tooltip>
            <Tooltip title="Add" arrow>
              <Button
                sx={{ marginRight: 4 }}
                variant="contained"
                onClick={handleDeleteMe}
              >
                Remove me
              </Button>
            </Tooltip>
            <Button onClick={handleClick} color="secondary">
              LogOut
            </Button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={classNames(styles.container, 'container')}>
          <ToolBar
            deleteUsers={handleDeleteUsers}
            blockUsers={handleBlockUsers}
            selectRows={selectRows}
            unblockUsers={handleUnblockUsers}
          />
          <Table
            isFetching={isFetching}
            selectRows={selectRows}
            users={users}
            setSelectRows={setSelectRows}
          />
        </div>
      </main>
    </div>
  );
};

export default MainPage;
