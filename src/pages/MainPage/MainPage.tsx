import React, { FC } from 'react';
import Button from '@mui/material/Button';
import classNames from 'classnames';
import useAuth from '../../hooks/useAuth';
import logout from '../../services/logout';
import styles from './MainPage.module.scss';
import ToolBar from '../../components/ToolBar/ToolBar';
import Table from '../../components/Table/Table';

const MainPage: FC<any> = function ({ users, firstName, lastName }) {
  const { setIsAuth } = useAuth(false);

  async function handleClick() {
    try {
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
          <Button onClick={handleClick} color="secondary">
            LogOut
          </Button>
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
