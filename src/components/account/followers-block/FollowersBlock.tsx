import React, { FC } from 'react';
import styles from './FollowersBlock.module.sass';
import { FollowersBlockProps } from 'src/models/common/followers-block';
import { transformCount } from '../../../utils';
import ModalFollow from '../../modal/modal-reactions/modal-follow/ModalFollow';
import Modal from '../../modal/Modal';
import { useModal } from 'src/hooks/useModal';
import { pluralize } from '@subsocial/utils';

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
  const [postCount, postLabel] = pluralize({
    count: posts,
    singularText: 'Post',
    pluralText: 'Posts',
  }).split(' ');
  const [followerCount, followerLabel] = pluralize({
    count: followers,
    singularText: 'Follower',
    pluralText: 'Followers',
  }).split(' ');

  return (
    <div className={classname}>
      <Modal open={isVisible} onClose={toggleModal}>
        <ModalFollow count={followers} id={id} />
      </Modal>
      <button>
        <span className={styles.bold}>{transformCount(+postCount)}</span>{' '}
        {postLabel}
      </button>
      <button onClick={toggleModal}>
        <span className={styles.bold}>{transformCount(+followerCount)}</span>{' '}
        {followerLabel}
      </button>
    </div>
  );
};

export default FollowersBlock;
