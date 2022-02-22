import React, { FC } from 'react';
import styles from '../../address/Address.module.sass';
import ButtonIcon from '../button-icon/ButtonIcon';
import Image from '../../image/Image';
import { ButtonQrProps } from 'src/models/common/button';

const ButtonQr: FC<ButtonQrProps> = ({ sizeIcon: size, onClick, ...props }) => {
  return (
    <ButtonIcon className={styles.qr} onClick={onClick} {...props}>
      <Image
        src={'/qr.svg'}
        width={size}
        height={size}
        alt={'qr'}
      />
    </ButtonIcon>
  );
};

export default ButtonQr;


