export interface NotificationsItemProps {
    id: string
    image?: any
    ownerName: string
    ownerImg: any
    subject: string
    action: string
    spaceName: string
    date: string | Date,
    link: string,
    ownerId: string
}

export interface INotificationsMessage {
    name: string
    subject: string
    action: string
    ownerId: string
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
    CommentReplyCreated ='replied to a comment on',
    PostReactionCreated = 'reacted to the post',
    CommentReactionCreated ='reacted to a comment on',
}
