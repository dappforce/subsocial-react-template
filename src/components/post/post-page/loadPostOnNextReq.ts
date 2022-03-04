import { NextContextWithRedux } from 'src/store/app';
import { PostWithSomeDetails, SpaceWithSomeDetails } from '@subsocial/types/dto';
import { bnsToIds, idToBn } from '@subsocial/utils';
import { fetchPosts, selectPost } from 'src/store/features/posts/postsSlice';
import { fetchSpaces, selectSpace } from 'src/store/features/spaces/spacesSlice';
import { fetchProfile } from 'src/store/features/profiles/profilesSlice';

export async function loadPostOnNextReq({
                                          context,
                                          dispatch,
                                          subsocial,
                                          reduxStore,
                                        }: NextContextWithRedux): Promise<PostWithSomeDetails> {
  const { query } = context;

  if (!query.post || typeof query.post !== 'string')
    return {} as PostWithSomeDetails;

  const url = query.post?.split('-');

  const postId = url[url.length - 1];
  const replyIds = await subsocial.subsocial.substrate.getReplyIdsByPostId(
    idToBn(postId)
  );

  const ids = bnsToIds(replyIds).concat(postId);

  await dispatch(fetchPosts({ api: subsocial, ids, reload: true, withSpace: false, withOwner: false }));

  const postData = selectPost(reduxStore.getState(), { id: postId });

  let space: SpaceWithSomeDetails | undefined;

  if (!postData) return {} as PostWithSomeDetails;

  if (postData.post.struct.spaceId) {

    await dispatch(fetchSpaces({
      api: subsocial,
      ids: [ postData.post.struct.spaceId ],
      withOwner: false,
      withUnlisted: true
    }));

    space = selectSpace(reduxStore.getState(), { id: postData.post.struct.spaceId });
  }

  await dispatch(fetchProfile({ api: subsocial, id: postData.post.struct.ownerId }));

  return { post: postData.post, space } as unknown as PostWithSomeDetails;
}
