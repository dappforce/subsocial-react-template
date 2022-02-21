import styles from './ButtonsVote.module.sass';
import { FC, useMemo } from 'react';
import Text from '../../text/Text';
import { TextSizes } from 'src/models/common/typography';
import ButtonIcon from '../button-icon/ButtonIcon';
import {
  ButtonVoteProps,
  InnerButtonVoteProps,
} from 'src/models/common/button';
import { useCreateUpsertMyReaction } from 'src/store/features/reactions/myPostReactionsHooks';
import {
  useCreateReloadPost,
  useCreateUpsertPost,
} from 'src/store/features/posts/postsHooks';
import {
  Reaction,
  ReactionStruct,
  selectMyReactionByPostId,
} from 'src/store/features/reactions/myPostReactionsSlice';
import {
  ReactionEnum,
  ReactionId,
  ReactionType,
} from '@subsocial/types/dto';
import { ReactionKind } from '@subsocial/types/substrate/classes';
import TxButton from '../TxButton';
import { getNewIdsFromEvent, getPostStructWithUpdatedCounts } from './voting';
import { useMyAddress } from 'src/store/features/myAccount/myAccountHooks';
import { useAppSelector } from 'src/store/app/store';
import { SubmittableResult } from '@polkadot/api';
import { useTranslation } from 'react-i18next';
import IconLike from "../../icons/IconLike";
import IconDislike from "../../icons/IconDislike";

const ButtonVotes: FC<ButtonVoteProps> = (props) => {
  const myAddress = useMyAddress();
  const reaction = useAppSelector((state) =>
    selectMyReactionByPostId(state, { postId: props.post.id, myAddress })
  );

  return (
    <InnerButtonVotes reaction={reaction} accountId={myAddress} {...props} />
  );
};

const InnerButtonVotes: FC<InnerButtonVoteProps> = ({
  withLabel,
  reactionEnum,
  post,
  reaction: oldReaction = { id: post?.id } as ReactionStruct,
  ...props
}) => {
  const { id: postId, upvotesCount, downvotesCount } = post;
  const { reactionId, kind: oldKind } = oldReaction;

  const upsertMyReaction = useCreateUpsertMyReaction();
  const upsertPost = useCreateUpsertPost();
  const reloadPost = useCreateReloadPost();

  const newKind = reactionEnum.valueOf() as ReactionType;
  const isUpvote = newKind === ReactionEnum.Upvote;
  const type = isUpvote ? 'upvote' : 'downvote';
  const count = isUpvote ? upvotesCount : downvotesCount;
  const { t } = useTranslation();

  const args = { id: postId };

  const buildTxParams = () => {
    if (!reactionId) {
      // Case: Add a new reaction
      return [postId, ReactionKind(newKind)];
    } else if (oldKind !== newKind) {
      // Case: Change a kind of the existing reaction
      return [postId, reactionId, ReactionKind(newKind)];
    } else {
      // Case: Delete the existing reaction
      return [postId, reactionId];
    }
  };

  const updateOrDeleteReaction = (_newReactionId?: ReactionId) => {
    let newReactionId = _newReactionId || reactionId;

    if (!newReactionId && !isActive) {
      newReactionId = `fakeId-${postId}`;
    }

    const newReaction: Reaction = {
      reactionId: newReactionId,
      kind: isActive ? undefined : newKind,
    };

    console.log(newReaction)


    upsertMyReaction({ id: postId, ...newReaction });
  };

  const isActive = oldKind === newKind;

  const changeReactionTx = isActive
    ? 'reactions.deletePostReaction'
    : 'reactions.updatePostReaction';

  const onClick = () => {
    updateOrDeleteReaction();
    upsertPost(getPostStructWithUpdatedCounts({ post, oldReaction, newKind }));
  };

  const onFailed = () => {
    upsertMyReaction(oldReaction);
    upsertPost(post);
  };

  const onSuccess = (txResult: SubmittableResult) => {
    reloadPost(args);

    const newReactionId =
      reactionId || getNewIdsFromEvent(txResult)[1]?.toString();
    updateOrDeleteReaction(newReactionId);
  };

  const content = useMemo(
    () => ({
      downvote: {
        disable: (
          <IconDislike type={'outline'} />
        ),
        active: (
          <IconDislike type={'contained'} />
        ),
        label: t('buttons.downvote'),
        styles: styles.red,
      },
      upvote: {
        disable: (
          <IconLike type={'outline'} />
        ),
        active: (
          <IconLike type={'contained'} />
        ),
        label: t('buttons.upvote'),
        styles: styles.green,
      },
    }),
    [t]
  );

  return (
    <TxButton
      tx={!reactionId ? 'reactions.createPostReaction' : changeReactionTx}
      params={buildTxParams}
      onClick={onClick}
      onSuccess={onSuccess}
      onFailed={onFailed}
      component={ButtonIcon}
      {...props}
    >
      {!isActive ? content[type].disable : content[type].active}
      {!withLabel && count > 0 && (
        <Text
          type={TextSizes.NORMAL}
          className={`${styles.value} ${isActive ? content[type].styles : ''}`}
        >
          {count}
        </Text>
      )}
      {withLabel && (
        <Text type={TextSizes.NORMAL} className={styles.label}>
          {content[type].label} {count > 0 && `(${count})`}
        </Text>
      )}
    </TxButton>
  );
};

export default ButtonVotes;
