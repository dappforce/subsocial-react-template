import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { FetchOneArgs, ThunkApiConfig } from 'src/store/app/helpers';
import { SelectOneFn } from 'src/store/app/hooksCommon';
import { RootState } from 'src/store/app/rootReducer';
import { AccountId, SpaceId } from '@subsocial/api/types/dto';
import { bnsToIds } from '@subsocial/utils';

type Entity = {
  /** `id` is an account address id that follows spaces. */
  id: AccountId;
  followedSpaceIds: SpaceId[];
};

type MaybeEntity = Entity | undefined;

const adapter = createEntityAdapter<Entity>();

const selectors = adapter.getSelectors<RootState>(
  (state) => state.followedSpaceIds
);

export const selectEntityOfSpaceIdsByFollower: SelectOneFn<
  Args,
  MaybeEntity
> = (state, { id }) => {
  return selectors.selectById(state, id);
};

export const selectSpaceIdsByFollower = (state: RootState, id: AccountId) => {
  return selectEntityOfSpaceIdsByFollower(state, { id })?.followedSpaceIds;
};

type Args = {};

type FetchOneSpaceIdsArgs = FetchOneArgs<Args>;

export const fetchEntityOfSpaceIdsByFollower = createAsyncThunk<
  MaybeEntity,
  FetchOneSpaceIdsArgs,
  ThunkApiConfig
>(
  'followedSpaceIds/fetchOne',
  async ({ api, id, reload }, { getState }): Promise<MaybeEntity> => {
    const follower = id as AccountId;
    const knownSpaceIds = selectSpaceIdsByFollower(getState(), follower);
    const isKnownFollower = typeof knownSpaceIds !== 'undefined';

    if (!reload && isKnownFollower) {
      // Nothing to load: space ids followed by this account are already loaded.
      return undefined;
    }

    const spaceIds = await api.subsocial.substrate.spaceIdsFollowedByAccount(
      follower
    );

    return {
      id: follower,
      followedSpaceIds: bnsToIds(spaceIds),
    };
  }
);

const slice = createSlice({
  name: 'followedSpaceIds',
  initialState: adapter.getInitialState(),
  reducers: {
    upsertFollowedSpaceIdsByAccount: adapter.upsertOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchEntityOfSpaceIdsByFollower.fulfilled,
      (state, { payload }) => {
        if (payload) adapter.upsertOne(state, payload);
      }
    );
  },
});

export const { upsertFollowedSpaceIdsByAccount } = slice.actions;

export default slice.reducer;
