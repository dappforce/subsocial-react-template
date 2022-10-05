import { useIsMyAddress, useIsMySpace } from './useIsMySpace';
import { PostStruct, SpaceStruct } from '@subsocial/api/types/dto';
import { isHidden } from '@subsocial/api/filters';
import { Post } from '@subsocial/api/types/substrate';


type IsUnlistedPostProps = {
  post?: PostStruct,
  space?: SpaceStruct
}

export const useIsUnlistedPost = ({ post, space }: IsUnlistedPostProps) => {
  const notMyPost = !useIsMyAddress(post?.ownerId)
  const notMySpace = !useIsMySpace(space)

  return notMyPost && notMySpace && isHidden(post as unknown as Post)
}
