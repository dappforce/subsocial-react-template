import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
} from '@reduxjs/toolkit';
import {
  getFirstOrUndefined,
  idToBn,
  isDef,
  isEmptyArray,
  isEmptyStr,
} from '@subsocial/utils';
import {
  FetchManyArgs,
  SelectManyArgs,
  ThunkApiConfig,
} from 'src/store/app/helpers';
import { RootState } from 'src/store/app/rootReducer';
import BN from 'bn.js';
import {
  AccountId,
  PostId,
  ReactionId,
  ReactionType,
} from '@subsocial/api/types/dto';

const sliceName = 'reactions';

const idSeparator = '-';

export type Reaction = {
  reactionId?: ReactionId;
  kind?: any;
};

type AccountAndPostId = string;

export type ReactionStruct = Reaction & {
  id: AccountAndPostId;
};

type Args = {
  myAddress?: AccountId;
};

type PrependParams = Args & {
  ids: EntityId[];
};

export const prependPostIdWithMyAddress = (
  postId: EntityId,
  myAddress: AccountId
) => {
  return (postId as string).startsWith(myAddress)
    ? (postId as string)
    : myAddress + idSeparator + postId;
};

const prependPostIdsWithMyAddress = ({
  ids: postIds,
  myAddress,
}: PrependParams) =>
  myAddress
    ? postIds.map((postId) => prependPostIdWithMyAddress(postId, myAddress))
    : [];

const adapter = createEntityAdapter<ReactionStruct>();

const selectors = adapter.getSelectors<RootState>((state) => state.reactions);

export const { selectIds: selectAllEntityIds, selectById } = selectors;

type SelectFn<Args, Entity> = (state: RootState, args: Args) => Entity;

export type SelectManyFn<Args, Entity> = SelectFn<
  SelectManyArgs<Args>,
  Entity[]
>;

export const selectMyReactionsByPostIds: SelectManyFn<Args, ReactionStruct> = (
  state,
  { myAddress, ids: postIds }
) => {
  if (!myAddress || isEmptyStr(myAddress) || isEmptyArray(postIds)) return [];

  const reactions: ReactionStruct[] = [];
  postIds.forEach((postId: EntityId) => {
    const compositeId = prependPostIdWithMyAddress(postId, myAddress);

    const reaction = selectors.selectById(state, compositeId);

    if (reaction) {
      reactions.push(reaction);
    }
  });

  return reactions;
};

type PostIdAndMyAddress = {
  postId: PostId;
  myAddress?: AccountId;
};

export const selectMyReactionByPostId = (
  state: RootState,
  { postId, myAddress }: PostIdAndMyAddress
) => {
  return getFirstOrUndefined(
    selectMyReactionsByPostIds(state, { ids: [postId], myAddress })
  );
};
type FetchManyReactionsArgs = FetchManyArgs<Args>;

type FetchManyResult = ReactionStruct[];

export const fetchMyReactionsByPostIds = createAsyncThunk<
  FetchManyResult,
  FetchManyReactionsArgs,
  ThunkApiConfig
>(`${sliceName}/fetchMany`, async (args, { getState }): Promise<any> => {
  const { myAddress, api, reload } = args;

  if (!myAddress) return [];

  let newIds = prependPostIdsWithMyAddress(args);

  const postIdByReactionId = new Map<ReactionId, PostId>();
  const reactionByPostId = new Map<PostId, ReactionStruct>();

  const tuples = newIds.map((accountAndPostId) => {
    const [, /* account */ postId] = accountAndPostId.split(idSeparator);
    const entityId = prependPostIdWithMyAddress(postId, myAddress);
    reactionByPostId.set(postId, { id: entityId });

    return [myAddress, idToBn(postId) as unknown as PostId];
  });

  const readyApi = await api.subsocial.substrate.api;
  const reactionIdsFromStorage =
    await readyApi.query.reactions.postReactionIdByAccount.multi(tuples);

  const reactionIds: BN[] = [];

  reactionIdsFromStorage.forEach((reactionIdCodec: any, index: number) => {
    const reactionId = reactionIdCodec as unknown as BN;
    if (!reactionId.eqn(0)) {
      const reactionIdStr = reactionId.toString();
      const postIdStr = tuples[index][1].toString();
      postIdByReactionId.set(reactionIdStr, postIdStr);
      reactionIds.push(reactionId);
    }
  });

  const entities = await api.subsocial.substrate.findReactions(
    reactionIds.filter(isDef)
  );

  entities.forEach(({ kind, id }: { kind: any, id: any }) => {
    const reactionId = id.toString();
    const postId = postIdByReactionId.get(reactionId);

    postId &&
      reactionByPostId.set(postId, {
        id: prependPostIdWithMyAddress(postId, myAddress),
        reactionId,
        kind: kind.toString() as ReactionType,
      });
  });

  return Array.from(reactionByPostId.values());
});

const slice = createSlice({
  name: sliceName,
  initialState: adapter.getInitialState(),
  reducers: {
    upsertMyReaction: adapter.upsertOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchMyReactionsByPostIds.fulfilled,
      (state, { payload }) => {
        if (payload) adapter.upsertMany(state, payload);
      }
    );
  },
});

export const { upsertMyReaction } = slice.actions;

export default slice.reducer;
