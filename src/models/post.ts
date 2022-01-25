import {
  PostData,
  PostWithAllDetails,
  PostWithSomeDetails,
} from '@subsocial/api/flat-subsocial/dto';
import { PostStruct } from '@subsocial/api/flat-subsocial/flatteners';

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
