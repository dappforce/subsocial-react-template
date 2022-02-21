import { FC, useState } from 'react';
import styles from './Address.module.sass';
import { AddressProps, AddressSize } from 'src/models/common/address-props';
import Snackbar from '../snackbar/Snackbar';
import { toShortAddress } from '../../utils/address';
import { copyText } from 'src/utils';
import { Grow, IconButton } from '@mui/material';
import Image from '../image/Image';
import Text from '../text/Text';
import { TextSizes } from 'src/models/common/typography';
import { useModal } from 'src/hooks/useModal';
import ModalQr from '../../modal/modal-qr/ModalQr';
import { useResponsiveSize } from '../../responsive/ResponsiveContext';
import { useSnackbar } from 'src/hooks/useSnackbar';
import { useTranslation } from 'react-i18next';
import ButtonQr from '../button/button-qr/ButtonQr';

const Address: FC<AddressProps> = ({
  isQr,
  isIcon,
  label,
  textProps,
  className: inputClassName,
  lengthOfAddress,
  size,
  isCopy = true,
  isShort = true,
}) => {
  const { isMobile } = useResponsiveSize();
  const [isCopied, setIsCopied] = useState(false);
  const { toggleModal, isVisible } = useModal();
  const className = inputClassName
    ? `${styles.address} ${inputClassName}`
    : styles.address;
  const shortedAddress = toShortAddress(label, lengthOfAddress);
  const { type, message, setSnackConfig, removeSnackbar } = useSnackbar();
  const sizes: Record<AddressSize, any> = {
    sm: { type: TextSizes.SECONDARY, size: 16 },
    lg: { type: TextSizes.NORMAL, size: 24 },
  };
  const { t } = useTranslation();

  return (
    <div className={className}>
      {isIcon && (
        <Image
          src={'/wallet.jpg'}
          width={sizes[size].size}
          height={sizes[size].size}
          alt={'wallet'}
        />
      )}
      <Text type={sizes[size].type} paragraph component={'div'} {...textProps}>
        {isShort ? shortedAddress : label}
      </Text>
      {(isCopy || isMobile) && (
        <>
          <Grow in={true} style={{ transformOrigin: '0 0 0' }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                copyText(label);
                setIsCopied(true);
                setSnackConfig({ message: t('snackbars.addressCopied') });
              }}
            >
              <Image
                src={'/copy.svg'}
                width={sizes[size].size}
                height={sizes[size].size}
                alt="copy"
              />
            </IconButton>
          </Grow>
          <Snackbar
            type={type}
            open={isCopied}
            onClose={() => {
              setIsCopied(false);
              removeSnackbar();
            }}
            message={message}
          />
        </>
      )}
      {isQr && (
        <>
          <ModalQr id={label} open={isVisible} onClose={toggleModal} />
          <ButtonQr onClick={toggleModal} sizeIcon={sizes[size].size}/>
        </>
      )}
    </div>
  );
};

export default Address;
