import { FC, useEffect, useState } from 'react';
import {
  getSuggestedPostIdsByPage,
  loadSuggestedPostIds,
} from '../loadSuggestedPostIdsFromEnv';
import {
  DEFAULT_FIRST_PAGE,
  DEFAULT_PAGE_SIZE,
} from 'src/config/ListData.config';
import { fetchPosts } from 'src/rtk/features/posts/postsSlice';
import { useApi } from 'src/components/api';
import { useAppDispatch } from 'src/rtk/app/store';
import InfinityListScroll from '../../common/infinity-list/InfinityListScroll';
import Post from '../post-item/Post';
import { AccountId, SpaceId } from '@subsocial/api/flat-subsocial/dto';
import { HasHiddenVisibility } from 'src/rtk/app/helpers';
import {
  InnerLoadMoreFn,
  loadMoreValuesArgs,
} from '../../../models/infinity-scroll';
import { useMyAddress } from 'src/rtk/features/myAccount/myAccountHooks';

const loadMorePostsFn = async (loadMoreValues: loadMoreValuesArgs) => {
  const { size, page, api, dispatch, visibility, myAddress, ids, withSpace } =
    loadMoreValues;

  let postIds: string[];
  const allSuggestedPotsIds = await loadSuggestedPostIds(api, ids);
  postIds = getSuggestedPostIdsByPage(allSuggestedPotsIds, size, page);
  await dispatch(
    fetchPosts({
      api,
      ids: postIds,
      reload: false,
      withReactionByAccount: myAddress,
      visibility,
      withSpace,
    })
  );

  return postIds;
};

type PostListProps = {
  ids: SpaceId[];
  visibility?: HasHiddenVisibility;
  myAddress?: AccountId;
  withSpace?: boolean;
};

const PostList: FC<PostListProps> = ({ ids, visibility, withSpace = true }) => {
  const [postsData, setPostsData] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { api } = useApi();
  const [totalCount, setTotalCount] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const myAddress = useMyAddress();
  const loadMore: InnerLoadMoreFn = (page, size) =>
    loadMorePostsFn({
      size,
      page,
      api,
      dispatch,
      myAddress,
      visibility,
      ids,
      withSpace,
    });

  useEffect(() => {
    if (totalCount) return;

    let isMounted = true;

    isMounted &&
      loadSuggestedPostIds(api, ids).then((ids) => {
        isMounted && setTotalCount(ids.length);
        if (!ids.length) {
          setIsEmpty(true);
        }
        loadMore(DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE).then((ids) =>
          setPostsData(ids)
        );
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <InfinityListScroll
      dataSource={postsData}
      loadMore={loadMore}
      totalCount={totalCount}
      emptyText={'No posts yet'}
      renderItem={(id) => <Post postId={id} key={id} withSpace={withSpace} />}
      isEmpty={isEmpty}
    />
  );
};

export default PostList;
