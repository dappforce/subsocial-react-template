import { useAppSelector } from 'src/store/app/store';
import {
  fetchPosts,
  SelectPostArgs,
  selectPostStructById,
  upsertPost,
} from './postsSlice';
import { selectPostContentById } from '../contents/contentsSlice';
import { useSelectSpace } from '../spaces/spacesHooks';
import { PostId, PostWithSomeDetails, PostStruct } from '@subsocial/api/types/dto';
import { asCommentStruct } from '@subsocial/api/subsocial/flatteners/utils';
import { useActions } from '../../app/helpers';

export const useSelectPost = (
  postId?: PostId
): PostWithSomeDetails | undefined | any => {
  const struct = useAppSelector((state) =>
    postId ? selectPostStructById(state, postId) : undefined
  );

  const cid = struct?.contentId;
  const content = useAppSelector((state) =>
    cid ? selectPostContentById(state, cid) : undefined
  );

  const rootPostStruct = useAppSelector((state) =>
    struct && struct.isComment
      ? selectPostStructById(state, asCommentStruct(struct).rootPostId)
      : undefined
  );

  const spaceId = struct?.spaceId || rootPostStruct?.spaceId;
  const space = useSelectSpace(spaceId);

  if (!struct || !content) return undefined;

  const id = struct.id;

  const post = {
    id,
    struct,
    content,
  };

  return {
    id,
    post,
    space,
  };
};

export const useCreateReloadPost = () => {
  return useActions<SelectPostArgs>(({ dispatch, api, args: { id } }) =>
    dispatch(fetchPosts({ api, ids: [id], reload: true }))
  );
};

export const useCreateUpsertPost = () => {
  return useActions<PostStruct>(({ dispatch, args }) =>
    dispatch(upsertPost(args))
  );
};
