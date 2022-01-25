import {
  fetchMyReactionsByPostIds,
  prependPostIdWithMyAddress,
  ReactionStruct,
  upsertMyReaction,
} from './myPostReactionsSlice';
import { AccountId, PostId } from '@subsocial/api/flat-subsocial/dto';
import { useApi } from '../../../components/api';
import { useAppDispatch } from '../../app/store';
import { useMyAddress } from '../myAccount/myAccountHooks';
import { useActions } from '../../app/helpers';

export const useFetchMyReactionsByPostId = (
  postId: PostId,
  myAddress: AccountId
) => {
  return useFetchMyReactionsByPostIds([postId], myAddress);
};

export const useFetchMyReactionsByPostIds = (
  postIds: PostId[],
  myAddress: AccountId
) => {
  const dispatch = useAppDispatch();
  const { api } = useApi();

  return dispatch(fetchMyReactionsByPostIds({ ids: postIds, myAddress, api }));
};

export const useCreateUpsertMyReaction = () => {
  const myAddress = useMyAddress();
  return useActions<ReactionStruct>(
    ({ dispatch, args: { id: postId, reactionId, kind } }) => {
      myAddress &&
        dispatch(
          upsertMyReaction({
            id: prependPostIdWithMyAddress(postId, myAddress),
            reactionId,
            kind,
          })
        );
    }
  );
};
