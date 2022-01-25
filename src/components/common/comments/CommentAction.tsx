import React, { FC } from 'react';
import styles from './Comments.module.sass';
import ButtonReply from '../button/ButtonReply';
import { CommentActionProps } from 'src/models/comments';
import ButtonVotes from '../button/buttons-vote/ButtonVotes';
import { ReactionEnum } from '@subsocial/api/flat-subsocial/dto';

const CommentAction: FC<CommentActionProps> = ({ onReply, comment }) => (
  <div className={styles.group}>
    <ButtonVotes post={comment} reactionEnum={ReactionEnum.Upvote} withLabel />
    <ButtonVotes
      post={comment}
      reactionEnum={ReactionEnum.Downvote}
      withLabel
    />
    <ButtonReply onClick={onReply} />
  </div>
);

export default CommentAction;
