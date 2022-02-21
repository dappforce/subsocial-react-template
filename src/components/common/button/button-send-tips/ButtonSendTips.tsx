import React, { FC } from 'react';
import styles from './ButtonSendTips.module.sass';
import ButtonComponent from '../button-component/ButtonComponent';
import { useTranslation } from 'react-i18next';
import { ButtonComponentProps } from 'src/models/common/button';
import classNames from 'classnames';

const ButtonSendTips: FC<ButtonComponentProps> = ({ onClick, disabled, className, ...props }) => {
  const { t } = useTranslation();

  return (
    <ButtonComponent
      onClick={onClick}
      className={classNames(styles.button, { [className as string]: className })}
      disabled={disabled}
      {...props}
    >
      {t('buttons.sendTips')}
    </ButtonComponent>
  );
};

export default ButtonSendTips;
