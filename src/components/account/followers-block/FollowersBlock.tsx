import React, { FC } from 'react';
import styles from './FollowersBlock.module.sass';
import { FollowersBlockProps } from 'src/models/common/followers-block';
import { transformCount } from '../../../utils';
import ModalFollow from '../../modal/modal-reactions/modal-follow/ModalFollow';
import Modal from '../../modal/Modal';
import { useModal } from 'src/hooks/useModal';
import { useTranslation } from 'react-i18next';

const FollowersBlock: FC<FollowersBlockProps> = ({
  className,
  followers = 0,
  posts = 0,
  id,
}) => {
  const classname = className
    ? `${className} ${styles.followers}`
    : styles.followers;
  const { isVisible, toggleModal } = useModal();
  const { t } = useTranslation();

  return (
    <div className={classname}>
      <Modal open={isVisible} onClose={toggleModal}>
        <ModalFollow count={followers} id={id} />
      </Modal>
      <button>
        <span className={styles.bold}>{transformCount(posts)}</span>{' '}
        {t('plural.post', { count: posts || 0 })}
      </button>
      <button onClick={toggleModal}>
        <span className={styles.bold}>{transformCount(followers)}</span>{' '}
        {t('plural.follower', { count: followers || 0 })}
      </button>
    </div>
  );
};

export default FollowersBlock;
