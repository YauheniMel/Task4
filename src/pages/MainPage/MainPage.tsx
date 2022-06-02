import React, { FC } from 'react';
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
}) {
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
      await blockMe(id, { state: 'blocked' });

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
          <ToolBar />
          <Table users={users} />
        </div>
      </main>
    </>
  );
};

export default MainPage;
