import {
  PostId,
  PostWithSomeDetails,
  SpaceWithSomeDetails,
} from '@subsocial/types/dto';

export interface SpacePageProps {
  spaceData: SpaceWithSomeDetails;
  postIds: PostId[];
  posts: PostWithSomeDetails[];
}
