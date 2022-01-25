import { CommonFetchPropsAndIds, Content } from '../../app/helpers';
import {
  AsyncThunk,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {
  createFetchOne,
  createSelectUnknownIds,
  SelectByIdFn,
  ThunkApiConfig,
} from 'src/rtk/app/helpers';
import { RootState } from 'src/rtk/app/rootReducer';
import {
  CommentContent,
  CommonContent,
  PostContent,
  ProfileContent,
  SharedPostContent,
  SpaceContent,
} from '@subsocial/api/flat-subsocial/dto';
import { convertToDerivedContent } from '@subsocial/api/flat-subsocial/utils';

/** Content with id */

type SelectByIdResult<C extends CommonContent> = SelectByIdFn<Content<C>>;

const contentsAdapter = createEntityAdapter<Content>();

const contentsSelectors = contentsAdapter.getSelectors<RootState>(
  (state) => state.contents
);

const { selectById } = contentsSelectors;

export const selectProfileContentById =
  selectById as SelectByIdResult<ProfileContent>;
export const selectSpaceContentById =
  selectById as SelectByIdResult<SpaceContent>;
export const selectPostContentById =
  selectById as SelectByIdResult<PostContent>;
export const selectCommentContentById =
  selectById as SelectByIdResult<CommentContent>;
export const selectSharedPostContentById =
  selectById as SelectByIdResult<SharedPostContent>;

// Rename the exports for readability in component usage
export const {
  // selectById: selectContentById,
  selectIds: selectContentIds,
  selectEntities: selectContentEntities,
  selectAll: selectAllContents,
  selectTotal: selectTotalContents,
} = contentsSelectors;

const selectUnknownContentIds = createSelectUnknownIds(selectContentIds);

type FetchContentFn<C extends CommonContent> = AsyncThunk<
  Content<C>[],
  CommonFetchPropsAndIds,
  ThunkApiConfig
>;

export const fetchContents = createAsyncThunk<
  Content[],
  CommonFetchPropsAndIds,
  ThunkApiConfig
>('contents/fetchMany', async ({ api, ids }, { getState }) => {
  const newIds = selectUnknownContentIds(getState(), ids);
  if (!newIds.length) {
    return [];
  }

  const contents = await api.subsocial.ipfs.getContentArray(newIds);

  return Object.entries(contents).map(([id, content]) => {
    const derivedContent = convertToDerivedContent(content) as CommentContent;

    return { id, ...derivedContent };
  });
});

export const fetchProfileContents =
  fetchContents as FetchContentFn<ProfileContent>;
export const fetchSpaceContents = fetchContents as FetchContentFn<SpaceContent>;
export const fetchPostContents = fetchContents as FetchContentFn<PostContent>;
export const fetchCommentContents =
  fetchContents as FetchContentFn<CommentContent>;
export const fetchSharedPostContents =
  fetchContents as FetchContentFn<SharedPostContent>;

export const fetchContent = createFetchOne(fetchContents);

const contents = createSlice({
  name: 'contents',
  initialState: contentsAdapter.getInitialState(),
  reducers: {
    upsertContent: contentsAdapter.upsertOne,
    upsertManyContent: contentsAdapter.upsertMany,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContents.fulfilled, contentsAdapter.upsertMany);
  },
});

export const { upsertContent, upsertManyContent } = contents.actions;

export default contents.reducer;
