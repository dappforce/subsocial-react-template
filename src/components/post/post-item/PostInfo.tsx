import React, { FC } from 'react';
import { CardHeader } from '@mui/material';
import Link from '../../common/links/link/Link';
import { DateService, getUrl, TypeUrl } from 'src/utils';
import AvatarElement from '../../common/avatar/AvatarElement';
import { AvatarSizes } from 'src/models/common/avatar';
import Options from '../../common/button/button-options/ButtonOptions';
import styles from './Post.module.sass';
import { TypeContent } from 'src/models/common/button';
import Title from '../../common/title/Title';
import { TitleSizes } from 'src/models/common/typography';
import { toShortAddress } from '../../utils/address';
import SmallLink from '../../common/links/small-link/SmallLink';
import Router from 'next/router';
import { PostInfoProps } from 'src/models/post';

const PostInfo: FC<PostInfoProps> = ({ post, profile, space }) => {
  const { isComment } = post.struct;

  const onClickEdit = () => {
    Router.push(`/${post.struct.spaceId}/${post.id}/edit`);
  };

  return (
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
            size={AvatarSizes.MEDIUM}
            id={profile?.id || post.struct.ownerId}
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
            id: profile?.id || post.struct.ownerId,
          })}
        >
          <Title type={TitleSizes.PROFILE}>
            {profile?.content?.name || toShortAddress(post.struct.ownerId)}
          </Title>
        </Link>
      }
      className={styles.header}
      subheader={
        <>
          {space && (
            <SmallLink
              href={getUrl({
                type: TypeUrl.Space,
                //@ts-ignore
                title: space.content?.handle,
                id: space.id,
              })}
              as={getUrl({
                type: TypeUrl.Space,
                //@ts-ignore
                title: space.content?.handle,
                id: space?.id,
              })}
            >
              {space.content?.name}
            </SmallLink>
          )}
          {space && '\xA0 · \xA0'}
          <SmallLink
            href={
              isComment
                ? getUrl({
                  type: TypeUrl.Comment,
                  subTitle: post.content?.body,
                  subId: post.struct.id,
                })
                : getUrl({
                  type: TypeUrl.Post,
                  //@ts-ignore
                  title: space?.content?.handle,
                  id: space?.struct.id,
                  subTitle: post.content?.title,
                  subId: post.struct.id,
                })
            }
          >
            {DateService.getDate(post.struct.createdAtTime)}
          </SmallLink>
        </>
      }
    />
  );
};

export default PostInfo;
