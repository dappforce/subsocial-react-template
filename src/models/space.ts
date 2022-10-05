import {
  PostId,
  PostWithSomeDetails,
  SpaceWithSomeDetails,
} from '@subsocial/api/types/dto';
import { Visibility } from '@subsocial/api/filters';

export interface SpacePageProps {
  spaceData: SpaceWithSomeDetails;
  postIds: PostId[];
  posts: PostWithSomeDetails[];
  notFound?: boolean;
}

export interface ViewSpaceProps {
  spaceData: SpaceWithSomeDetails;
  postIds: PostId[];
  posts: PostWithSomeDetails[];
}

export interface ViewSpaceProps {
  spaceData: SpaceWithSomeDetails
  postIds: PostId[],
  posts: PostWithSomeDetails[],
  visibility?: Visibility
}

export interface ViewSpaceProps {
  spaceData: SpaceWithSomeDetails
  postIds: PostId[],
  posts: PostWithSomeDetails[],
  visibility?: Visibility
}

export interface ViewSpaceProps {
  spaceData: SpaceWithSomeDetails
  postIds: PostId[],
  posts: PostWithSomeDetails[],
  visibility?: Visibility
}
