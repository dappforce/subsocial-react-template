import React from 'react';
import { Alert } from '@mui/material';
import Link from '../../common/links/link/Link';
import styles from './ModalSignIn.module.sass';
import ModalSignInInfo from './ModalSignInInfo';
import { useTranslation } from 'react-i18next';

const NoAccount = () => {
  const { t } = useTranslation();

  return (
    <>
      <Alert severity="warning" icon={false} className={styles.alert}>
        {t('modals.login.noAccountScreen.noAccountFound')}{' '}
        <Link
          href={'https://github.com/polkadot-js/extension'}
          ext
          className={`${styles.link} ${styles.black}`}
        >
          Polkadot Extension
        </Link>{' '}
        {t('modals.login.noAccountScreen.createNew')}
        {' '}
        {t('modals.login.noAccountScreen.importExisting')}
      </Alert>

      <ModalSignInInfo />
    </>
  );
};

export default NoAccount;
