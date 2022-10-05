import { FC } from 'react';
import { CardActions } from '@mui/material';
import ButtonComment from '../../../common/button/button-comment/ButtonComment';
import ButtonShare from '../../../common/button/button-share/ButtonShare';
import { PostActionsProps } from 'src/models/post';
import styles from '../Post.module.sass';
import ButtonVotes from '../../../common/button/buttons-vote/ButtonVotes';
import { ReactionEnum } from '@subsocial/api/types/dto';
import { useModal } from 'src/hooks/useModal';
import ModalCreateSharedPost from 'src/components/modal/modal-create-shared-post/ModalCreateSharedPost';
import { useAuth } from 'src/components/auth/AuthContext';
import { ACCOUNT_STATUS } from 'src/models/auth';

const PostActions: FC<PostActionsProps> = (props) => {
  const { post, isSharedPost = 0 } = props;
  const { repliesCount, sharesCount } = post.struct
  const { isVisible, toggleModal } = useModal();

  const { openSingInModal, status } = useAuth();

  const isAuthRequired = status !== ACCOUNT_STATUS.AUTHORIZED;

  const onClickShare = () => {
    if (isAuthRequired) {
      openSingInModal(true);
      return openSingInModal(false);
    } else {
      toggleModal();
    }
  }

  const className = isSharedPost
    ? `${styles.sharedPost} ${styles.actions}`
    : styles.actions;

  return (
    <>
      <ModalCreateSharedPost
        postId={post.id}
        open={isVisible}
        onClose={toggleModal}
      />
      <CardActions className={className}>
        <ButtonVotes post={post.struct} reactionEnum={ReactionEnum.Upvote} />
        <ButtonVotes post={post.struct} reactionEnum={ReactionEnum.Downvote} />
        <ButtonComment
          onClick={props.toggleComments}
          value={repliesCount}
        />
        <ButtonShare
          onClick={onClickShare}
          value={sharesCount}
        />
      </CardActions>
    </>
  );
};

export default PostActions;
