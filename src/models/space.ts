import {
  PostId,
  PostWithSomeDetails,
  SpaceWithSomeDetails,
} from '@subsocial/api/flat-subsocial/dto';

export interface SpacePageProps {
  spaceData: SpaceWithSomeDetails;
  postIds: PostId[];
  posts: PostWithSomeDetails[];
}
