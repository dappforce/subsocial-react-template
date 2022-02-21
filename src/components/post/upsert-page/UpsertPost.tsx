import { EntityId } from '@subsocial/types/dto';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useApi } from 'src/components/api';
import { useSelectPost } from 'src/store/app/hooks';
import { useAppDispatch } from 'src/store/app/store';
import { fetchPosts } from 'src/store/features/posts/postsSlice';
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
