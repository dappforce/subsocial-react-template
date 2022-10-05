import type { NextPage } from 'next';
import Layout from '../../layout/Layout';
import SpaceView from '../../space/space-item/Space';
import Comments from '../../common/comments/Comments';
import PostFull from '../post-full/PostFull';
import { fetchPost } from 'src/store/features/posts/postsSlice';
import { getInitialPropsWithRedux } from 'src/store/app';
import { asCommentStruct } from '@subsocial/api/subsocial/flatteners/utils';
import { PostWithAllDetails, PostStruct } from '@subsocial/api/types/dto';
import { useIsUnlistedPost } from 'src/hooks/useIsUnlistedPost';
import ErrorPage from 'next/error';
import { loadPostOnNextReq } from './loadPostOnNextReq';

export type PostDetailsProps = {
  postData: PostWithAllDetails;
};

const PostPage: NextPage<PostDetailsProps> = (props) => {
  const { postData } = props;
  const { post, space } = postData;
  const isHiddenPost = useIsUnlistedPost({ post: post.struct, space: space?.struct })

  if (!post.content || isHiddenPost) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <PostFull post={post} space={space} id={post.id}/>
      <SpaceView spaceData={space} withUnlisted />
      <Comments parentStruct={post.struct} />
    </Layout>
  );
};

export default PostPage;

getInitialPropsWithRedux(PostPage, async (props) => {
  const { subsocial, dispatch } = props;

  const postData = await loadPostOnNextReq(props);
  const postStruct = postData?.post?.struct as unknown as PostStruct;

  if (postStruct?.isComment) {
    const { rootPostId } = asCommentStruct(postStruct as unknown as PostStruct);
    await dispatch(fetchPost({ api: subsocial, id: rootPostId, reload: true }));
  }

  return {
    postData: postData as unknown as PostWithAllDetails,
  };
});
