import React from 'react';
import { TextSizes } from 'src/models/common/typography';
import styles from './ModalSignIn.module.sass';
import SmallLink from '../../common/links/small-link/SmallLink';
import Text from '../../common/text/Text';

const ModalSignInInfo = () => {
  return (
    <Text type={TextSizes.SECONDARY} className={styles.info}>
      <SmallLink href={'https://app.subsocial.network/legal/privacy'}>
        Privacy Policy
      </SmallLink>
      <span />
      <SmallLink href={'https://app.subsocial.network/legal/privacy'}>
        Terms of Use
      </SmallLink>
    </Text>
  );
};

export default ModalSignInInfo;
