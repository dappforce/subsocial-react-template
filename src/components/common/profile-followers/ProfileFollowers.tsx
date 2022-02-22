import { FC, useState } from 'react';
import styles from './ProfileFollowers.module.sass';
import { useModal } from 'src/hooks/useModal';
import Modal from '../../modal/Modal';
import ModalConnections from '../../modal/modal-reactions/ModalConnections';
import { transformCount } from 'src/utils';
import { ProfileFollowersProps } from 'src/models/common/profile-followers';
import { useTranslation } from 'react-i18next';

const ProfileFollowers: FC<ProfileFollowersProps> = ({
  className: inputClassName,
  followers,
  following,
  accountId,
}) => {
  const className = inputClassName
    ? `${inputClassName} ${styles.follow}`
    : styles.follow;
  const { isVisible, toggleModal } = useModal();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'following' | 'followers'>(
    'following'
  );

  const openModalWithTab = (tab: 'following' | 'followers') => {
    toggleModal();
    setActiveTab(tab);
  };

  return (
    <div className={className}>
      <Modal open={isVisible} onClose={toggleModal}>
        <ModalConnections
          activeTab={activeTab}
          countFollowing={following}
          countFollowers={followers}
          accountId={accountId}
          onClose={toggleModal}
        />
      </Modal>
      <button onClick={() => openModalWithTab('following')} >
        <span className={styles.bold}>{transformCount(following)}</span>{' '}
        {t('plural.following', { count: following || 0 })}
      </button>
      <button onClick={() => openModalWithTab('followers')}>
        <span className={styles.bold}>{transformCount(followers)}</span>{' '}
        {t('plural.follower', { count: followers || 0 })}
      </button>
    </div>
  );
};

export default ProfileFollowers;
