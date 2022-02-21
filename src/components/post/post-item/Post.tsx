import { FC, useState } from 'react';
import styles from './Post.module.sass';
import { Divider } from '@mui/material';
import PostContent from './post-content/PostContent';
import Comments from '../../common/comments/Comments';
import PostActions from './post-actions/PostActions';
import CardWrapper from '../../common/card-wrapper/CardWrapper';
import { useSelectPost } from 'src/store/features/posts/postsHooks';
import { useSelectSpace } from 'src/store/features/spaces/spacesHooks';
import { PostWithSomeDetails } from '@subsocial/types/dto';
import { useSelectProfile } from 'src/store/features/profiles/profilesHooks';
import { useAppSelector } from 'src/store/app/store';
import { selectMyReactionByPostId } from 'src/store/features/reactions/myPostReactionsSlice';
import SharedPost from '../shared-post/SharedPost';
import { useMyAddress } from '../../../store/features/myAccount/myAccountHooks';
import HiddenComponent from '../../common/hidden-component/HiddenComponent';
import { TypeContent } from 'src/models/common/button';
import SpaceHiddenComponent from 'src/components/common/space-hidden-component/SpaceHiddenComponent';

type Props = {
  postId: string;
  isShowActions?: boolean;
  withSpace?: boolean;
  className?: string;
};

const Post: FC<Props> = ({
  postId,
  isShowActions = true,
  withSpace,
  className: inputClassName,
}) => {
  const [isShowComments, setIsShowComments] = useState(false);
  const postData = useSelectPost(postId) as PostWithSomeDetails;
  const profile = useSelectProfile(postData?.post?.struct.ownerId.toString());

  const className = inputClassName
    ? `${styles.post} ${inputClassName}`
    : styles.post;

  const address = useMyAddress();
  const space = useSelectSpace(postData?.post.struct.spaceId) || undefined;
  const reaction = useAppSelector((state) => {
    return selectMyReactionByPostId(state, { postId, myAddress: address });
  });

  if (
    !postData ||
    (withSpace && !postData.space) ||
    (withSpace && space?.struct.hidden)
  )
    return null;

  const { isSharedPost } = postData.post?.struct;

  const toggleComments = () => {
    setIsShowComments((current) => !current);
  };

  return (
    <CardWrapper className={className}>
      <SpaceHiddenComponent content={postData.post} />
      {postData.post.struct.hidden && (
        <HiddenComponent data={postData.post} typeContent={TypeContent.Post} />
      )}
      {isSharedPost ? (
        <SharedPost {...postData} profile={profile} />
      ) : (
        <PostContent {...postData} profile={profile} />
      )}
      {isShowActions && !isSharedPost && <Divider variant="middle" />}
      {isShowActions && (
        <PostActions
          post={postData.post}
          toggleComments={toggleComments}
          reaction={reaction}
          isSharedPost={isSharedPost}
        />
      )}
      {isShowComments && (
        <>
          <Divider variant="middle" />
          <Comments parentStruct={postData.post.struct} />
        </>
      )}
    </CardWrapper>
  );
};

export default Post;
