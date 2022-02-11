import { FC, useEffect, useState } from 'react';
import {
  getSuggestedPostIdsByPage,
  loadSuggestedPostIds,
} from '../loadSuggestedPostIdsFromEnv';
import {
  DEFAULT_FIRST_PAGE,
  DEFAULT_PAGE_SIZE,
  IS_OFFCHAIN,
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
import { getFeedCount, getNewsFeed } from 'src/components/utils/OffchainUtils';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useTranslation } from 'react-i18next';

const loadMorePostsFn = async (loadMoreValues: loadMoreValuesArgs) => {
  const { size, page, api, dispatch, visibility, myAddress, ids, withSpace } =
    loadMoreValues;

  let postIds: string[];

  if (IS_OFFCHAIN && myAddress && Router.query.tab === 'feeds') {
    const data = await getNewsFeed(myAddress, (page - 1) * size, size).then(
      (res) => res
    );
    //@ts-ignore
    postIds = data && data.map((item) => item.post_id);
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
  const router = useRouter();
  const { t } =useTranslation();

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
    if (IS_OFFCHAIN && isMounted) {
      if (router.query.tab === 'feeds') {
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
        loadMore(DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE);
      } else {
        loadSuggestedPostIds(api, ids).then((ids) => {
          setTotalCount(ids.length);
          if (!ids.length) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
          }
          loadMore(DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE).then((ids) =>
            setPostsData(ids)
          );
        });
      }
    }
    if (!IS_OFFCHAIN && isMounted) {
      loadSuggestedPostIds(api, ids).then((ids) => {
        setTotalCount(ids.length);
        if (!ids.length) {
          setIsEmpty(true);
        }

        loadMore(DEFAULT_FIRST_PAGE, DEFAULT_PAGE_SIZE).then((ids) => {
          setIsEmpty(false);
          setPostsData(ids);
        });
      });
    }

    return () => {
      isMounted = false;
    };
  }, [loadMore, myAddress, router, totalCount]);

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
      renderItem={(id) => <Post postId={id} key={id} withSpace={withSpace} />}
      isEmpty={isEmpty}
    />
  );
};

export default PostList;
