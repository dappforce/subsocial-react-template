import styles from './ModalSignIn.module.sass';
import { TextSizes, TitleSizes } from 'src/models/common/typography';
import { ModalSignInContent, ModalSignInProps } from 'src/models/modal';
import { Box } from '@mui/system';
import Modal from '../Modal';
import { FC } from 'react';
import Title from '../../common/title/Title';
import NoExtension from './NoExtension';
import NoAccount from './NoAccount';
import Accounts from './Accounts';
import { useAppSelector } from 'src/rtk/app/store';
import { ACCOUNT_STATUS } from 'src/models/auth';
import Link from '../../common/links/link/Link';
import Text from '../../common/text/Text';
import { useAuth } from '../../auth/AuthContext';
import Tokens from './Tokens';
import { useTranslation } from 'react-i18next';

const PolkadotLink = () => (
  <Link
    href={'https://github.com/polkadot-js/extension'}
    ext
    className={styles.link}
  >
    Polkadot Extension
  </Link>
);

const ModalSignIn: FC<ModalSignInProps> = ({
  status,
  isAlert,
  onClose,
  open,
}) => {
  const { accounts } = useAppSelector((state) => state.myAccount);
  const { hasToken } = useAuth();
  const { t } = useTranslation();

  const getContent = () => {
    const content: ModalSignInContent = {
      title: null,
      body: null,
    };

    if (isAlert) {
      content.title = t('modals.login.title-wait');

      switch (status) {
        case ACCOUNT_STATUS.EXTENSION_NOT_FOUND:
          content.body = <NoExtension />;
          content.text = (
            <>
              {t('modals.login.noExtension.toContinueConnectWith')}
              <PolkadotLink />
              {t('modals.login.noExtension.EnableExtension')}
            </>
          );
          break;
        case ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND:
          content.body = <NoAccount />;
          content.text = 'You need to sign in to access this functionality.';
          break;
        case ACCOUNT_STATUS.UNAUTHORIZED:
          content.body = (
            <Accounts accounts={accounts || []} onClose={onClose} />
          );
          content.text =
            'You need to sign in to access this functionality. Click on your account below:';
          break;
        case ACCOUNT_STATUS.AUTHORIZED:
          if (!hasToken) {
            content.body = <Tokens />;
            content.text = 'You need some tokens to continue.';
          }
          break;
        default:
          break;
      }

      return content;
    }

    content.title = t('modals.login.title');

    switch (status) {
      case ACCOUNT_STATUS.EXTENSION_NOT_FOUND:
        content.body = <NoExtension />;
        content.text = (
          <>
            <PolkadotLink /> {t('modals.login.noExtension.wasNotFound')}.
          </>
        );
        break;
      case ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND:
        content.body = <NoAccount />;
        break;
      case ACCOUNT_STATUS.UNAUTHORIZED:
        content.body = <Accounts accounts={accounts || []} onClose={onClose} />;
        content.text = t('modals.login.accountScreen.message');
        break;
      default:
        break;
    }

    return content;
  };

  const { text, body, title } = getContent();

  return (
    <Modal className={styles.modal} onClose={onClose} open={open}>
      <Box className={styles.box}>
        <Title type={TitleSizes.DETAILS} className={styles.title}>
          {title}
        </Title>
        {text && <Text type={TextSizes.NORMAL}>{text}</Text>}
        {body}
      </Box>
    </Modal>
  );
};

export default ModalSignIn;
