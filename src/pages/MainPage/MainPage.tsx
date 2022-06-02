import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import classNames from 'classnames';
import { Tooltip } from '@mui/material';
import useAuth from '../../hooks/useAuth';
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
}) {
  const [selectRows, setSelectRows] = useState([]);
  const { setIsAuth } = useAuth(false);

  async function handleClick() {
    try {
      await logout();
      deleteUserInfo();
      setIsAuth(true);
    } catch (err) {
      alert(err);
    }
  }

  async function handleBlockMe() {
    try {
      await blockMe(id);

      await logout();

      setIsAuth(true);
    } catch (err) {
      alert(err);
    }
  }

  async function handleDeleteMe() {
    try {
      await deleteMe(id);

      await logout();

      setIsAuth(true);
    } catch (err) {
      alert(err);
    }
  }

  async function handleBlockUsers() {
    try {
      blockUsers(selectRows);
    } catch (err) {
      alert(err);
    }
  }
  async function handleUnblockUsers() {
    try {
      unblockUsers(selectRows);
    } catch (err) {
      alert(err);
    }
  }

  async function handleDeleteUsers() {
    try {
      deleteUsers(selectRows);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <header>
        <div className={classNames(styles.header, 'container')}>
          <strong>{`${firstName} ${lastName}`}</strong>
          <div>
            <Tooltip title="Add" arrow>
              <Button onClick={handleBlockMe}>Block me</Button>
            </Tooltip>
            <Tooltip title="Add" arrow>
              <Button onClick={handleDeleteMe}>Remove me</Button>
            </Tooltip>
            <Button onClick={handleClick} color="secondary">
              LogOut
            </Button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className="container">
          <ToolBar
            deleteUsers={handleDeleteUsers}
            blockUsers={handleBlockUsers}
            selectRows={selectRows}
            unblockUsers={handleUnblockUsers}
          />
          <Table users={users} setSelectRows={setSelectRows} />
        </div>
      </main>
    </>
  );
};

export default MainPage;
