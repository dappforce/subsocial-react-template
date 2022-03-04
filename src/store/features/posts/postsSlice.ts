import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityId,
} from '@reduxjs/toolkit';
import { getFirstOrUndefined } from '@subsocial/utils';
import {
  Content,
  createFetchOne,
  createSelectUnknownIds,
  FetchManyArgs,
  SelectManyArgs,
  selectManyByIds,
  SelectOneArgs,
  ThunkApiConfig,
} from 'src/store/app/helpers';
import { RootState } from 'src/store/app/rootReducer';
import {
  selectPostContentById,
  upsertManyContent,
} from '../contents/contentsSlice';
import { selectSpaces, upsertManySpace } from '../spaces/spacesSlice';
import { upsertManyProfiles } from '../profiles/profilesSlice';
import { AnyPostId } from '@subsocial/types';
import {
  asCommentStruct,
  asSharedPostStruct,
  getUniqueSpaceIds,
} from '@subsocial/api/flat-subsocial/flatteners';
import {
  PostStruct,
  AccountId,
  PostId,
  PostWithSomeDetails,
  ProfileData,
  SpaceData,
} from '@subsocial/types/dto';
import { fetchMyReactionsByPostIds } from '../reactions/myPostReactionsSlice';
import { Visibility } from '@subsocial/api/filters';

const postsAdapter = createEntityAdapter<PostStruct>();

const postsSelectors = postsAdapter.getSelectors<RootState>(
  (state) => state.posts
);

export const {
  selectById: selectPostStructById,
  selectIds: selectPostIds,
  selectEntities: selectPostEntities,
  selectAll: selectAllPosts,
  selectTotal: selectTotalPosts,
} = postsSelectors;

const _selectPostsByIds = (state: RootState, ids: EntityId[]) =>
  selectManyByIds(state, ids, selectPostStructById, selectPostContentById);

const withSpaceOwner = { withOwner: false };

type Args = {
  visibility?: Visibility;
  withContent?: boolean;
  withOwner?: boolean;
  withSpace?: boolean;
  withExt?: boolean;
};

export type SelectPostArgs = SelectOneArgs<Args>;
export type SelectPostsArgs = SelectManyArgs<Args>;

type FetchPostsArgs = FetchManyArgs<
  Args & {
    withReactionByAccount?: AccountId;
  }
>;

type PostMap<D extends PostWithSomeDetails = PostWithSomeDetails> = Record<
  PostId,
  D
>;

export function selectPostMap<
  D extends PostWithSomeDetails = PostWithSomeDetails
>(state: RootState, props: SelectPostsArgs): PostMap<D> {
  const map: PostMap<D> = {};
  selectPosts(state, props).forEach((p) => (map[p.id] = p as D));
  return map;
}

export function selectPosts(
  state: RootState,
  props: SelectPostsArgs
): PostWithSomeDetails[] {
  const { ids, withOwner = true, withSpace = true, withExt = true } = props;
  const posts = _selectPostsByIds(state, ids);

  const rootPostIds = new Set<PostId>();

  posts.forEach(({ struct }) => {
    if (struct.isComment) {
      const { rootPostId } = asCommentStruct(struct);
      rootPostIds.add(rootPostId);
    }
  });

  const rootPosts = _selectPostsByIds(state, Array.from(rootPostIds));

  const postsMap = selectPostEntities(state);

  const ownerByIdMap = new Map<EntityId, ProfileData>();

  const spaceByIdMap = new Map<EntityId, SpaceData>();
  if (withSpace) {
    const spaceIds = getUniqueSpaceIds(posts.concat(rootPosts));

    const spaces = selectSpaces(state, { ids: spaceIds, ...withSpaceOwner });
    spaces.forEach((space) => {
      spaceByIdMap.set(space.id, space);
    });
  }

  const result: PostWithSomeDetails[] = [];
  posts.forEach((post) => {
    const { struct } = post;
    const { ownerId, spaceId, isComment, isSharedPost } = struct;

    let owner: ProfileData | undefined;
    if (ownerId) {
      owner = ownerByIdMap.get(ownerId);
    }

    let space: SpaceData | undefined;
    if (spaceId) {
      space = spaceByIdMap.get(spaceId);
    }

    if (isComment) {
      const { rootPostId } = asCommentStruct(struct);
      const rootPost = postsMap[rootPostId];

      if (rootPost) {
        space = spaceByIdMap.get(rootPost.spaceId!);
      }
    }

    let ext: PostWithSomeDetails | undefined;

    if (withExt && isSharedPost) {
      const { sharedPostId } = asSharedPostStruct(struct);
      ext = getFirstOrUndefined(selectPosts(state, { ids: [ sharedPostId ] }));
    }

    result.push({ id: post.id, ext, post, owner, space });
  });
  return result;
}

export function selectPost(
  state: RootState,
  props: SelectPostArgs
): PostWithSomeDetails | undefined {
  const { id, ...rest } = props;
  const entities = selectPosts(state, { ids: [ id ], ...rest });
  return getFirstOrUndefined(entities);
}

const selectUnknownPostIds = createSelectUnknownIds(selectPostIds);

export const fetchPosts = createAsyncThunk<
  PostStruct[],
  FetchPostsArgs,
  ThunkApiConfig
>('posts/fetchMany', async (args, { getState, dispatch }) => {
  const {
    api,
    ids,
    withReactionByAccount,
    withContent = true,
    withOwner = true,
    withSpace = true,
    reload,
    visibility,
  } = args;

  let newIds = ids as string[];

  if (!reload) {
    newIds = selectUnknownPostIds(getState(), ids);

    if (!newIds.length) {
      return [];
    }
  }

  withReactionByAccount &&
  dispatch(
    fetchMyReactionsByPostIds({
      ids: newIds,
      myAddress: withReactionByAccount,
      api,
    })
  );

  const posts = await api.findPostsWithAllDetails({
    ids: newIds as unknown as AnyPostId[],
    visibility,
  });

  const structs = posts.map((post) => post.post.struct);

  if (withOwner) {
    const owner = posts.filter((post) => post.owner);

    if (owner.length) {
      const ownerContent = owner.map((post) => ({
        ...post.owner.content,
        id: post.owner.struct.contentId,
      }));
      const ownerStruct = owner.map((post) => post.owner.struct);
      dispatch(upsertManyProfiles(ownerStruct));
      dispatch(upsertManyContent(ownerContent as Content[]));
    }
  }


  if (withSpace) {

    const spaces = posts.map((post) => post.space.struct);

    const spacesContent = posts.map((post) => ({
      ...post.space.content,
      id: post.space.struct.contentId,
    }));

    if (spaces.length) {
      dispatch(upsertManySpace(spaces));
      dispatch(upsertManyContent(spacesContent as Content[]));
    }
  }

  if (withContent) {
    const postsContent = posts.map((post) => ({
      ...post.post.content,
      id: post.post.struct.contentId,
    }));

    if (postsContent.length) {
      dispatch(upsertManyContent(postsContent as Content[]));
    }
  }


  return structs;
});

export const fetchPost = createFetchOne(fetchPosts);

const posts = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {
    upsertPost: postsAdapter.upsertOne,
    upsertManyPost: postsAdapter.upsertMany,
    removePost: postsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, postsAdapter.upsertMany);
  },
});

export const { upsertPost, removePost, upsertManyPost } = posts.actions;

export default posts.reducer;
