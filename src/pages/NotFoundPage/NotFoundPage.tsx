import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={classNames(styles.container, 'container')}>
      <div>
        <h2>Page is not found!</h2>
        <Link className="link" to={'.'} onClick={handleGoBack}>
          Back
        </Link>
      </div>
    </div>
  );
};
