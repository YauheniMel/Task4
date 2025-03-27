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
import { Button, Tooltip } from '@mui/material';
import { shareIsLoadingSelector } from '../../redux/selectors/share-selector';
import { useNavigate } from 'react-router-dom';
import { Table } from '../../components/Table/Table';
import { ToolBar } from '../../components/ToolBar/ToolBar';
import { ROUTES_APP } from '../../constants/routes';
import {
  blockMeThunk,
  deleteMeThunk
} from '../../redux/actions/profile-action';

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
    try {
      if (!id) dispatch(loginThunk());
    } catch (_) {
      navigate('./' + ROUTES_APP.login);
    }
  }, []);

  const isLoading = useAppSelector(shareIsLoadingSelector);

  const handleBlockMe = async () => {
    await dispatch(blockMeThunk([id]));

    navigate('./' + ROUTES_APP.login);
  };

  const handleDeleteMe = async () => {
    await dispatch(deleteMeThunk([id]));

    navigate('./' + ROUTES_APP.login);
  };

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
