import { FC } from 'react';
import { CardActions } from '@mui/material';
import ButtonComment from '../../../common/button/button-comment/ButtonComment';
import ButtonShare from '../../../common/button/button-share/ButtonShare';
import { PostActionsProps } from 'src/models/post';
import styles from '../Post.module.sass';
import ButtonVotes from '../../../common/button/buttons-vote/ButtonVotes';
import { ReactionEnum } from '@subsocial/api/flat-subsocial/dto';
import { useModal } from 'src/hooks/useModal';
import ModalCreateSharedPost from 'src/components/modal/modal-create-shared-post/ModalCreateSharedPost';

const PostActions: FC<PostActionsProps> = (props) => {
  const { post, isSharedPost = 0 } = props;
  const { isVisible, toggleModal } = useModal();

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
          value={post.struct.visibleRepliesCount}
        />
        <ButtonShare onClick={toggleModal} />
      </CardActions>
    </>
  );
};

export default PostActions;
