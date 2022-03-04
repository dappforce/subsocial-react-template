import { FC, useEffect } from 'react';
import { AvatarSizes } from 'src/models/common/avatar';
import { useApi } from 'src/components/api';
import { CardContent, CardHeader } from '@mui/material';
import AvatarElement from 'src/components/common/avatar/AvatarElement';
import Options from 'src/components/common/button/button-options/ButtonOptions';
import Link from 'src/components/common/links/link/Link';
import SmallLink from 'src/components/common/links/small-link/SmallLink';
import Title from 'src/components/common/title/Title';
import { TextSizes, TitleSizes } from 'src/models/common/typography';
import { DateService, getUrl, TypeUrl } from 'src/utils';
import Post from 'src/components/post/post-item/Post';
import { fetchPosts } from 'src/store/features/posts/postsSlice';
import { useAppDispatch } from 'src/store/app/store';
import styles from '../post-item/Post.module.sass';
import { TypeContent } from 'src/models/common/button';
import Router from 'next/router';
import Text from 'src/components/common/text/Text';
import { useSelectPost } from 'src/store/app/hooks';
import { useIsMyAddress } from 'src/hooks/useIsMySpace';
import CardWrapper from 'src/components/common/card-wrapper/CardWrapper';

const SharedPost: FC<any> = (props) => {
  const { post, space, profile, className: inputClassName } = props;

  const { sharedPostId } = post.struct;
  const dispatch = useAppDispatch();
  const { api } = useApi();
  const sharedPostData = useSelectPost(sharedPostId);
  const { hidden, ownerId } = sharedPostData?.post.struct || {};
  const isMyPost = useIsMyAddress(ownerId);
  const isNotfoundPost = hidden && !isMyPost;

  const className = inputClassName
    ? `${styles.mainPostContent} ${styles.mainPostContent_shared} ${inputClassName}`
    : `${styles.mainPostContent} ${styles.mainPostContent_shared}`;

  const onClickEdit = () => {
    Router.push(`/${post.struct.spaceId}/${post.id}/edit`);
  };

  useEffect(() => {
    dispatch(fetchPosts({ids: [ sharedPostId ], api}));
  }, []);

  return (
    <CardContent className={className}>
      <CardContent className={styles.sharedContent}>
        <CardHeader
          avatar={
            <Link
              href={getUrl({
                type: TypeUrl.Account,
                id: profile?.id,
              })}
              image
            >
              <AvatarElement
                src={profile?.content?.avatar}
                size={AvatarSizes.MEDIUM}
                id={profile?.id}
              />
            </Link>
          }
          action={
            <Options
              className={styles.action}
              withReactions
              withHidden
              contentStruct={post.struct}
              typeContent={TypeContent.Post}
              onClickEdit={onClickEdit}
            />
          }
          title={
            <Link
              href={getUrl({
                type: TypeUrl.Account,
                id: profile?.id,
              })}
            >
              <Title type={TitleSizes.PROFILE}>{profile?.content?.name}</Title>
            </Link>
          }
          className={styles.header}
          subheader={
            <>
              <SmallLink
                href={getUrl({
                  type: TypeUrl.Space,
                  title: space?.content.handle,
                  id: space?.id,
                })}
              >
                {space?.content.name}
              </SmallLink>
              &nbsp;·&nbsp;
              <SmallLink
                href={getUrl({
                  type: TypeUrl.Post,
                  title: space?.content.handle,
                  id: space?.id,
                  subTitle: post?.content.title,
                  subId: post.struct.id,
                })}
              >
                {DateService.getDate(post.struct.createdAtTime)}
              </SmallLink>
            </>
          }
        />
        {post?.content?.body && (
          <Text
            component={'div'}
            type={TextSizes.NORMAL}
            className={styles.titleSharedPost}
          >
            {post?.content?.body}
          </Text>
        )}
        {!isNotfoundPost ? (
          <Post
            postId={sharedPostId}
            isShowActions={false}
            className={styles.sharedPostContent}
          />
        ) : (
          <CardWrapper className={styles.notFound}>
            <Text type={TextSizes.NORMAL} className={styles.notFoundText}>
              Post not found
            </Text>
          </CardWrapper>
        )}
      </CardContent>
    </CardContent>
  );
};

export default SharedPost;
