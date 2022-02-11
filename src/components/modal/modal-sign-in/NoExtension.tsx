import React from 'react';
import Text from '../../common/text/Text';
import { TextSizes } from '../../../models/common/typography';
import Link from '../../common/links/link/Link';
import styles from './ModalSignIn.module.sass';
import ButtonCancel from '../../common/button/button-cancel/ButtonCancel';
import Image from '../../common/image/Image';
import { useTranslation } from 'react-i18next';

const NoExtension = () => {
  const { t } = useTranslation();

  return (
    <>
      <a
        href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd"
        target={'_blank'}
        rel="noreferrer"
      >
        <ButtonCancel className={styles.button}>
          <Image src={'/google.svg'} width={20} height={20} alt={'Chrome'} />
          {t('modals.login.noExtension.installForChrome')}
        </ButtonCancel>
      </a>

      <a
        href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/"
        target={'_blank'}
        rel="noreferrer"
      >
        <ButtonCancel className={`${styles.button} ${styles.firefox}`}>
          <Image src={'/firefox.svg'} width={20} height={20} alt={'Firefox'} />
          {t('modals.login.noExtension.installForFirefox')}
        </ButtonCancel>
      </a>

      <Text type={TextSizes.SECONDARY} className={styles.hint}>
        {t('modals.login.noExtension.needHelp')}{' '}
        <Link
          href={'https://app.subsocial.network/docs/sign-up'}
          ext
          className={styles.link}
        >
          {t('modals.login.noExtension.signInGuide')}
        </Link>
      </Text>
    </>
  );
};

export default NoExtension;
