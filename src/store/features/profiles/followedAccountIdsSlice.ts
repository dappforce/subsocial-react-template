import { GenericAccountId } from '@polkadot/types';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { FetchOneArgs, ThunkApiConfig } from 'src/store/app/helpers';
import { SelectOneFn } from 'src/store/app/hooksCommon';
import { RootState } from 'src/store/app/rootReducer';
import { AccountId } from '@subsocial/api/types/dto';

type Entity = {
  id: AccountId;
  followingAccountIds: AccountId[];
};

type MaybeEntity = Entity | undefined;

const adapter = createEntityAdapter<Entity>();

const selectors = adapter.getSelectors<RootState>(
  (state) => state.followedAccountIds
);

export const selectEntityOfAccountIdsByFollower: SelectOneFn<
  Args,
  MaybeEntity
> = (state, { id: follower }) => selectors.selectById(state, follower);

export const selectAccountIdsByFollower = (state: RootState, id: AccountId) =>
  selectEntityOfAccountIdsByFollower(state, { id })?.followingAccountIds;

type Args = {
  reload?: boolean;
};

type FetchOneAccountIdsArgs = FetchOneArgs<Args>;

export const fetchEntityOfAccountIdsByFollower = createAsyncThunk<
  MaybeEntity,
  FetchOneAccountIdsArgs,
  ThunkApiConfig
>(
  'followedAccountIds/fetchOne',
  async ({ api, id, reload }, { getState }): Promise<MaybeEntity> => {
    const follower = id as AccountId;
    const knownAccountIds = selectAccountIdsByFollower(getState(), follower);
    const isKnownFollower = typeof knownAccountIds !== 'undefined';

    if (!reload && isKnownFollower) {
      return undefined;
    }

    const readyApi = await api.subsocial.substrate.api;
    const accountIds =
      (await readyApi.query.profileFollows.accountsFollowedByAccount(
        follower
      )) as unknown as GenericAccountId[];

    return {
      id: follower,
      followingAccountIds: accountIds.map((x) => x.toString()),
    };
  }
);

const slice = createSlice({
  name: 'followedAccountIds',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchEntityOfAccountIdsByFollower.fulfilled,
      (state, { payload }) => {
        if (payload) adapter.upsertOne(state, payload);
      }
    );
  },
});

export default slice.reducer;
