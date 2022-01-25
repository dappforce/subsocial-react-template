import { EntityId } from '@subsocial/api/flat-subsocial/dto';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useApi } from 'src/components/api';
import { useSelectPost } from 'src/rtk/app/hooks';
import { useAppDispatch } from 'src/rtk/app/store';
import { fetchPosts } from 'src/rtk/features/posts/postsSlice';
import { EditorPost } from './EditorPost';

export const UpsertPost = () => {
  const router = useRouter();
  const { post } = router.query;
  const postId = post as string | undefined;
  const dispatch = useAppDispatch();
  const { api } = useApi();
  const postData = useSelectPost(postId as string | undefined);
  const isWithLink = !!postData?.post.content?.link;

  useEffect(() => {
    if (postId) {
      dispatch(fetchPosts({ ids: [postId as EntityId], api }));
    }
  }, []);

  return <EditorPost isWithLink={isWithLink} postId={postId} />;
};
