import {
  PostData,
  PostWithAllDetails,
  PostWithSomeDetails,
  PostStruct,
  ProfileData,
  SpaceData
} from '@subsocial/types/dto';
import { IpfsCid } from '@subsocial/types';

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
  profile: ProfileData;
  post: PostData;
  space: SpaceData;
}
