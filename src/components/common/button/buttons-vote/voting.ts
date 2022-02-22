import BN from 'bn.js';
import { SubmittableResult } from '@polkadot/api';
import { ReactionType, PostStruct } from '@subsocial/types/dto';
import { Reaction } from 'src/store/features/reactions/myPostReactionsSlice';

type Props = {
  post: PostStruct;
  oldReaction?: Reaction;
  newKind: ReactionType;
};

export const getPostStructWithUpdatedCounts = ({
  post,
  newKind,
  oldReaction,
}: Props) => {
  let { upvotesCount, downvotesCount } = post;
  const { reactionId, kind: oldKind } = oldReaction || ({} as Reaction);

  const noOldReaction = !reactionId;
  const isNewKindUpvote = newKind === 'Upvote';

  if (noOldReaction) {
    isNewKindUpvote ? upvotesCount++ : downvotesCount++;
  } else if (oldKind === newKind) {
    isNewKindUpvote ? upvotesCount-- : downvotesCount--;
  } else {
    if (isNewKindUpvote) {
      upvotesCount++;
      downvotesCount--;
    } else {
      upvotesCount--;
      downvotesCount++;
    }
  }

  return { ...post, upvotesCount, downvotesCount };
};

export function getNewIdsFromEvent(txResult: SubmittableResult): BN[] {
  const newIds: BN[] = [];

  txResult.events.find((event) => {
    const {
      event: { data, method },
    } = event;
    if (method.indexOf('Created') >= 0) {
      const [, /* owner */ ...ids] = data.toArray();
      newIds.push(...(ids as unknown as BN[]));
      return true;
    }
    return false;
  });

  return newIds;
}
