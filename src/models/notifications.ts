export interface NotificationsItemProps {
  image?: string;
  ownerName: string | undefined;
  ownerImage: any;
  ownerId: string | undefined;
  subject: string | undefined;
  spaceName?: string;
  date: string | Date;
  link?: string;
  msg: string;
  msgType: string;
  aggregationCount: number;
  spaceId: string | undefined;
  postId?: string;
  subjectLink: any;
}

export interface INotificationsMessage {
  name: string;
  subject: string;
  action: string;
  ownerId: string;
}

export enum OwnerNotifications {
  AccountFollowed = 'followed your account',
  SpaceFollowed = 'followed your space',
  SpaceCreated = 'created a new space',
  CommentCreated = 'commented on your post',
  CommentReplyCreated = 'replied to your comment on',
  PostShared = 'shared your post',
  CommentShared = 'shared your comment on',
  PostReactionCreated = 'reacted to your post',
  CommentReactionCreated = 'reacted to your comment on',
}

export enum Notifications {
  AccountFollowed = 'followed the account',
  SpaceFollowed = 'followed the space',
  SpaceCreated = 'created the space',
  PostCreated = 'created the post',
  PostSharing = 'shared the post',
  PostShared = 'shared the post',
  CommentCreated = 'commented on the post',
  CommentShared = 'shared a comment on',
  CommentReplyCreated = 'replied to a comment on',
  PostReactionCreated = 'reacted to the post',
  CommentReactionCreated = 'reacted to a comment on',
}
