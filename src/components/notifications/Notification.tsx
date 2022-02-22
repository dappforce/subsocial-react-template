import { useMyAddress } from 'src/store/features/myAccount/myAccountHooks';
import {
  useSelectSpace,
  useSelectPost,
  useSelectProfile,
} from 'src/store/app/hooks';
import { Activity, EventsName } from '@subsocial/types';
import React from 'react';
import NotificationsItem from './NotificationsItem';
import { insertDash } from '../utils/insertDash';
import { useTranslation } from 'react-i18next';

type NotificationProps = Activity;
export type PathLinks = {
  links: {
    href: string;
    as?: string;
  };
};
type NotificationType = string;

type InnerNotificationProps = NotificationProps & {
  preview?: React.ReactNode;
  entityOwner?: string;
  msg?: string;
  image?: string;
  subject?: string;
  spaceId?: string;
  postId?: string;
  subjectLink: any;
};

export function InnerNotification(props: InnerNotificationProps) {
  const myAddress = useMyAddress();
  const { t } = useTranslation();

  const {
    image = '',
    msg: customMsg,
    agg_count,
    event,
    account,
    date,
    subject,
    spaceId,
    postId,
    subjectLink,
  } = props;
  const owner = useSelectProfile(account.toString());

  if (!myAddress) return null;

  const ownerImage = owner?.content?.avatar;
  const ownerName = owner?.content?.name;
  const ownerId = owner?.id;

  const msgType: NotificationType = 'notifications';
  const eventMsg = t(`notifications.${event}`);

  return (
    <NotificationsItem
      ownerImage={ownerImage}
      ownerName={ownerName}
      ownerId={ownerId}
      date={date}
      msg={customMsg || eventMsg}
      aggregationCount={agg_count}
      msgType={msgType}
      subject={subject}
      image={image}
      spaceId={spaceId}
      subjectLink={subjectLink}
      postId={postId}
    />
  );
}

const SpaceNotification = (props: NotificationProps) => {
  const { space_id } = props;
  const space = useSelectSpace(space_id);

  if (!space) return null;

  return (
    <InnerNotification
      image={space.content?.image}
      entityOwner={space.struct.ownerId}
      subject={space?.content?.name}
      spaceId={space_id}
      subjectLink={`/${space_id}`}
      {...props}
    />
  );
};

const AccountNotification = (props: NotificationProps) => {
  const { following_id } = props;
  const profile = useSelectProfile(following_id);

  if (!profile) return null;

  const address = profile.id;
  return (
    <InnerNotification
      image={profile?.content?.avatar}
      entityOwner={address}
      subject={profile?.content?.name}
      subjectLink={`/accounts/${address}`}
      {...props}
    />
  );
};

const PostNotification = (props: NotificationProps) => {
  const { post_id } = props;
  const postDetails = useSelectPost(post_id);

  if (!postDetails) return null;

  const { post } = postDetails;

  let msg: string | undefined = undefined;

  const { isSharedPost } = post.struct;

  return (
    <InnerNotification
      image={post?.content?.image}
      entityOwner={post.struct.ownerId}
      msg={msg}
      subject={
        postDetails?.post?.content?.title
          ? postDetails?.post?.content?.title
          : 'Link'
      }
      subjectLink={
        postDetails?.post?.content?.title
          ? `/${postDetails.space?.id}/${insertDash(
              postDetails?.post?.content?.title
            )}-${post.id}`
          : `/${postDetails.space?.id}/${insertDash('post with only body')}-${
              post.id
            }`
      }
      {...props}
    />
  );
};

const CommentNotification = (props: NotificationProps) => {
  const { comment_id, post_id } = props;
  const commentDetails = useSelectPost(comment_id);

  const postDetails = useSelectPost(post_id);

  if (!postDetails) return null;

  const { post } = postDetails;

  return (
    <InnerNotification
      image={post.content?.image}
      entityOwner={post.struct.ownerId}
      spaceId={commentDetails?.space?.id}
      subject={
        postDetails?.post?.content?.title
          ? postDetails?.post?.content?.title
          : 'Link'
      }
      subjectLink={
        postDetails?.post?.content?.title
          ? `/${postDetails.space?.id}/${insertDash(
              postDetails?.post?.content?.title
            )}-${post.id}`
          : `/${postDetails.space?.id}/${insertDash('post with only body')}-${
              post.id
            }`
      }
      {...props}
    />
  );
};

// eslint-disable-next-line react/display-name
const Notification = React.memo((props: NotificationProps) => {
  const { event } = props;

  const eventName = event as EventsName;

  switch (eventName) {
    case 'AccountFollowed':
      return <AccountNotification {...props} />;
    case 'SpaceFollowed':
      return <SpaceNotification {...props} />;
    case 'SpaceCreated':
      return <SpaceNotification {...props} />;
    case 'CommentCreated':
      return <CommentNotification {...props} />;
    case 'CommentReplyCreated':
      return <CommentNotification {...props} />;
    case 'PostShared':
      return <PostNotification {...props} />;
    case 'CommentShared':
      return <CommentNotification {...props} />;
    case 'PostReactionCreated':
      return <PostNotification {...props} />;
    case 'CommentReactionCreated':
      return <CommentNotification {...props} />;
    case 'PostCreated':
      return <PostNotification {...props} />;
    default:
      return null;
  }
});

export default Notification;
