export interface NotificationsItemProps {
  image?: string;
  ownerName: string | undefined;
  ownerImage: any;
  ownerId: string | undefined;
  subject: string | undefined;
  spaceName?: string;
  date: string | number;
  link?: string;
  msg: string;
  msgType: string;
  aggregationCount: number;
  spaceId: string | undefined;
  postId?: string;
  subjectLink: any;
}
