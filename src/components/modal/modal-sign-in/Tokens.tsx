import React from 'react';
import ModalSignInInfo from './ModalSignInInfo';
import ButtonComponent from '../../common/button/button-component/ButtonComponent';
import styles from './ModalSignIn.module.sass';

const Tokens = () => (
  <>
    <ButtonComponent variant={'contained'} className={styles.token}>
      Get tokens
    </ButtonComponent>

    <ModalSignInInfo />
  </>
);

export default Tokens;
