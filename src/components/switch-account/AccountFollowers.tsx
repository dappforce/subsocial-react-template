import { FC, useState } from 'react';
import { AccountFollowersProps } from '../../models/account';
import styles from './SwitchAccount.module.sass';
import { useModal } from '../../hooks/useModal';
import Modal from '../modal/Modal';
import ModalConnections from '../modal/modal-reactions/ModalConnections';
import { transformCount } from '../../utils';
import { useTranslation } from 'react-i18next';

const AccountFollowers: FC<AccountFollowersProps> = ({
  className,
  followers = 0,
  following = 0,
  accountId,
}) => {
  const classname = className ? `${className} ${styles.follow}` : styles.follow;
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
    <div className={classname}>
      <Modal open={isVisible} onClose={toggleModal}>
        <ModalConnections
          activeTab={activeTab}
          countFollowing={following}
          countFollowers={followers}
          accountId={accountId}
          onClose={toggleModal}
        />
      </Modal>
      <button onClick={() => openModalWithTab('following')} className={styles.buttonModal}>
        <span className={styles.bold}>{transformCount(following)}</span>{' '}
        {t('plural.following', { count: following || 0 })}
      </button>
      <button onClick={() => openModalWithTab('followers')} className={styles.buttonModal}>
        <span className={styles.bold}>{transformCount(followers)}</span>{' '}
        {t('plural.follower', { count: followers || 0 })}
      </button>
    </div>
  );
};

export default AccountFollowers;
