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
import { getFeedCount, getNewsFeed } from 'src/components/utils/OffchainUtils';
import { useRouter } from 'next/router';
import Router from 'next/router';
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

  if (config.isOffChainFeed && myAddress && Router.query.tab === 'feeds') {
    const data = await getNewsFeed(myAddress, (page - 1) * size, size).then(
      (res) => res
    );

    postIds = data.map((item) => item.post_id || '');
  } else {
    const allSuggestedPotsIds = await loadSuggestedPostIds(api, ids);
    postIds = getSuggestedPostIdsByPage(allSuggestedPotsIds, size, page);
  }

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
    if (config.isOffChainFeed && isMounted) {
      if (type === ListType.feeds) {
        myAddress &&
        getFeedCount(myAddress).then(
          (res) => {
            if (+res === 0) {
              setIsEmpty(true);
              setTotalCount(0);
            } else {
              setIsEmpty(false);
              setTotalCount(res);
            }
          },
          (err) => console.log('error', err)
        );
        loadMore(config.infinityScrollFirstPage, config.infinityScrollOffset).then((ids) =>
          setPostsData(ids)
        );
      } else {
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
      }
    }
    if (!config.isOffChainFeed && isMounted) {
      loadSuggestedPostIds(api, ids).then((ids) => {
        setTotalCount(ids.length);
        if (!ids.length) {
          setIsEmpty(true);
        }

        loadMore(config.infinityScrollFirstPage, config.infinityScrollOffset).then((ids) => {
          setIsEmpty(false);
          setPostsData(ids);
        });
      });
    }

    return () => {
      isMounted = false;
    };
  }, [ loadMore, router, totalCount ]);

  return (
    <InfinityListScroll
      dataSource={postsData}
      loadMore={loadMore}
      totalCount={totalCount}
      emptyText={
        Router.query.tab === 'feeds'
          ? t('generalMessages.emptyFeed')
          : t('content.noPosts')
      }
      renderItem={(id) => <Post postId={id} key={id} withSpace={withSpace} visibility={visibility} />}
      isEmpty={isEmpty}
    />
  );
};

export default PostList;
