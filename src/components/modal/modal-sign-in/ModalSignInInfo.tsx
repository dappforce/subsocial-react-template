import React from 'react';
import { TextSizes } from 'src/models/common/typography';
import styles from './ModalSignIn.module.sass';
import SmallLink from '../../common/links/small-link/SmallLink';
import Text from '../../common/text/Text';
import { useTranslation } from 'react-i18next';

const ModalSignInInfo = () => {
  const { t } = useTranslation();

  return (
    <Text type={TextSizes.SECONDARY} className={styles.info}>
      <SmallLink href={'https://app.subsocial.network/legal/privacy'}>
        {t('buttons.privacyPolicy')}
      </SmallLink>
      <span />
      <SmallLink href={'https://app.subsocial.network/legal/privacy'}>
        {t('buttons.termsOfUse')}
      </SmallLink>
    </Text>
  );
};

export default ModalSignInInfo;
