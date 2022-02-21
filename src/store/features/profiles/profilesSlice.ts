import {
  EntityId,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {
  CommonVisibility,
  createFetchOne,
  createSelectUnknownIds,
  FetchManyArgs,
  SelectManyArgs,
  selectManyByIds,
  selectOneById,
  ThunkApiConfig,
  Content,
  SelectOneArgs,
} from 'src/store/app/helpers';
import { RootState } from 'src/store/app/rootReducer';
import { asString } from '@subsocial/utils';
import {
  selectProfileContentById,
  upsertManyContent,
} from '../contents/contentsSlice';
import { ProfileData, ProfileStruct } from '@subsocial/types/dto';

const profilesAdapter = createEntityAdapter<ProfileStruct>();
const profilesSelectors = profilesAdapter.getSelectors<RootState>(
  (state) => state.profiles
);

export const {
  selectById: selectProfileStructById,
  selectIds: selectProfileIds,
  selectEntities: selectProfileEntities,
  selectAll: selectAllProfiles,
  selectTotal: selectTotalProfiles,
} = profilesSelectors;

export type ProfileVisibility = CommonVisibility;

type Args = {
  visibility?: ProfileVisibility;
  withContent?: boolean;
};
export type SelectProfileArgs = SelectOneArgs<Args>;
export type SelectProfilesArgs = SelectManyArgs<Args>;

type FetchProfilesArgs = FetchManyArgs<Args>;

export const selectProfile = (
  state: RootState,
  id: EntityId
): ProfileData | undefined =>
  selectOneById(state, id, selectProfileStructById, selectProfileContentById);

export const selectProfiles = (
  state: RootState,
  { ids }: SelectProfilesArgs
): ProfileData[] =>
  selectManyByIds(
    state,
    ids,
    selectProfileStructById,
    selectProfileContentById
  );

const selectUnknownProfileIds = createSelectUnknownIds(selectProfileIds);

export const fetchProfiles = createAsyncThunk<
  ProfileStruct[],
  FetchProfilesArgs,
  ThunkApiConfig
>(
  'profiles/fetchMany',
  async (
    { api, ids: accountIds, withContent = true, reload = true },
    { getState, dispatch }
  ) => {
    const ids = accountIds.map(asString);

    let newIds = ids;

    if (!reload) {
      newIds = selectUnknownProfileIds(getState(), ids);
      if (!newIds.length) {
        return [];
      }
    }

    const profile = await api.findProfiles(newIds);

    const content = {
      entities: profile.map((item) => ({
        ...item.content,
        id: item.struct.contentId,
      })),
      ids: profile.map((item) => item.id),
      struct: profile.map((item) => item.struct),
    };

    if (withContent) {
      if (content.entities.length) {
        dispatch(upsertManyContent(content.entities as Content[]));
      }
    }

    return content.struct;
  }
);

export const fetchProfile = createFetchOne(fetchProfiles);

const profiles = createSlice({
  name: 'profiles',
  initialState: profilesAdapter.getInitialState(),
  reducers: {
    updateProfile: profilesAdapter.updateOne,
    upsertManyProfiles: profilesAdapter.upsertMany,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfiles.fulfilled, profilesAdapter.upsertMany);
  },
});

export const { upsertManyProfiles } = profiles.actions;

export default profiles.reducer;
