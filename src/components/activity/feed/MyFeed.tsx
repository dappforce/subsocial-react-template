import { AccountId } from '@subsocial/api/types/dto';
import { ListType } from 'src/components/home/HomePage';
import PostList from 'src/components/post/post-list/post-list';

export const MyFeed = ({
  ids,
  type,
  address,
}: {
  ids: string[];
  type: ListType;
  address?: AccountId;
}) => {
  return (
    <PostList
      ids={ids}
      visibility={'onlyVisible'}
      type={type}
      myAddress={address}
    />
  );
};

export default MyFeed;
