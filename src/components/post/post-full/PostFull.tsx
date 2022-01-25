import CardWrapper from '../../common/card-wrapper/CardWrapper';
import {
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
} from '@mui/material';
import AvatarElement from '../../common/avatar/AvatarElement';
import { AvatarSizes } from 'src/models/common/avatar';
import Options from '../../common/button/button-options/ButtonOptions';
import Link from '../../common/links/link/Link';
import Title from '../../common/title/Title';
import styles from './PostFull.module.sass';
import SmallLink from '../../common/links/small-link/SmallLink';
import TagList from '../../common/tag/TagList';
import { FC, useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { TitleSizes } from 'src/models/common/typography';
import Embed from '../../common/Embed';
import ButtonShare from '../../common/button/button-share/ButtonShare';
import { useSelectProfile } from 'src/rtk/features/profiles/profilesHooks';
import { getTime, getUrl, loadImgUrl, TypeUrl } from 'src/utils';
import {
  PostWithSomeDetails,
  ReactionEnum,
} from '@subsocial/api/flat-subsocial/dto';
import { toShortAddress } from 'src/components/utils/address';
import { useAppDispatch } from 'src/rtk/app/store';
import { ApiContext } from 'src/components/api';
import { fetchPosts } from 'src/rtk/features/posts/postsSlice';
import { useSelectPost } from 'src/rtk/app/hooks';
import ButtonVotes from '../../common/button/buttons-vote/ButtonVotes';
import { PostFullProps } from 'src/models/post';
import { TypeContent } from 'src/models/common/button';
import Router from 'next/router';
import { useModal } from 'src/hooks/useModal';
import ModalCreateSharedPost from 'src/components/modal/modal-create-shared-post/ModalCreateSharedPost';
import SharedPost from '../shared-post/SharedPost';
import classNames from 'classnames';

const PostFull: FC<PostFullProps> = (props) => {
  const { post, space } = props;

  const profile = useSelectProfile(post.struct.ownerId.toString());

  const [fetched, setFetched] = useState(false);

  const dispatch = useAppDispatch();

  const { api } = useContext(ApiContext);

  const { rootPostId, isSharedPost } = post.struct;

  const postData = useSelectPost(rootPostId) as PostWithSomeDetails;

  const { isVisible, toggleModal } = useModal();

  const onClickEdit = () => {
    Router.push(`/${post.struct.spaceId}/${post.id}/edit`);
  };

  useEffect(() => {
    if (rootPostId) {
      dispatch(fetchPosts({ ids: [rootPostId], api })).then(() =>
        setFetched(true)
      );
    }
  }, []);

  if (!post) return null;

  return (
    <CardWrapper className={styles.post}>
      <CardContent
        className={classNames(styles.mainPostContent, {
          [styles.mainSharedPostContent]: isSharedPost,
        })}
      >
        <CardContent
          className={classNames(styles.postContent, {
            [styles.sharedPostContent]: isSharedPost,
          })}
        >
          {isSharedPost && (
            <SharedPost
              profile={profile}
              {...props}
              className={styles.sharedPostContent}
            />
          )}
          {!isSharedPost && (
            <CardHeader
              avatar={
                <Link
                  href={getUrl({
                    type: TypeUrl.Account,
                    id: profile?.id || post.struct.ownerId,
                  })}
                  image
                >
                  <AvatarElement
                    src={profile?.content?.avatar}
                    size={AvatarSizes.LARGE}
                    id={profile?.id || post.struct.ownerId}
                  />
                </Link>
              }
              action={
                <Options
                  className={styles.postActions}
                  withHidden
                  typeContent={TypeContent.Post}
                  contentStruct={post.struct}
                  onClickEdit={onClickEdit}
                />
              }
              title={
                <Link
                  href={getUrl({
                    type: TypeUrl.Account,
                    id: profile?.id || post.struct.ownerId,
                  })}
                >
                  <Title type={TitleSizes.PROFILE}>
                    {profile?.content?.name ||
                      toShortAddress(post.struct.ownerId)}
                  </Title>
                </Link>
              }
              className={styles.accountContent}
              subheader={
                <>
                  {/*@ts-ignore*/}
                  <SmallLink
                    href={getUrl({
                      type: TypeUrl.Space,
                      //@ts-ignore
                      title:
                        space?.content?.handle ||
                        postData?.space?.content?.handle,
                      id: space?.struct.id || postData?.space?.struct.id,
                    })}
                  >
                    {/*@ts-ignore*/}
                    {space?.content.name || postData?.space.content.name}
                  </SmallLink>
                  {'\xA0 · \xA0'}
                  <SmallLink
                    href={getUrl({
                      type: TypeUrl.Post,
                      //@ts-ignore
                      title:
                        space?.content.handle ||
                        postData?.space?.content.handle,
                      id: space?.struct.id || postData?.space?.struct.id,
                      //@ts-ignore
                      subTitle: post?.content.title,
                      subId: post.struct.id,
                    })}
                  >
                    {getTime(post.struct.createdAtTime)}
                  </SmallLink>
                </>
              }
            />
          )}
          {!rootPostId && !isSharedPost && (
            <Title
              variant={'h1'}
              type={TitleSizes.DETAILS}
              className={styles.title}
            >
              {post?.content?.title}
            </Title>
          )}
          {fetched && !isSharedPost && postData?.post?.content?.title && (
            <Title
              variant={'h1'}
              type={TitleSizes.DETAILS}
              className={styles.title}
            >
              {`In response to `}
              <Link
                href={getUrl({
                  type: TypeUrl.Post,
                  //@ts-ignore
                  title:
                    space?.content.handle || postData?.space?.content.handle,
                  id: space?.struct.id || postData?.space?.struct.id,
                  subTitle: postData?.post?.content.title,
                  subId: postData?.post.struct.id,
                })}
              >
                {postData?.post?.content?.title}
              </Link>
            </Title>
          )}

          {post.content?.image && !isSharedPost && (
            <CardMedia
              component="img"
              className={styles.imgContent}
              image={loadImgUrl(post.content?.image)}
            />
          )}

          {post.content?.link && !isSharedPost && (
            <Embed link={post.content?.link} className={styles.video} />
          )}

          {post.content?.body && !isSharedPost && (
            <ReactMarkdown className={'markdown-body'}>
              {post.content.body}
            </ReactMarkdown>
          )}
        </CardContent>
      </CardContent>

      {!isSharedPost && (
        <TagList tags={post.content?.tags} className={styles.tags} />
      )}

      {!isSharedPost && <Divider variant="middle" />}
      <CardActions
        className={classNames(styles.cardActions, {
          [styles.sharedPostActions]: isSharedPost,
        })}
      >
        <ModalCreateSharedPost
          postId={post.id}
          open={isVisible}
          onClose={toggleModal}
        />
        <ButtonVotes
          post={post.struct}
          reactionEnum={ReactionEnum.Upvote}
          withLabel
        />
        <ButtonVotes
          post={post.struct}
          reactionEnum={ReactionEnum.Downvote}
          withLabel
        />
        <ButtonShare onClick={toggleModal} isShowLabel />
      </CardActions>
    </CardWrapper>
  );
};

export default PostFull;
