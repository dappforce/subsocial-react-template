import React, { FC, useEffect } from 'react';
import { Alert, Snackbar as SnackbarComponent } from '@mui/material';
import styles from './Snackbar.module.sass';
import { SnackbarProps } from 'src/models/common/snackbar';
import Loader from '../loader/Loader';

const Snackbar: FC<SnackbarProps> = ({
  type,
  open,
  onClose,
  message,
  withAutoHide = true,
  withLoader = false,
}) => {
  const classNameSnackbar = `${styles.snackbar} ${styles[type]}`;

  useEffect(() => () => onClose && onClose(), []);

  return (
    <SnackbarComponent
      className={classNameSnackbar}
      open={open}
      autoHideDuration={withAutoHide ? 2000 : undefined}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={type}
        className={styles.alert}
        icon={withLoader ? <Loader className={styles.loader} /> : undefined}
      >
        {message}
      </Alert>
    </SnackbarComponent>
  );
};

export default Snackbar;
