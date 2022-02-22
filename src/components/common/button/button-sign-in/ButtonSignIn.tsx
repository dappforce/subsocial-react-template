import React, { FC } from 'react';
import ButtonComponent from '../button-component/ButtonComponent';
import { ButtonComponentProps } from 'src/models/common/button';
import { useTranslation } from 'react-i18next';

const ButtonSignIn: FC<ButtonComponentProps> = ({ onClick, ...props }) => {
  const { t } = useTranslation();

  return (
    <ButtonComponent
      onClick={onClick}
      {...props}
    >
      {t('buttons.signIn')}
    </ButtonComponent>
  );
};

export default ButtonSignIn;
