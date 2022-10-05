import {
  PostData,
  PostWithAllDetails,
  PostWithSomeDetails,
  PostStruct,
  SpaceData, SpaceId, AccountId
} from '@subsocial/api/types/dto';
import { IpfsCid } from '@subsocial/api/types';
import { Visibility } from '@subsocial/api/filters';
import { ListType } from '../components/home/HomePage';

export type PostActionsProps = {
  toggleComments: () => void;
  post: PostData;
  reaction: any;
  isSharedPost?: boolean;
};

export type PostDetailsProps = {
  postData: PostWithAllDetails;
};

export interface EditorPostProps {
  postId: string | undefined;
  isWithLink: boolean;
}

interface PostDataWithRootPostId extends PostData {
  struct: PostStruct & { rootPostId?: string };
}

export interface PostFullProps extends PostWithSomeDetails {
  post: PostDataWithRootPostId;
}

export interface PostStructWithHidden extends PostStruct {
  hidden: boolean;
}

export enum TypePostTabs {
  Article = 'article',
  Video = 'video',
}

export interface dataPost {
  title: string;
  body: string;
  tags: string[];
  image?: string | IpfsCid;
  link?: string;
}

export interface PostInfoProps {
  profile: SpaceData;
  post: PostData;
  space: SpaceData;
}

export interface PostListProps {
  ids: SpaceId[];
  visibility?: Visibility;
  myAddress?: AccountId;
  withSpace?: boolean;
  type?: ListType;
}
