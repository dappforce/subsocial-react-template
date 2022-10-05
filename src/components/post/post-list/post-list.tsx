import { FC, useEffect, useState } from 'react';
import {
  getSuggestedPostIdsByPage,
  loadSuggestedPostIds,
} from '../loadSuggestedPostIdsFromEnv';
import { config } from 'src/config';
import { fetchPosts } from 'src/store/features/posts/postsSlice';
import { useApi } from 'src/components/api';
import { useAppDispatch } from 'src/store/app/store';
import InfinityListScroll from '../../common/infinity-list/InfinityListScroll';
import Post from '../post-item/Post';
import {
  InnerLoadMoreFn,
  loadMoreValuesArgs,
} from 'src/models/infinity-scroll';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { ListType } from 'src/components/home/HomePage';
import { PostListProps } from 'src/models/post';

const loadMorePostsFn = async (loadMoreValues: loadMoreValuesArgs) => {
  const {
    size,
    page,
    api,
    dispatch,
    visibility,
    myAddress,
    ids,
    withSpace
  } = loadMoreValues;

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

const PostList: FC<PostListProps> = ({
  ids,
  visibility,
  withSpace = true,
  type = ListType.posts,
  myAddress,
}) => {
  const [postsData, setPostsData] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { api } = useApi();
  const [ totalCount, setTotalCount ] = useState(0);
  const [ isEmpty, setIsEmpty ] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

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
    setTotalCount(0);
    setIsEmpty(false);
  }, [ myAddress ]);

  useEffect(() => {
    if (totalCount || isEmpty) return;

    let isMounted = true;

    loadSuggestedPostIds(api, ids).then((ids) => {
      setTotalCount(ids.length);
      if (!ids.length) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
      loadMore(config.infinityScrollFirstPage, config.infinityScrollOffset).then((ids) =>
        setPostsData(ids)
      );
    });

    return () => {
      isMounted = false;
    };
  }, [ loadMore, router, totalCount ]);

  return (
    <InfinityListScroll
      dataSource={postsData}
      loadMore={loadMore}
      totalCount={totalCount}
      emptyText={''
      }
      renderItem={(id) => <Post postId={id} key={id} withSpace={withSpace} visibility={visibility} />}
      isEmpty={isEmpty}
    />
  );
};

export default PostList;
