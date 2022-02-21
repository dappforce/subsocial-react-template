import React, { FC } from 'react';
import ButtonComponent from '../button-component/ButtonComponent';
import { ButtonComponentProps } from 'src/models/common/button';
import { useTranslation } from 'react-i18next';
import styles from './ButtonSignOut.module.sass';

const ButtonSignOut: FC<ButtonComponentProps> = ({ onClick, ...props }) => {
  const { t } = useTranslation();

  return (
    <ButtonComponent
      onClick={onClick}
      className={styles.button}
      {...props}
    >
      {t('buttons.signOut')}
    </ButtonComponent>
  );
};

export default ButtonSignOut;
