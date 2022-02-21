import { FC, useState } from 'react';
import QRCode from 'qrcode.react';
import Title from '../../common/title/Title';
import styles from './ModalQr.module.sass';
import { TextSizes, TitleSizes } from 'src/models/common/typography';
import ButtonComponent from '../../common/button/button-component/ButtonComponent';
import Text from '../../common/text/Text';
import { copyText } from '../../../utils';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box } from '@mui/system';
import ButtonClose from '../../common/button/button-close/ButtonClose';
import MaterialModal from '@mui/material/Modal';
import { ModalQrProps } from 'src/models/modal';
import Snackbar from '../../common/snackbar/Snackbar';
import { useSnackbar } from 'src/hooks/useSnackbar';
import { useTranslation } from 'react-i18next';

const ModalQrcode: FC<ModalQrProps> = ({ id, onClose, open, ...props }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { type, message, setSnackConfig, removeSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleClick = () => {
    setIsCopied(true);
    copyText(id);
    setSnackConfig({ message: t('snackbars.addressCopied') });
  };

  return (
    <MaterialModal
      open={open}
      onClose={onClose}
      className={styles.modal}
      {...props}
    >
      <Box className={styles.box}>
        <ButtonClose onClick={onClose} className={styles.close} />
        <Title type={TitleSizes.PREVIEW} className={styles.title}>
          {t('modals.qrCode.title')}
        </Title>
        <Box className={styles.content}>
          <Snackbar
            type={type}
            open={isCopied}
            onClose={() => {
              setIsCopied(false);
              removeSnackbar();
            }}
            message={message}
          />
          <QRCode value={window.location.href} size={170} />
          <Text type={TextSizes.SECONDARY} className={styles.address}>
            {id}
          </Text>
          <div className={styles.buttons}>
            <ButtonComponent
              variant={'outlined'}
              onClick={onClose}
              className={styles.button}
            >
              {t('buttons.close')}
            </ButtonComponent>
            <ButtonComponent
              variant={'contained'}
              onClick={handleClick}
              className={styles.button}
            >
              <ContentCopyIcon />
              {t('buttons.copy')}
            </ButtonComponent>
          </div>
        </Box>
      </Box>
    </MaterialModal>
  );
};

export default ModalQrcode;
