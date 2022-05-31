import React, { FC } from 'react';
import styles from './MainPage.module.scss';

const MainPage: FC = function () {
  return (
    <>
      <header>
        <div className="container">
          <button type="button">LogOut</button>
        </div>
      </header>
      <main className={styles.main}>
        <div className="container">MainPage</div>
      </main>
    </>
  );
};

export default MainPage;
