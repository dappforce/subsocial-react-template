import PostList from 'src/components/post/post-list/post-list';

export const MyFeed = ({ ids }: { ids: string[] }) => {
  return <PostList ids={ids} visibility={'onlyVisible'} />;
};

export default MyFeed;
