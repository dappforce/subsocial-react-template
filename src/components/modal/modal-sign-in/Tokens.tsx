import React from 'react';
import ModalSignInInfo from './ModalSignInInfo';
import ButtonComponent from '../../common/button/button-component/ButtonComponent';
import styles from './ModalSignIn.module.sass';
import { useTranslation } from 'react-i18next';

const Tokens = () => {
  const { t } = useTranslation();

  return (
  <>
    <ButtonComponent variant={'contained'} className={styles.token}>
      {t('modals.noToken.button')}
    </ButtonComponent>

    <ModalSignInInfo/>
  </>
)};

export default Tokens;
