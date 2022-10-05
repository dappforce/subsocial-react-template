import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {
  CommonFetchProps,
  createSelectUnknownIds,
  ThunkApiConfig,
} from 'src/store/app/helpers';
import { RootState } from 'src/store/app/rootReducer';
import { fetchPosts } from '../posts/postsSlice';
import {
  AccountId,
  PostId,
  PostWithSomeDetails,
} from '@subsocial/api/types/dto';
import { bnsToIds, idToBn } from '@subsocial/utils';

export type ReplyIdsByPostId = {
  id: PostId;
  replyIds: PostId[];
};

export type RepliesByPostIdMap = Record<PostId, PostWithSomeDetails[]>;

const replyIdsAdapter = createEntityAdapter<ReplyIdsByPostId>();

const replyIdsSelectors = replyIdsAdapter.getSelectors<RootState>(
  (state) => state.replyIds
);

export const {
  selectById: selectReplyIds,
  selectIds: selectParentIds,
  selectEntities: selectReplyIdsEntities,
  selectAll: selectAllReplyIds,
  selectTotal: selectTotalParentIds,
} = replyIdsSelectors;

type FetchManyPostRepliesArgs = CommonFetchProps & {
  id: PostId;
  myAddress?: AccountId;
};

const selectUnknownParentIds = createSelectUnknownIds(selectParentIds);

export const fetchPostReplyIds = createAsyncThunk<
  ReplyIdsByPostId[],
  FetchManyPostRepliesArgs,
  ThunkApiConfig
>('replyIds/fetchMany', async (args, { getState, dispatch }) => {
  const { id: parentId, api, myAddress } = args;

  const parentIds = selectUnknownParentIds(getState(), [parentId]);

  if (!parentIds.length) {
    return [];
  }

  const replyBnIds = await api.subsocial.substrate.getReplyIdsByPostId(
      parentId
  );

  const replyIds = bnsToIds(replyBnIds);

  await dispatch(
    fetchPosts({
      api,
      ids: replyIds,
      withSpace: false,
      withReactionByAccount: myAddress,
    })
  );

  return [
    {
      id: parentId,
      replyIds,
    },
  ];
});

const replyIds = createSlice({
  name: 'replyIds',
  initialState: replyIdsAdapter.getInitialState(),
  reducers: {
    upsertReplyIdsByPostId: replyIdsAdapter.upsertOne,
    removeReplyIdsByPostId: replyIdsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostReplyIds.fulfilled, replyIdsAdapter.upsertMany);
  },
});

export const { upsertReplyIdsByPostId } = replyIds.actions;

export default replyIds.reducer;
