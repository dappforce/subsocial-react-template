import { ReactionType, PostStruct } from '@subsocial/api/types/dto';
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
