import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './MainPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loginThunk, logoutThunk } from '../../redux/actions/profile-action';
import {
  profileFirstNameSelector,
  profileIdSelector,
  profileLastNameSelector
} from '../../redux/selectors/profile-selector';
import { Button } from '@mui/material';
import { shareIsLoadingSelector } from '../../redux/selectors/share-selector';
import { useNavigate } from 'react-router-dom';
import { Table } from '../../components/Table/Table';
import { ToolBar } from '../../components/ToolBar/ToolBar';
import { ROUTES_APP } from '../../constants/routes';

export const MainPage: FC = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutThunk());

    navigate('./' + ROUTES_APP.login);
  };

  const firstName = useAppSelector(profileFirstNameSelector);
  const lastName = useAppSelector(profileLastNameSelector);
  const id = useAppSelector(profileIdSelector);

  useEffect(() => {
    if (!id) dispatch(loginThunk());
  }, [id]);

  const isLoading = useAppSelector(shareIsLoadingSelector);

  return (
    <div className={styles.wrapper}>
      <header>
        <div className={classNames(styles.container, 'container')}>
          <div className={styles.profile}>
            <AccountCircleIcon fontSize="large" />
            <strong>{`${firstName} ${lastName}`}</strong>
          </div>
          <div>
            <Button
              onClick={handleLogout}
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
          <ToolBar selectedRows={selectedRows} />
          <Table setSelectedRows={setSelectedRows} />
        </div>
      </main>
    </div>
  );
};
