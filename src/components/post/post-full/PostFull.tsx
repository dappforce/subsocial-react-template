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
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { TitleSizes } from 'src/models/common/typography';
import Embed from '../../common/Embed';
import ButtonShare from '../../common/button/button-share/ButtonShare';
import { useSelectProfile } from 'src/store/features/profiles/profilesHooks';
import { DateService, getUrl, loadImgUrl, TypeUrl } from 'src/utils';
import {
  PostWithSomeDetails,
  ReactionEnum,
} from '@subsocial/api/types/dto';
import { toShortAddress } from 'src/components/utils/address';
import { useSelectPost } from 'src/store/app/hooks';
import ButtonVotes from '../../common/button/buttons-vote/ButtonVotes';
import { PostFullProps } from 'src/models/post';
import { TypeContent } from 'src/models/common/button';
import Router from 'next/router';
import { useModal } from 'src/hooks/useModal';
import ModalCreateSharedPost from 'src/components/modal/modal-create-shared-post/ModalCreateSharedPost';
import SharedPost from '../shared-post/SharedPost';
import classNames from 'classnames';
import { useAuth } from 'src/components/auth/AuthContext';
import { ACCOUNT_STATUS } from 'src/models/auth';
import { useTranslation } from 'react-i18next';
import SpaceHiddenComponent from '../../common/space-hidden-component/SpaceHiddenComponent';
import HiddenComponent from '../../common/hidden-component/HiddenComponent';

const PostFull: FC<PostFullProps> = (props) => {
  const { post, space } = props;

  const profile = useSelectProfile(post.struct.ownerId.toString());

  const { rootPostId, isSharedPost } = post.struct;

  const postData = useSelectPost(rootPostId) as PostWithSomeDetails;

  const { isVisible, toggleModal } = useModal();

  const { openSingInModal, status } = useAuth();

  const isAuthRequired = status !== ACCOUNT_STATUS.AUTHORIZED;

  const { t } = useTranslation();

  const onClickShare = () => {
    if (isAuthRequired) {
      openSingInModal(true);
      return openSingInModal(false);
    } else {
      toggleModal();
    }
  }

  const onClickEdit = () => {
    Router.push(`/${post.struct.spaceId}/${post.id}/edit`);
  };

  if (!post) return null;

  return (
    <CardWrapper className={styles.post}>
      <SpaceHiddenComponent content={post} />
      {post.struct.hidden && (
        <HiddenComponent data={post} typeContent={TypeContent.Post} />
      )}
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
                    src={profile?.content?.image}
                    size={AvatarSizes.MEDIUM}
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
                      title: space?.content?.handle || postData?.space?.content?.handle,
                      id: space?.struct.id || postData?.space?.struct.id,
                    })}
                  >
                    {space?.content?.name || postData?.space?.content?.name}
                  </SmallLink>
                  {'\xA0 · \xA0'}
                  <SmallLink
                    href={getUrl({
                      type: TypeUrl.Post,
                      //@ts-ignore
                      title: space?.content.handle || postData?.space?.content.handle,
                      id: space?.struct.id || postData?.space?.struct.id,
                      subTitle: post?.content?.title,
                      subId: post.struct.id,
                    })}
                  >
                    {DateService.getDate(post.struct.createdAtTime)}
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
          {!isSharedPost && postData?.post?.content?.title && (
            <Title
              variant={'h1'}
              type={TitleSizes.DETAILS}
              className={styles.title}
            >
              {t('post.inResponseTo')}
              <Link
                href={getUrl({
                  type: TypeUrl.Post,
                  //@ts-ignore
                  title: space?.content.handle || postData?.space?.content.handle,
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

      {!isSharedPost && <TagList tags={post.content?.tags} className={styles.tags} />}
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
        <ButtonShare
          onClick={onClickShare}
          isShowLabel
          value={post.struct.sharesCount}
        />
      </CardActions>
    </CardWrapper>
  );
};

export default PostFull;
