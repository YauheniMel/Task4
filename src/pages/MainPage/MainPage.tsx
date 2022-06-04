import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import classNames from 'classnames';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-restricted-globals
      await logoutUser(id, status);

      deleteUserInfo();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function handleBlockMe() {
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-restricted-globals
      await logoutUser(id, status);
      await blockMe(id);
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  async function handleDeleteMe() {
    setIsLoading(true);
    try {
      await deleteMe(id);

      // eslint-disable-next-line no-restricted-globals
      await logoutUser(id, status);
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
      // eslint-disable-next-line array-callback-return
      const rows = selectRows.filter((row) => users.find((user: any) => user.id === row && user.state !== 'online'));

      await unblockUsers(rows);

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
          <div className={styles.profile}>
            <AccountCircleIcon fontSize="large" />
            <strong>{`${firstName} ${lastName}`}</strong>
          </div>
          <div>
            <Tooltip title="Block my account" arrow>
              <Button
                sx={{ marginRight: 4 }}
                variant="contained"
                onClick={handleBlockMe}
                disabled={isLoading}
              >
                Block me
              </Button>
            </Tooltip>
            <Tooltip title="Remove my account" arrow>
              <Button
                sx={{ marginRight: 4 }}
                variant="contained"
                onClick={handleDeleteMe}
                disabled={isLoading}
              >
                Remove me
              </Button>
            </Tooltip>
            <Button
              onClick={handleClick}
              color="secondary"
              disabled={isLoading}
            >
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
