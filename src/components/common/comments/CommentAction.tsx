import React, { FC } from 'react';
import styles from './Comments.module.sass';
import ButtonReply from '../button/ButtonReply';
import { CommentActionProps } from 'src/models/comments';
import ButtonVotes from '../button/buttons-vote/ButtonVotes';
import { ReactionEnum } from '@subsocial/types/dto';
import { useResponsiveSize } from "../../responsive/ResponsiveContext";

const CommentAction: FC<CommentActionProps> = ({ onReply, comment }) => {
  const { isMobile } = useResponsiveSize();

  return (
    <div className={styles.group}>
      <ButtonVotes
        post={comment}
        reactionEnum={ReactionEnum.Upvote}
        withLabel={!isMobile}
      />
      <ButtonVotes
        post={comment}
        reactionEnum={ReactionEnum.Downvote}
        withLabel={!isMobile}
      />
      <ButtonReply
        onClick={onReply}
        withLabel={!isMobile}
      />
    </div>
  );
};

export default CommentAction;
