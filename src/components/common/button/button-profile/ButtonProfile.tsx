import React, { FC } from 'react';
import styles from './ButtonProfile.module.sass';
import AvatarElement from '../../avatar/AvatarElement';
import { AvatarSizes } from 'src/models/common/avatar';
import Text from '../../text/Text';
import { TextSizes } from 'src/models/common/typography';
import classNames from 'classnames';
import Balance from '../../balance/Balance';
import { useResponsiveSize } from 'src/components/responsive/ResponsiveContext';

interface ButtonProfileProps {
  onClick: () => void,
  avatar?: string,
  address: string,
  name?: string,
}

const ButtonProfile: FC<ButtonProfileProps> = ({ onClick, name, avatar, address }) => {
  const { isMobile } = useResponsiveSize();

  return (
    <button
      onClick={onClick}
      className={styles.profile}
    >
      <AvatarElement
        src={avatar}
        size={AvatarSizes.SMALLER}
        id={address}
      />

      <div>
        <Text
          type={TextSizes.SECONDARY}
          className={classNames(styles.name, {
            [styles.mobileName]: isMobile,
          })}
        >
          {name}
        </Text>
        <Balance
          isIcon={false}
          address={address}
          className={styles.balance}
        />
      </div>
    </button>
  );
};

export default ButtonProfile;
