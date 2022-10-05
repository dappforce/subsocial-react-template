import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
} from '@reduxjs/toolkit';
import {
  createSelectUnknownIds,
  FetchManyArgs,
  HasHiddenVisibility,
  SelectManyArgs,
  selectManyByIds,
  SelectOneArgs,
  ThunkApiConfig,
  Content,
  createFetchOneSpace,
} from 'src/store/app/helpers';
import { RootState } from 'src/store/app/rootReducer';
import {
  selectSpaceContentById,
  upsertManyContent,
} from '../contents/contentsSlice';
import { getFirstOrUndefined } from '@subsocial/utils';
import {
  SpaceData,
  SpaceId,
  SpaceWithSomeDetails,
  SpaceStruct,
} from '@subsocial/api/types/dto';

const spacesAdapter = createEntityAdapter<SpaceStruct>();

const spacesSelectors = spacesAdapter.getSelectors<RootState>(
  (state) => state.spaces
);

export const {
  selectById: selectSpaceStructById,
  selectIds: selectSpaceIds,
  selectEntities: selectSpaceEntities,
  selectAll: selectAllSpaces,
  selectTotal: selectTotalSpaces,
} = spacesSelectors;

export type SpaceVisibility = HasHiddenVisibility;

type Args = {
  visibility?: SpaceVisibility;
  withContent?: boolean;
  withOwner?: boolean;
  withUnlisted?: boolean;
};

export type SelectSpacesArgs = SelectManyArgs<Args>;
export type SelectSpaceArgs = SelectOneArgs<Args>;

const _selectSpacesByIds = (state: RootState, ids: EntityId[]) =>
  selectManyByIds(state, ids, selectSpaceStructById, selectSpaceContentById);

export function selectSpace(
  state: RootState,
  props: SelectSpaceArgs
): SpaceWithSomeDetails | undefined {
  return getFirstOrUndefined(selectSpaces(state, { ids: [ props.id ] }));
}

export function selectSpaces(
  state: RootState,
  props: SelectSpacesArgs
): SpaceWithSomeDetails[] {
  const { ids } = props;
  const spaces = _selectSpacesByIds(state, ids);

  return spaces;
}

type FetchSpacesArgs = FetchManyArgs<Args> & { withUnlisted?: boolean };

const selectUnknownSpaceIds = createSelectUnknownIds(selectSpaceIds);

export const fetchSpaces = createAsyncThunk<SpaceStruct[],
  FetchSpacesArgs,
  ThunkApiConfig>(
  'spaces/fetchMany',
  async (
    {
      api,
      ids,
      withContent = true,
      withOwner = true,
      reload = true,
      withUnlisted = false,
    },
    { getState, dispatch }
  ) => {
    let newIds: SpaceId[] = ids as string[];

    if (!reload) {
      newIds = selectUnknownSpaceIds(getState(), ids);
      if (!newIds.length) {
        return [];
      }
    }

    let spaces: SpaceData[] = await api.findPublicSpaces(newIds);

    if (withUnlisted) {
      const unlistedSpaces: SpaceData[] = await api.findUnlistedSpaces(newIds);
      spaces = spaces.concat(unlistedSpaces);
    }

    const entitiesPromise = spaces.map(async ({ struct }) => {
      const postsCount = (await api.blockchain.postsCountBySpaceId(struct.id)).toString()
      return {...struct, postsCount} as unknown as SpaceStruct;
    });

    const entities = await Promise.all(entitiesPromise);

    if (withContent) {
      const content = spaces.map((item) => ({
        ...item.content,
        id: item.struct.contentId,
      }));

      if (content.length) {
        dispatch(upsertManyContent(content as Content[]));
      }
    }

    return entities;
  }
);

export const fetchSpace = createFetchOneSpace(fetchSpaces);

const spaces = createSlice({
  name: 'spaces',
  initialState: spacesAdapter.getInitialState(),
  reducers: {
    updateSpace: spacesAdapter.updateOne,
    upsertManySpace: spacesAdapter.upsertMany,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSpaces.fulfilled, spacesAdapter.upsertMany);
  },
});

export const { updateSpace, upsertManySpace } = spaces.actions;

export default spaces.reducer;
